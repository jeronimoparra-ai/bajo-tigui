"use client";

import { useEffect, useState } from "react";

function isOpenNow(now: Date): boolean {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Bogota",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const isWeekday = !["Sat", "Sun"].includes(weekday);
  const minutes = hour * 60 + minute;
  const open = 7 * 60; // 07:00
  const close = 17 * 60; // 17:00
  return isWeekday && minutes >= open && minutes < close;
}

export function StatusBadge() {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const update = () => setOpen(isOpenNow(new Date()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (open === null) return null;
  return (
    <span
      className={open ? "bt-pill bt-pill--aqua" : "bt-pill bt-pill--orange"}
      role="status"
      aria-live="polite"
    >
      {open ? "Abierto ahora" : "Cerrado"}
    </span>
  );
}
