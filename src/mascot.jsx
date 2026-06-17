import React, { useMemo } from 'react'

export const Mascot = ({ size = 120, mood = "happy", style = {}, className = "" }) => {
  const brand = "var(--brand)";
  const ink = "var(--ink)";
  const sw = 9;

  let mouth;
  if (mood === "celebrate") {
    mouth = <path d="M114 196 Q128 214 142 196 Q128 204 114 196 Z" fill={ink} stroke={ink} strokeWidth="4" strokeLinejoin="round" />;
  } else if (mood === "sad") {
    mouth = <path d="M116 204 Q128 194 140 204" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />;
  } else {
    mouth = <path d="M116 197 Q128 209 140 197" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />;
  }

  const leftEye =
    mood === "wink" ? (
      <path d="M111 187 Q117 183 123 187" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />
    ) : mood === "sleep" ? (
      <path d="M111 187 Q117 191 123 187" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />
    ) : (
      <circle cx="117" cy="186" r="6.5" fill={ink} />
    );
  const rightEye =
    mood === "sleep" ? (
      <path d="M137 187 Q143 191 149 187" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />
    ) : (
      <circle cx="143" cy="186" r="6.5" fill={ink} />
    );

  return (
    <svg viewBox="0 0 256 256" width={size} height={size} className={className}
         style={style} role="img" aria-label="Mascotte Jeux Import Export" fill="none">
      <g fill={brand}>
        <polygon points="128,96 66,82 80,66" />
        <polygon points="128,96 96,60 110,56" />
        <polygon points="128,96 121,48 135,48 128,96" />
        <polygon points="128,96 146,56 160,60" />
        <polygon points="128,96 176,66 190,82" />
        <circle cx="128" cy="92" r="9" />
      </g>

      <rect x="90" y="94" width="76" height="56" rx="6" fill="#fff" stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
      <rect x="122" y="96" width="12" height="52" fill={brand} />
      <rect x="92" y="116" width="72" height="12" fill={brand} />
      <rect x="90" y="94" width="76" height="56" rx="6" fill="none" stroke={ink} strokeWidth={sw} strokeLinejoin="round" />

      <rect x="58" y="146" width="140" height="13" rx="6.5" fill={ink} />

      <path d="M96 159 V184 Q96 211 123 211 H133 Q160 211 160 184 V159"
            fill="#fff" stroke={ink} strokeWidth="10" strokeLinejoin="round" strokeLinecap="round" />

      <path d="M108 174 Q117 168 126 174" fill="none" stroke={ink} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M134 174 Q143 168 152 174" fill="none" stroke={ink} strokeWidth="4.5" strokeLinecap="round" />

      {leftEye}
      {rightEye}

      <path d="M127 190 l-4 6 h8 z" fill={ink} />

      {mouth}

      {mood === "celebrate" && (
        <g fill={brand}>
          <path d="M58 120 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" opacity="0.9" />
          <path d="M196 130 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5z" opacity="0.9" />
        </g>
      )}
    </svg>
  );
};

export const LogoBadge = ({ size = 96, mood = "happy", subtitle = "PAPEETE · TAHITI", style = {} }) => {
  const uid = useMemo(() => "arc" + Math.random().toString(36).slice(2, 8), []);
  return (
    <svg viewBox="0 0 256 256" width={size} height={size} style={style}
         role="img" aria-label="Jeux Import Export Tahiti" fill="none">
      <defs>
        <path id={uid + "-t"} d="M22 128 A106 106 0 0 1 234 128" />
        <path id={uid + "-b"} d="M13 128 A115 115 0 0 0 243 128" />
      </defs>
      <circle cx="128" cy="128" r="125" fill="#fff" />
      <circle cx="128" cy="128" r="114" fill="none" stroke="var(--brand)" strokeWidth="26" />
      <text fill="#fff" style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 600, letterSpacing: "1.5px" }} fontSize="15.5">
        <textPath href={"#" + uid + "-t"} startOffset="50%" textAnchor="middle">JEUX · IMPORT · EXPORT</textPath>
      </text>
      <text fill="#fff" style={{ fontFamily: "Fredoka, sans-serif", fontWeight: 500, letterSpacing: "2px" }} fontSize="12">
        <textPath href={"#" + uid + "-b"} startOffset="50%" textAnchor="middle">{subtitle}</textPath>
      </text>
      <g transform="translate(47 45) scale(0.6)">
        <Mascot size={256} mood={mood} />
      </g>
    </svg>
  );
};
