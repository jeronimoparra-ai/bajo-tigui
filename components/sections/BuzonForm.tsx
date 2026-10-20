"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const TIPOS = [
  { v: "sugerencia", t: "Sugerencia" },
  { v: "mejora", t: "Mejora" },
  { v: "queja", t: "Queja" },
  { v: "felicitacion", t: "Felicitación" },
  { v: "peticion", t: "Petición" },
  { v: "reclamo", t: "Reclamo" },
] as const;

const MAX_ADJUNTOS = 3;
const MAX_BYTES = 5 * 1024 * 1024;
const TIPOS_ADJUNTO = ["image/", "application/pdf"];

export function BuzonForm() {
  const [tipo, setTipo] = useState<string>("sugerencia");
  const [anonima, setAnonima] = useState(false);
  const [adjuntos, setAdjuntos] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<{ codigo: string; mensaje: string } | null>(null);

  function validarArchivos(lista: File[]): string | null {
    if (lista.length > MAX_ADJUNTOS) return `Máximo ${MAX_ADJUNTOS} adjuntos.`;
    for (const f of lista) {
      if (!TIPOS_ADJUNTO.some((t) => f.type.startsWith(t))) {
        return `“${f.name}” no es un tipo permitido (solo imágenes o PDF).`;
      }
      if (f.size > MAX_BYTES) return `“${f.name}” pesa más de 5 MB.`;
    }
    return null;
  }

  function alElegir(e: React.ChangeEvent<HTMLInputElement>) {
    const nuevos = Array.from(e.target.files ?? []);
    const todo = [...adjuntos, ...nuevos].slice(0, MAX_ADJUNTOS);
    const err = validarArchivos(todo);
    if (err) {
      setError(err);
      e.target.value = "";
      return;
    }
    setError(null);
    setAdjuntos(todo);
  }

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const cuerpo = {
      tipo,
      asunto: String(fd.get("asunto") ?? ""),
      mensaje: String(fd.get("mensaje") ?? ""),
      nombre: String(fd.get("nombre") ?? "").trim() || undefined,
      telefono: String(fd.get("telefono") ?? "").trim() || undefined,
      correo: String(fd.get("correo") ?? "").trim() || undefined,
      anonima,
      autorizacion: fd.get("autorizacion") === "on",
      adjuntos: adjuntos.map((f) => ({ nombre: f.name, tipo: f.type, tamano: f.size })),
    };

    try {
      const res = await fetch("/api/buzon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cuerpo),
      });
      const j = await res.json();
      if (!res.ok || !j.ok) {
        setError(j.error ?? "No pudimos registrar su solicitud.");
        return;
      }
      setResultado({ codigo: j.codigo, mensaje: j.mensaje });
    } catch {
      setError("Se cayó la conexión. Intente de nuevo o escríbanos por WhatsApp.");
    } finally {
      setEnviando(false);
    }
  }

  if (resultado) {
    return (
      <div className="bt-card" style={{ padding: "var(--bt-space-6)" }}>
        <p className="bt-kicker bt-kicker--ch">Solicitud registrada</p>
        <h3 style={{ marginTop: "var(--bt-space-3)", fontFamily: "var(--bt-font-display)", fontWeight: 800 }}>
          Guarde este código
        </h3>
        <p
          style={{
            fontFamily: "var(--bt-font-mono)",
            fontSize: "clamp(1.6rem,1.2rem+1.4vw,2.4rem)",
            fontWeight: 800,
            color: "var(--bt-accent-readable)",
            margin: "var(--bt-space-3) 0",
          }}
        >
          {resultado.codigo}
        </p>
        <p style={{ color: "var(--bt-text-soft)" }}>{resultado.mensaje}</p>
        <div className="bt-cluster" style={{ marginTop: "var(--bt-space-5)" }}>
          <Button href="https://wa.me/573122740219" variant="wa">
            Consultar por WhatsApp
          </Button>
          <Button variant="outline" onClick={() => setResultado(null)}>
            Enviar otra
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="bt-card" style={{ padding: "var(--bt-space-6)", display: "grid", gap: "var(--bt-space-4)" }} onSubmit={enviar}>
      <div>
        <p className="bt-kicker bt-kicker--ch">Formulario</p>
        <h3 style={{ marginTop: "var(--bt-space-2)", fontFamily: "var(--bt-font-display)", fontWeight: 800 }}>
          Cuéntenos qué pasó
        </h3>
      </div>

      <label style={{ display: "grid", gap: "var(--bt-space-1)" }}>
        <span style={{ fontWeight: 700, fontSize: "var(--bt-fs-sm)" }}>Tipo de solicitud</span>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          style={campo}
        >
          {TIPOS.map((t) => (
            <option key={t.v} value={t.v}>
              {t.t}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: "grid", gap: "var(--bt-space-1)" }}>
        <span style={{ fontWeight: 700, fontSize: "var(--bt-fs-sm)" }}>
          Asunto <span style={{ color: "var(--bt-accent-readable)" }}>(obligatorio)</span>
        </span>
        <input name="asunto" required minLength={3} maxLength={160} style={campo} />
      </label>

      <label style={{ display: "grid", gap: "var(--bt-space-1)" }}>
        <span style={{ fontWeight: 700, fontSize: "var(--bt-fs-sm)" }}>
          Mensaje <span style={{ color: "var(--bt-accent-readable)" }}>(obligatorio)</span>
        </span>
        <textarea name="mensaje" required minLength={10} maxLength={4000} rows={6} style={{ ...campo, resize: "vertical" }} />
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: "var(--bt-space-2)" }}>
        <input type="checkbox" checked={anonima} onChange={(e) => setAnonima(e.target.checked)} style={{ width: 22, height: 22 }} />
        <span style={{ fontSize: "var(--bt-fs-sm)" }}>
          Enviar de forma anónima (no guardamos su nombre ni su contacto).
        </span>
      </label>

      {!anonima && (
        <>
          <div style={{ display: "grid", gap: "var(--bt-space-3)", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            <label style={{ display: "grid", gap: "var(--bt-space-1)" }}>
              <span style={{ fontWeight: 700, fontSize: "var(--bt-fs-sm)" }}>Nombre</span>
              <input name="nombre" maxLength={120} style={campo} />
            </label>
            <label style={{ display: "grid", gap: "var(--bt-space-1)" }}>
              <span style={{ fontWeight: 700, fontSize: "var(--bt-fs-sm)" }}>Teléfono</span>
              <input name="telefono" maxLength={20} style={campo} />
            </label>
            <label style={{ display: "grid", gap: "var(--bt-space-1)" }}>
              <span style={{ fontWeight: 700, fontSize: "var(--bt-fs-sm)" }}>Correo</span>
              <input name="correo" type="email" maxLength={120} style={campo} />
            </label>
          </div>
        </>
      )}

      <label style={{ display: "grid", gap: "var(--bt-space-1)" }}>
        <span style={{ fontWeight: 700, fontSize: "var(--bt-fs-sm)" }}>
          Adjuntos (imágenes o PDF, máx. 3 y 5 MB cada uno)
        </span>
        <input type="file" accept="image/*,application/pdf" multiple onChange={alElegir} style={campo} />
        {adjuntos.length > 0 && (
          <span style={{ fontSize: "var(--bt-fs-xs)", color: "var(--bt-text-soft)" }}>
            {adjuntos.map((f) => f.name).join(" · ")}
          </span>
        )}
      </label>

      <label style={{ display: "flex", alignItems: "flex-start", gap: "var(--bt-space-2)" }}>
        <input
          type="checkbox"
          name="autorizacion"
          required
          style={{ width: 22, height: 22, marginTop: "0.15rem" }}
        />
        <span style={{ fontSize: "var(--bt-fs-sm)", lineHeight: 1.45 }}>
          Autorizo el tratamiento de mis datos personales para atender esta solicitud,
          según la Ley 1581 de 2012. No pedimos ni guardamos datos de tarjeta.
        </span>
      </label>

      {error && (
        <p role="alert" style={{ color: "var(--bt-orange-500)", fontSize: "var(--bt-fs-sm)", margin: 0 }}>
          {error}
        </p>
      )}

      <div className="bt-cluster">
        <Button type="submit" variant="primary" disabled={enviando}>
          {enviando ? "Enviando…" : "Enviar solicitud"}
        </Button>
      </div>
    </form>
  );
}

const campo: React.CSSProperties = {
  minHeight: 48,
  padding: "0.7rem 0.9rem",
  background: "var(--bt-bg-sunken)",
  border: "2px solid var(--bt-border)",
  borderRadius: "var(--bt-radius-sm)",
  color: "var(--bt-text)",
  fontSize: "var(--bt-fs-md)",
  width: "100%",
};
