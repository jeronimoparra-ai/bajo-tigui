import Link from "next/link";

const modulos = [
  "Asociados",
  "Planes",
  "Canales",
  "Zonas",
  "Avisos",
  "Horarios",
  "Tickets",
  "Sugerencias",
  "Métricas",
  "Auditoría",
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 240,
          background: "var(--bt-bg-sunken)",
          borderRight: "2px solid var(--bt-border)",
          padding: "var(--bt-space-5)",
        }}
      >
        <p className="bt-kicker" style={{ color: "var(--bt-sky-400)" }}>Admin</p>
        <nav aria-label="Módulos admin">
          <ul style={{ listStyle: "none", padding: 0, marginTop: "var(--bt-space-3)", display: "grid", gap: "var(--bt-space-1)" }}>
            {modulos.map((m) => (
              <li key={m}>
                <Link href={`/admin/${m.toLowerCase()}`} style={{ display: "block", padding: "var(--bt-space-2)", borderRadius: "var(--bt-radius-sm)" }}>
                  {m}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div style={{ flex: 1, padding: "var(--bt-space-6)" }}>{children}</div>
    </div>
  );
}
