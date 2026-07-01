import { useRef, useState, type ReactNode } from 'react'

interface UploadZoneProps {
  label: string
  tooltip: string
  icon: ReactNode
}

export default function UploadZone({ label, tooltip, icon }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = (file: File) => setFileName(file.name)

  return (
    <div
      style={{
        border: `2px ${dragOver ? 'solid' : 'dashed'} ${dragOver ? 'var(--azul)' : 'var(--amarelo)'}`,
        background: dragOver ? 'rgba(255,244,194,0.2)' : 'rgba(255,244,194,0.4)',
        borderRadius: 'var(--raio-lg)', padding: 'var(--lg)',
        textAlign: 'center', position: 'relative',
        transition: 'border-color 200ms, background 200ms',
      }}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file) handleFile(file)
      }}
    >
      {tooltipOpen && (
        <div style={{
          position: 'absolute', left: '50%', bottom: 'calc(100% + 12px)',
          transform: 'translateX(-50%)', width: 'min(320px, 90vw)',
          background: 'var(--branco)', borderRadius: 'var(--raio-md)',
          boxShadow: '0 10px 30px rgba(2,58,99,0.25)', padding: 'var(--md)',
          fontSize: '0.9rem', textAlign: 'left', zIndex: 10,
        }}>
          {tooltip}
          <div style={{
            position: 'absolute', top: '100%', left: '50%',
            transform: 'translateX(-50%)', width: 0, height: 0,
            borderLeft: '10px solid transparent', borderRight: '10px solid transparent',
            borderTop: '10px solid var(--branco)',
          }} />
        </div>
      )}

      <div style={{ width: 40, height: 40, margin: '0 auto var(--sm)', color: 'var(--azul)' }}>
        {icon}
      </div>

      <span style={{
        fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.06em',
        textTransform: 'uppercase', color: 'var(--azul)', display: 'block', marginBottom: 4,
      }}>
        {label} <span style={{ color: 'var(--accent)' }}>*</span>
      </span>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setTooltipOpen(o => !o) }}
        style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          color: 'var(--azul)', textDecoration: 'underline', fontSize: '0.9375rem',
          fontFamily: 'var(--font-body)',
        }}
      >
        (O que é {label.toLowerCase()}?)
      </button>

      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          style={{
            marginTop: 'var(--md)', display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--ceu)', color: 'var(--azul)', fontWeight: 800,
            border: 'none', borderRadius: 'var(--raio-pill)',
            padding: '12px 24px', cursor: 'pointer', minHeight: 44,
            fontFamily: 'var(--font-body)', transition: 'background 150ms',
          }}
        >
          + Selecionar arquivos
        </button>
      </div>

      {fileName && (
        <span style={{
          marginTop: 'var(--md)', display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--branco)', border: '1.5px solid var(--borda-campo)',
          borderRadius: 'var(--raio-pill)', padding: '6px 8px 6px 16px',
          fontSize: '0.9rem', fontWeight: 700,
        }}>
          <span style={{
            overflow: 'hidden', textOverflow: 'ellipsis',
            whiteSpace: 'nowrap', maxWidth: 220,
          }}>
            {fileName}
          </span>
          <button
            type="button"
            onClick={() => setFileName(null)}
            aria-label="Remover arquivo"
            style={{
              width: 28, height: 28, borderRadius: '50%', border: 'none',
              cursor: 'pointer', background: 'var(--ceu)', color: 'var(--azul)',
              fontWeight: 800, lineHeight: 1, fontFamily: 'var(--font-body)',
            }}
          >
            ×
          </button>
        </span>
      )}

      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }}
      />
    </div>
  )
}
