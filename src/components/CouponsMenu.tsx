import { useState, useRef, useEffect } from 'react'
import CouponChip from './CouponChip'

interface Cupom {
  causa: string
  codigo: string
  instagram: string
  cor: string
}

export const CUPONS: Cupom[] = [
  { causa: 'Saúde', codigo: 'CURADOABEM', instagram: 'curadoabem', cor: 'var(--azul)' },
  { causa: 'Equoterapia', codigo: 'POWERDOABEM', instagram: 'powerdoabem', cor: 'var(--rosa)' },
  { causa: 'Esporte', codigo: 'ULTRADOABEM', instagram: 'ultradoabem', cor: 'var(--verde)' },
  { causa: 'Meio Ambiente', codigo: 'VERDEDOABEM', instagram: 'verdedoabem', cor: '#3D8B5C' },
  { causa: 'Educação', codigo: 'BASEDOABEM', instagram: 'powerdoabem', cor: 'var(--azul-profundo)' },
]

export default function CouponsMenu() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--amarelo)', color: 'var(--azul-profundo)',
          fontWeight: 800, border: 'none', borderRadius: 'var(--raio-pill)',
          padding: '10px 18px', cursor: 'pointer', fontSize: '0.9375rem',
          transition: 'background 150ms, transform 150ms',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#F0C600' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--amarelo)' }}
      >
        <TicketIcon /> Cupons
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          role="menu"
          className="coupons-panel"
          style={{
            position: 'absolute', top: 'calc(100% + 10px)', right: 0,
            width: 'min(360px, calc(100vw - 32px))', background: 'var(--branco)',
            borderRadius: 'var(--raio-lg)', boxShadow: '0 16px 40px rgba(2,78,134,0.22)',
            padding: 'var(--md)', zIndex: 60,
          }}
        >
          <span style={{ display: 'block', fontWeight: 800, fontSize: '0.9375rem', color: 'var(--azul-profundo)' }}>
            🎟 Cupons Exclusivos
          </span>
          <p style={{ margin: '2px 0 var(--sm)', fontSize: '0.8125rem', color: '#5A6B7C' }}>
            Clique no código para copiar · Siga no Instagram
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CUPONS.map((c) => (
              <div key={c.codigo} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.cor, flexShrink: 0 }} />
                <span style={{
                  flex: 1, fontWeight: 700, fontSize: '0.875rem', color: 'var(--azul-profundo)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {c.causa}
                </span>
                <CouponChip codigo={c.codigo} instagram={c.instagram} compact />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function TicketIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z" strokeLinejoin="round" />
      <path d="M10 6v12" strokeDasharray="2 3" strokeLinecap="round" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      aria-hidden="true"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
