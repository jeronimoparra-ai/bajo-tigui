import Link from "next/link";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 220,
          background: "var(--bt-bg-sunken)",
          borderRight: "2px solid var(--bt-border)",
          padding: "var(--bt-space-5)",
        }}
      >
        <p className="bt-kicker" style={{ color: "var(--bt-sky-400)" }}>Portal</p>
        <nav aria-label="Portal del asociado">
          <ul style={{ listStyle: "none", padding: 0, marginTop: "var(--bt-space-3)", display: "grid", gap: "var(--bt-space-1)" }}>
            <li><Link href="/portal">Mi cuenta</Link></li>
            <li><Link href="/portal/facturas">Facturas</Link></li>
            <li><Link href="/portal/pagos">Pagos</Link></li>
            <li><Link href="/portal/tickets">Tickets</Link></li>
          </ul>
        </nav>
      </aside>
      <div style={{ flex: 1, padding: "var(--bt-space-6)" }}>{children}</div>
    </div>
  );
}
