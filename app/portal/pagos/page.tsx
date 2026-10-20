"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PaymentMethods } from "@/components/ui/PaymentMethods";
import { useState } from "react";

export default function PortalPagos() {
  const [method, setMethod] = useState("nequi");
  return (
    <main>
      <h1 className="bt-display bt-display--xl">Pagos</h1>
      <p style={{ color: "var(--bt-text-soft)", marginTop: "var(--bt-space-2)" }}>
        UI en construcción. Por ahora solo Nequi. Los pagos (Wompi/ePayco) se conectan en la Fase 4.
      </p>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <Card>
          <p style={{ margin: 0, fontSize: "var(--bt-fs-sm)" }}>Factura ejemplo · $70.000 · pendiente</p>
        </Card>
      </div>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <PaymentMethods selected={method} onSelect={setMethod} />
      </div>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <Button variant="primary" size="lg">Pagar factura</Button>
      </div>
    </main>
  );
}
