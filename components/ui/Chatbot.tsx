"use client";

import { useState } from "react";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  return (
    <aside className="bt-chat" aria-label="Asistente virtual de Bajo Tigui">
      <div className="bt-chat-panel" role="dialog" aria-labelledby="asistente-titulo" hidden={!open ? undefined : false} style={{ display: open ? "flex" : "none" }}>
        <div className="bt-chat-panel__head">
          <div className="bt-chat-panel__identity">
            <span className="bt-chat-panel__dot" aria-hidden="true"></span>
            <span id="asistente-titulo">Asistente Bajo Tigui</span>
          </div>
          <button
            type="button"
            className="at-chat__close"
            aria-label="Cerrar el asistente"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="bt-chat-panel__body">
          <div className="bt-chat-msg bt-chat-msg--bot">¡Hola! Soy el asistente de Bajo Tigui. ¿Qué necesita saber?</div>
          <div className="bt-chat-quick">
            <button type="button">¿Cuánto vale el plan?</button>
            <button type="button">¿Llega a mi casa?</button>
            <button type="button">Quiero contratar</button>
          </div>
        </div>
        <div className="bt-chat-panel__foot">
          <div className="bt-chat-panel__input-row">
            <input type="text" placeholder="Escriba su pregunta…" aria-label="Mensaje al asistente" />
            <button className="bt-btn bt-btn--primary bt-btn--sm" type="submit" aria-label="Enviar mensaje">
              →
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="bt-chat-fab"
        aria-label="Abrir el asistente virtual"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 32, height: 32 }}>
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </aside>
  );
}
