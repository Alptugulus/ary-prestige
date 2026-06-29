export function Logo({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={compact ? 28 : 32}
        height={compact ? 28 : 32}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="flex-shrink-0"
      >
        <path
          d="M18 4L32 30H4L18 4Z"
          stroke="#C5A059"
          strokeWidth="1.2"
          fill="none"
        />
        <path d="M11 24H25" stroke="#C5A059" strokeWidth="1.2" />
        <path d="M14 18H22" stroke="#C5A059" strokeWidth="1.2" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-sans text-[8px] lg:text-[9px] tracking-[0.26em] uppercase text-white/45 font-medium whitespace-nowrap">
          ARY Grup
        </span>
        <span
          className={`font-display text-gold-gradient font-medium uppercase whitespace-nowrap ${
            compact
              ? "text-sm tracking-[0.12em] mt-0.5"
              : "text-base md:text-lg tracking-[0.14em] mt-1"
          }`}
        >
          ARY Prestige
        </span>
      </div>
    </div>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3.5 2.5C3.5 2.5 4.5 1.5 6 1.5C7.5 1.5 8.5 3 8.5 3L7 4.5C7 4.5 7.5 5.5 8 6.5C8.5 7.5 9.5 9 10.5 9.5C11.5 10 12.5 10.5 12.5 10.5L14 9C14 9 15.5 10 15.5 11.5C15.5 13 14.5 14 14.5 14C14.5 14 12 15.5 8 12C4 8.5 3.5 6 3.5 6C3.5 6 2.5 5 2.5 3.5C2.5 2 3.5 2.5 3.5 2.5Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ScrollMouseIcon() {
  return (
    <svg width="20" height="32" viewBox="0 0 20 32" fill="none" aria-hidden>
      <rect
        x="1"
        y="1"
        width="18"
        height="30"
        rx="9"
        stroke="#B88A5A"
        strokeWidth="1.2"
      />
      <circle cx="10" cy="10" r="2" fill="#C5A059">
        <animate
          attributeName="cy"
          values="10;16;10"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

export function CompassIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden>
      <circle cx="40" cy="40" r="38" stroke="#B88A5A" strokeWidth="0.5" opacity="0.4" />
      <circle cx="40" cy="40" r="28" stroke="#B88A5A" strokeWidth="0.5" opacity="0.3" />
      <line x1="40" y1="6" x2="40" y2="14" stroke="#B88A5A" strokeWidth="0.8" />
      <line x1="40" y1="66" x2="40" y2="74" stroke="#B88A5A" strokeWidth="0.8" />
      <line x1="6" y1="40" x2="14" y2="40" stroke="#B88A5A" strokeWidth="0.8" />
      <line x1="66" y1="40" x2="74" y2="40" stroke="#B88A5A" strokeWidth="0.8" />
      <text x="40" y="22" textAnchor="middle" fill="#B88A5A" fontSize="8" opacity="0.7">
        K
      </text>
      <text x="40" y="68" textAnchor="middle" fill="#B88A5A" fontSize="8" opacity="0.5">
        G
      </text>
      <text x="22" y="43" textAnchor="middle" fill="#B88A5A" fontSize="8" opacity="0.5">
        B
      </text>
      <text x="58" y="43" textAnchor="middle" fill="#B88A5A" fontSize="8" opacity="0.5">
        D
      </text>
      <polygon points="40,18 36,40 40,36 44,40" fill="#B88A5A" opacity="0.8" />
      <polygon points="40,62 36,40 40,44 44,40" fill="#B88A5A" opacity="0.3" />
    </svg>
  );
}

export function StatIcons({ icon, className = "" }: { icon: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    land: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 20h16M8 20V8l4-4 4 4v12M6 20v-4h12v4"
      />
    ),
    area: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4h16v16H4zM8 8h8v8H8z"
      />
    ),
    building: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 20V6l6-3 6 3v14M10 20v-4h4v4M10 10h4M10 14h4"
      />
    ),
    villa: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 20l8-10 8 10M8 20v-6h8v6"
      />
    ),
    apartment: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4h16v16H4zM4 10h16M10 4v16M10 14h4"
      />
    ),
    panorama: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 16l4-6 4 4 4-8 4 6 4-4 2 8"
      />
    ),
  };

  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
    >
      {icons[icon]}
    </svg>
  );
}

export function HeroFeatureIcons({ icon, className = "" }: { icon: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    panorama: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M4 16c2-3 4-5 8-5s6 2 8 5" />
        <path d="M8 8l2 2M16 8l-2 2" />
      </>
    ),
    building: (
      <>
        <rect x="6" y="4" width="12" height="16" />
        <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
      </>
    ),
    apartment: (
      <>
        <rect x="4" y="4" width="16" height="16" />
        <path d="M4 12h16M12 4v16" />
      </>
    ),
    area: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <path d="M8 8h8v8H8z" />
      </>
    ),
    villa: (
      <>
        <path d="M4 18l8-10 8 10" />
        <rect x="8" y="12" width="8" height="6" />
      </>
    ),
  };

  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
    >
      {icons[icon]}
    </svg>
  );
}

export function Icon360({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M16 4h4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <text x="8" y="14" fill="currentColor" fontSize="6" fontWeight="500">
        360°
      </text>
    </svg>
  );
}

export function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1" />
      <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
    </svg>
  );
}
