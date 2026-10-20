"use client";

/**
 * Hero animado "señal de TV".
 * - Todo el movimiento es CSS (transform/opacity), sin JS por frame: no puede
 *   romper la página ni el modo ligero.
 * - Se respeta `prefers-reduced-motion` y `[data-motion="lite"]`.
 * - La parábola sigue al puntero (tilt suave) solo con `pointer: fine`.
 */
export function HeroSenal() {
  return (
    <div className="hero-senal" aria-hidden="true">
      <svg viewBox="0 0 800 520" className="hero-senal__svg" focusable="false">
        <defs>
          <linearGradient id="hs-cielo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#123566" />
            <stop offset="1" stopColor="#0A1F45" />
          </linearGradient>
          <linearGradient id="hs-haz" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8FCCF0" stopOpacity="0" />
            <stop offset="0.5" stopColor="#8FCCF0" stopOpacity="0.35" />
            <stop offset="1" stopColor="#8FCCF0" stopOpacity="0" />
          </linearGradient>
          <pattern id="hs-puntos" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.7" fill="#8FCCF0" opacity="0.14" />
          </pattern>
          <clipPath id="hs-pantalla">
            <rect x="500" y="258" width="200" height="122" rx="8" />
          </clipPath>
        </defs>

        <rect width="800" height="520" fill="url(#hs-cielo)" />
        <rect width="800" height="520" fill="url(#hs-puntos)" />

        {/* Ondas que salen de la parábola: pulsan hacia fuera */}
        <g className="hero-senal__ondas" fill="none" stroke="#8FCCF0" strokeLinecap="round" strokeWidth="5">
          <path d="M 196 214 A 92 92 0 0 1 300 118" style={{ animationDelay: "0s" }} />
          <path d="M 196 214 A 128 128 0 0 1 332 92" style={{ animationDelay: "0.35s" }} />
          <path d="M 196 214 A 164 164 0 0 1 364 66" style={{ animationDelay: "0.7s" }} />
        </g>

        {/* Haz que llega a la pantalla */}
        <rect className="hero-senal__haz" x="200" y="150" width="270" height="150" fill="url(#hs-haz)" />

        {/* Parabólica */}
        <g className="hero-senal__p dish">
          <g className="hero-senal__p-dish">
            <path d="M 196 214 Q 244 300 292 214" fill="#8FCCF0" stroke="#0B0B0B" strokeWidth="7" strokeLinejoin="round" />
            <path d="M 196 214 Q 244 128 292 214" fill="none" stroke="#A1D9D4" strokeWidth="7" strokeLinecap="round" />
            <circle cx="244" cy="186" r="9" fill="#A1D9D4" stroke="#0B0B0B" strokeWidth="5" />
            <path d="M 244 214 L 244 186" stroke="#0B0B0B" strokeWidth="6" strokeLinecap="round" />
          </g>
          <path d="M 244 214 L 244 330" stroke="#8FCCF0" strokeWidth="8" strokeLinecap="round" />
          <path d="M 244 330 L 214 372" stroke="#8FCCF0" strokeWidth="8" strokeLinecap="round" />
          <path d="M 244 330 L 274 372" stroke="#8FCCF0" strokeWidth="8" strokeLinecap="round" />
          <path d="M 196 380 L 292 380" stroke="#8FCCF0" strokeWidth="8" strokeLinecap="round" />
        </g>

        {/* Señal que viaja por el cable hacia la casa */}
        <path className="hero-senal__cable" d="M 244 380 Q 300 430 400 430" fill="none" stroke="#A1D9D4" strokeWidth="5" strokeLinecap="round" strokeDasharray="4 18" />

        {/* Casa con el televisor en la pared */}
        <g stroke="#0B0B0B" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round">
          <path d="M 470 400 L 470 240 L 600 140 L 730 240 L 730 400 Z" fill="#F7F4EC" />
          <path d="M 440 248 L 600 122 L 760 248 L 760 238 L 600 112 L 440 238 Z" fill="#FE6301" />
          <rect x="560" y="330" width="76" height="70" fill="#8FCCF0" />
        </g>

        {/* Pantalla encendida con la barra de escaneo */}
        <g clipPath="url(#hs-pantalla)">
          <rect x="500" y="258" width="200" height="122" fill="#0B1B45" />
          <rect className="hero-senal__scan" x="500" y="258" width="200" height="22" fill="#A1D9D4" opacity="0.35" />
          <path d="M 500 380 L 560 300 L 610 340 L 660 285 L 700 320 L 700 380 L 500 380 Z" fill="#1A3A6B" />
        </g>
        <rect x="500" y="258" width="200" height="122" rx="8" fill="none" stroke="#0B0B0B" strokeWidth="7" />

        {/* Medidor de señal (barras) */}
        <g className="hero-senal__barras" fill="#A1D9D4">
          <rect x="512" y="274" width="10" height="14" rx="3" />
          <rect x="528" y="266" width="10" height="22" rx="3" />
          <rect x="544" y="256" width="10" height="32" rx="3" />
          <rect x="560" y="248" width="10" height="40" rx="3" />
        </g>
      </svg>

      <span className="hero-senal__vivo">
        <i aria-hidden="true" /> EN VIVO
      </span>
    </div>
  );
}
