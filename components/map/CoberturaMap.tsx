"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// El Bagre, Antioquia (aprox). Coordenadas por confirmar.
const CENTER: [number, number] = [7.612, -74.807];

export function CoberturaMap() {
  return (
    <div style={{ height: 360, width: "100%", borderRadius: "var(--bt-radius-md)", overflow: "hidden" }}>
      <MapContainer
        center={CENTER}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker center={CENTER} radius={12} pathOptions={{ color: "#A1D9D4", fillColor: "#A1D9D4", fillOpacity: 0.6 }}>
          <Popup>El Bagre (zona de cobertura — por confirmar)</Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}
