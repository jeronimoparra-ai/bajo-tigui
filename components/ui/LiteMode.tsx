"use client";

import { useEffect } from "react";

export function LiteMode() {
  useEffect(() => {
    const root = document.documentElement;
    // Respeta movimiento reducido.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Detecta conexión lenta (Save-Data o effectiveType 2g/3g).
    let slow = false;
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn) {
      if (conn.saveData) slow = true;
      if (conn.effectiveType && /2g|3g/.test(conn.effectiveType)) slow = true;
    }
    if (reduce || slow) {
      root.setAttribute("data-motion", "lite");
    }
  }, []);
  return null;
}
