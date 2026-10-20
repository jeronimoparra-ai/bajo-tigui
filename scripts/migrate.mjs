// Runner de migraciones para Bajo Tigui (PostgreSQL/Supabase).
// Uso: SUPABASE_DB_URL="postgresql://postgres:<pwd>@db.<ref>.supabase.co:5432/postgres" node scripts/migrate.mjs
import { Client } from "pg";
import fs from "node:fs";
import path from "node:path";

import dns from "node:dns";

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.error("Falta SUPABASE_DB_URL. Ejemplo: postgresql://postgres:<pwd>@db.<ref>.supabase.co:5432/postgres");
  process.exit(1);
}

const u = new URL(url);
const hostname = u.hostname;
const port = Number(u.port || 5432);
const user = decodeURIComponent(u.username);
const password = decodeURIComponent(u.password);
const database = u.pathname.replace(/^\//, "") || "postgres";

// Resolver a IPv4 (la red local no alcanza IPv6).
const lookup = await new Promise((resolve, reject) => {
  dns.lookup(hostname, { family: 4, all: false }, (err, address) => {
    if (err) reject(err); else resolve(address);
  });
});
console.log("Host resuelto a IPv4:", lookup);

const migrationsDir = path.join(process.cwd(), "db", "migrations");
const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith(".sql")).sort();

const client = new Client({ host: lookup, port, user, password, database, ssl: { rejectUnauthorized: false } });
await client.connect();

// Tabla de control de migraciones.
await client.query(`
  CREATE TABLE IF NOT EXISTS _migrations (
    filename text PRIMARY KEY,
    applied_at timestamptz NOT NULL DEFAULT now()
  );
`);

const applied = new Set((await client.query("SELECT filename FROM _migrations")).rows.map((r) => r.filename));

for (const file of files) {
  if (applied.has(file)) {
    console.log(`SKIP (ya aplicada): ${file}`);
    continue;
  }
  const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
  console.log(`APLICANDO: ${file}`);
  try {
    await client.query("BEGIN");
    await client.query(sql);
    await client.query("INSERT INTO _migrations (filename) VALUES ($1)", [file]);
    await client.query("COMMIT");
    console.log(`  OK`);
  } catch (e) {
    await client.query("ROLLBACK");
    console.error(`  ERROR en ${file}:`, e.message);
    await client.end();
    process.exit(1);
  }
}

// Seed (opcional)
const seedPath = path.join(process.cwd(), "db", "seed", "001_seed.sql");
if (fs.existsSync(seedPath) && process.env.RUN_SEED === "1") {
  console.log("APLICANDO SEED: 001_seed.sql");
  try {
    await client.query("BEGIN");
    await client.query(fs.readFileSync(seedPath, "utf8"));
    await client.query("COMMIT");
    console.log("  SEED OK");
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("  ERROR seed:", e.message);
    await client.end();
    process.exit(1);
  }
}

await client.end();
console.log("Migraciones completadas.");