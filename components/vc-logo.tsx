import { cn } from "@/lib/utils";

export function VCShield({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 1.08}
      viewBox="0 0 100 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield path — classic heraldic shape */}
      <path
        d="M50 4 L94 16 L94 52 C94 76 74 96 50 104 C26 96 6 76 6 52 L6 16 Z"
        fill="#003DA5"
        stroke="white"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Inner white border line */}
      <path
        d="M50 12 L86 22 L86 52 C86 72 68 90 50 97 C32 90 14 72 14 52 L14 22 Z"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* V letter */}
      <text
        x="23"
        y="72"
        fill="#001f6b"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="52"
        letterSpacing="-4"
      >
        V
      </text>
      {/* C letter — overlaps slightly with V */}
      <text
        x="50"
        y="72"
        fill="#001f6b"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="52"
        letterSpacing="-4"
      >
        C
      </text>
    </svg>
  );
}

export function VCLogoCircle({ size = 40, className }: { size?: number; className?: string }) {
  const r = size * 0.18;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Rounded square red background */}
      <rect x="0" y="0" width="100" height="100" rx="22" ry="22" fill="#C8102E" />
      {/* Shield */}
      <path
        d="M50 8 L88 18 L88 50 C88 70 72 86 50 94 C28 86 12 70 12 50 L12 18 Z"
        fill="#003DA5"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M50 15 L81 24 L81 50 C81 67 66 81 50 88 C34 81 19 67 19 50 L19 24 Z"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* VC text */}
      <text
        x="19"
        y="68"
        fill="#001f6b"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="48"
        letterSpacing="-3"
      >
        V
      </text>
      <text
        x="48"
        y="68"
        fill="#001f6b"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="48"
        letterSpacing="-3"
      >
        C
      </text>
    </svg>
  );
}
