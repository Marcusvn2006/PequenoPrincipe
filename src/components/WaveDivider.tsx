interface WaveDividerProps {
  bgColor: string
  fillColor: string
  path?: string
  overlapPrevious?: boolean
}

const DEFAULT_PATH = 'M0,32 C240,64 480,0 720,16 C960,40 1200,56 1440,24 L1440,60 L0,60 Z'

export default function WaveDivider({ bgColor, fillColor, path = DEFAULT_PATH, overlapPrevious = false }: WaveDividerProps) {
  return (
    <div
      className={`wave${overlapPrevious ? ' wave--overlap' : ''}`}
      style={{ background: bgColor, position: 'relative', zIndex: 1 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path fill={fillColor} d={path} />
      </svg>
    </div>
  )
}
