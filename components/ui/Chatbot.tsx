"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Mensaje = { rol: "user" | "assistant"; contenido: string };

const PREGUNTAS = [
  "¿Cuánto vale el plan?",
  "¿Llega a mi casa?",
  "No me da señal en el televisor",
  "Quiero contratar",
];

export function Chatbot() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [consentido, setConsentido] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mensajes, abierto]);

  async function enviar(pregunta?: string) {
    const m = (pregunta ?? texto).trim();
    if (!m || enviando) return;
    setTexto("");
    const historial = mensajes.slice(-10);
    setMensajes((prev) => [...prev, { rol: "user", contenido: m }]);
    setEnviando(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: m, historial }),
      });

      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}));
        setMensajes((prev) => [
          ...prev,
          { rol: "assistant", contenido: j.error ?? "No pude responder ahora mismo." },
        ]);
        return;
      }

      const lector = res.body.getReader();
      const dec = new TextDecoder();
      let buffer = "";
      let acumulado = "";

      while (true) {
        const { done, value } = await lector.read();
        if (done) break;
        buffer += dec.decode(value, { stream: true });
        const partes = buffer.split("\n\n");
        buffer = partes.pop() ?? "";
        for (const parte of partes) {
          const linea = parte.split("\n").find((l) => l.startsWith("data:"));
          if (!linea) continue;
          try {
            const ev = JSON.parse(linea.slice(5).trim());
            if (ev.tipo === "texto") {
              acumulado += ev.texto;
              setMensajes((prev) => {
                const copia = [...prev];
                copia[copia.length - 1] = { rol: "assistant", contenido: acumulado };
                return copia;
              });
            } else if (ev.tipo === "error") {
              acumulado += `\n${ev.mensaje}`;
              setMensajes((prev) => {
                const copia = [...prev];
                copia[copia.length - 1] = { rol: "assistant", contenido: acumulado };
                return copia;
              });
            }
          } catch {
            /* fragmento incompleto: se espera el siguiente */
          }
        }
      }
    } catch {
      setMensajes((prev) => [
        ...prev,
        {
          rol: "assistant",
          contenido:
            "Se cayó la conexión con el asistente. Puede escribirnos por WhatsApp al 312 274 0219.",
        },
      ]);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <aside className="bt-chat" aria-label="Asistente virtual de Bajo Tigui">
      <div
        className="bt-chat-panel"
        role="dialog"
        aria-labelledby="asistente-titulo"
        hidden={!abierto ? true : undefined}
      >
        <div className="bt-chat-panel__head">
          <div className="bt-chat-panel__identity">
            <span className="bt-chat-panel__dot" aria-hidden="true"></span>
            <span id="asistente-titulo">Asistente Bajo Tigui</span>
          </div>
          <button
            type="button"
            className="at-chat__close"
            aria-label="Cerrar el asistente"
            onClick={() => setAbierto(false)}
          >
            ✕
          </button>
        </div>

        <div className="bt-chat-panel__body">
          {!consentido ? (
            <div className="bt-chat-msg bt-chat-msg--system">
              <p>
                Antes de empezar: al usar el asistente acepta que guardemos esta
                conversación para atender su solicitud, según la Ley 1581 de 2012. No
                pedimos ni guardamos datos de tarjeta ni contraseñas.
              </p>
              <button
                type="button"
                className="bt-btn bt-btn--primary bt-btn--sm"
                onClick={() => setConsentido(true)}
              >
                Aceptar y continuar
              </button>
            </div>
          ) : (
            <>
              {mensajes.length === 0 && (
                <>
                  <div className="bt-chat-msg bt-chat-msg--bot">
                    ¡Hola! Soy el asistente de Bajo Tigui. ¿Qué necesita saber?
                  </div>
                  <div className="bt-chat-quick">
                    {PREGUNTAS.map((p) => (
                      <button key={p} type="button" onClick={() => enviar(p)}>
                        {p}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {mensajes.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "bt-chat-msg",
                    m.rol === "user" ? "bt-chat-msg--user" : "bt-chat-msg--bot",
                  )}
                >
                  {m.contenido}
                </div>
              ))}
              {enviando && (
                <div className="bt-chat-msg bt-chat-msg--bot" aria-live="polite">
                  Escribiendo…
                </div>
              )}
              <div ref={finRef} />
            </>
          )}
        </div>

        {consentido && (
          <div className="bt-chat-panel__foot">
            <div className="bt-chat-panel__input-row">
              <input
                type="text"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") enviar();
                }}
                placeholder="Escriba su pregunta…"
                aria-label="Mensaje al asistente"
                disabled={enviando}
              />
              <button
                className="bt-btn bt-btn--primary bt-btn--sm"
                type="button"
                onClick={() => enviar()}
                aria-label="Enviar mensaje"
                disabled={enviando}
              >
                →
              </button>
            </div>
            <a className="bt-chat-panel__wa-exit" href="https://wa.me/573122740219">
              Continuar por WhatsApp
            </a>
          </div>
        )}
      </div>

      <button
        type="button"
        className="bt-chat-fab"
        aria-label="Abrir el asistente virtual"
        aria-expanded={abierto}
        onClick={() => setAbierto((v) => !v)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ width: 32, height: 32 }}
        >
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </aside>
  );
}
