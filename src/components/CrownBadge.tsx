interface CrownBadgeProps {
  top?: number
  left?: number
  size?: number
  rotate?: number
}

export default function CrownBadge({ top = -22, left = -16, size = 56, rotate = -12 }: CrownBadgeProps) {
  return (
    <svg
      viewBox="0 0 24 20"
      aria-hidden="true"
      style={{
        position: 'absolute', top, left, width: size, height: size * (48 / 56),
        transform: `rotate(${rotate}deg)`, zIndex: 1,
      }}
    >
      <path
        d="M2 17 L4 6 L8.5 10.5 L12 3 L15.5 10.5 L20 6 L22 17 Z"
        fill="#FFD200" stroke="#E8BD00" strokeWidth="1" strokeLinejoin="round"
      />
    </svg>
  )
}
