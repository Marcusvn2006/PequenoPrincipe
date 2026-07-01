import { useState, useRef, useLayoutEffect, Fragment } from 'react'
import gsap from 'gsap'
import type { FaqBlock, FaqSpan } from '../data/faq'

interface FaqItemProps {
  pergunta: string
  resposta: FaqBlock[]
  index: number
}

export default function FaqItem({ pergunta, resposta, index }: FaqItemProps) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const panel = panelRef.current
    const content = contentRef.current
    const icon = iconRef.current
    if (!panel || !content || !icon) return

    if (open) {
      const h = content.offsetHeight
      gsap.to(panel, { height: h, duration: 0.45, ease: 'power3.out' })
      gsap.to(icon, { rotate: 45, duration: 0.35, ease: 'back.out(2)' })
    } else {
      gsap.to(panel, { height: 0, duration: 0.3, ease: 'power2.inOut' })
      gsap.to(icon, { rotate: 0, duration: 0.25, ease: 'power2.out' })
    }
  }, [open])

  const bgStyle: React.CSSProperties = index % 2 === 0
    ? { background: 'var(--ceu)' }
    : { background: 'var(--branco)', border: '1.5px solid var(--ceu)' }

  return (
    <div
      className="faq-card"
      style={{
        borderRadius: 'var(--raio-lg)',
        overflow: 'hidden',
        borderLeft: open ? '4px solid var(--rosa)' : '4px solid transparent',
        transition: 'border-color 250ms',
        ...bgStyle,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="faq-btn"
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 'var(--md)',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
          fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.0625rem',
          color: open ? 'var(--rosa)' : 'var(--azul-profundo)',
          padding: 'var(--md) var(--lg)', minHeight: 56,
          transition: 'color 200ms',
        }}
      >
        <span>{pergunta}</span>
        <span
          ref={iconRef}
          style={{
            width: 32, height: 32, borderRadius: '50%',
            background: open ? 'var(--rosa)' : 'var(--amarelo)',
            color: open ? '#fff' : 'var(--azul-profundo)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: '1.3rem', flexShrink: 0, lineHeight: 1,
            transition: 'background 200ms, color 200ms',
          }}
        >
          +
        </span>
      </button>

      <div ref={panelRef} style={{ height: 0, overflow: 'hidden' }}>
        <div ref={contentRef}>
          <div style={{
            padding: '0 var(--lg) var(--lg)',
            borderLeft: '3px solid var(--amarelo)',
            margin: '0 var(--lg) var(--md)',
            color: 'var(--tinta)',
          }}>
            {resposta.map((block, i) => <FaqBlockView key={i} block={block} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

function FaqSpanView({ span }: { span: FaqSpan }) {
  if (typeof span === 'string') return <>{span}</>
  if ('bold' in span) return <strong>{span.bold}</strong>
  return (
    <a href={span.link.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--azul)', fontWeight: 700 }}>
      {span.link.text}
    </a>
  )
}

function FaqBlockView({ block }: { block: FaqBlock }) {
  if (block.type === 'heading') {
    return (
      <p style={{ fontWeight: 800, color: 'var(--azul-profundo)', margin: '14px 0 6px' }}>
        {block.text}
      </p>
    )
  }

  if (block.type === 'p') {
    return (
      <p style={{ margin: '0 0 10px', lineHeight: 1.6 }}>
        {block.content.map((span, i) => <Fragment key={i}><FaqSpanView span={span} /></Fragment>)}
      </p>
    )
  }

  const items = block.items.map((item, i) => (
    <li key={i} style={{ marginBottom: 6 }}>
      {item.map((span, j) => <Fragment key={j}><FaqSpanView span={span} /></Fragment>)}
    </li>
  ))

  return block.ordered ? (
    <ol start={block.start} style={{ margin: '4px 0 12px', paddingLeft: 22 }}>{items}</ol>
  ) : (
    <ul style={{ margin: '4px 0 12px', paddingLeft: 22 }}>{items}</ul>
  )
}
