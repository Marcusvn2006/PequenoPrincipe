import { useState } from 'react'

interface CouponChipProps {
  codigo: string
  instagram: string
  compact?: boolean
}

export default function CouponChip({ codigo, instagram, compact = false }: CouponChipProps) {
  const [copiado, setCopiado] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codigo)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 1800)
    } catch {
      // clipboard indisponível (ex: contexto não seguro) — ignora silenciosamente
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        type="button"
        onClick={handleCopy}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: copiado ? 'var(--verde)' : 'var(--ceu)',
          color: copiado ? '#fff' : 'var(--azul)',
          fontWeight: 800, border: 'none', borderRadius: 8,
          padding: compact ? '6px 10px' : '8px 12px', cursor: 'pointer',
          fontSize: compact ? '0.8125rem' : '0.875rem',
          transition: 'background 150ms, color 150ms',
          whiteSpace: 'nowrap',
        }}
      >
        {copiado ? 'Copiado!' : codigo}
        <CopyIcon />
      </button>
      <a
        href={`https://instagram.com/${instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Seguir @${instagram} no Instagram`}
        style={{
          width: compact ? 30 : 34, height: compact ? 30 : 34, borderRadius: '50%',
          background: 'var(--amarelo)', display: 'inline-flex', alignItems: 'center',
          justifyContent: 'center', color: 'var(--azul-profundo)', flexShrink: 0,
          transition: 'transform 150ms, background 150ms',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
      >
        <InstaIcon size={compact ? 15 : 17} />
      </a>
    </div>
  )
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  )
}

function InstaIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
