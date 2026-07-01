import { useMemo, useRef, useState, useLayoutEffect, type ChangeEvent } from 'react'
import gsap from 'gsap'
import FaqItem from '../FaqItem'
import { FAQ_PERGUNTAS, FAQ_CATEGORIAS, type FaqCategoria } from '../../data/faq'

export default function FaqSection() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState<FaqCategoria | 'todas'>('todas')
  const listaRef = useRef<HTMLDivElement>(null)
  const primeiraRenderizacao = useRef(true)

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return FAQ_PERGUNTAS.filter((item) => {
      const bateCategoria = categoria === 'todas' || item.categoria === categoria
      const bateBusca = !termo || item.pergunta.toLowerCase().includes(termo)
      return bateCategoria && bateBusca
    })
  }, [busca, categoria])

  useLayoutEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false
      return
    }
    if (!listaRef.current) return
    const linhas = listaRef.current.querySelectorAll('.faq-row')
    gsap.fromTo(
      linhas,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.04 }
    )
  }, [busca, categoria])

  const handleBusca = (e: ChangeEvent<HTMLInputElement>) => setBusca(e.target.value)

  const limparFiltros = () => {
    setBusca('')
    setCategoria('todas')
  }

  return (
    <section id="faq" style={{ background: 'var(--branco)', padding: 'var(--xxl) 0' }}>
      <div className="container" style={{ maxWidth: 860 }}>
        <h2 className="reveal" style={{ color: 'var(--azul)', fontSize: 'clamp(1.8rem, 2.5vw, 2.25rem)', textAlign: 'center', marginBottom: 'var(--sm)' }}>
          Dúvidas frequentes
        </h2>
        <p className="reveal" style={{ textAlign: 'center', color: '#5A6B7C', marginBottom: 'var(--lg)' }}>
          Busque por palavra-chave ou filtre por categoria.
        </p>

        <div className="reveal" style={{ marginBottom: 'var(--md)' }}>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--azul)', display: 'flex', pointerEvents: 'none',
            }}>
              <SearchIcon />
            </span>
            <input
              type="text"
              value={busca}
              onChange={handleBusca}
              placeholder="Buscar uma pergunta... (ex: empresa, FIA, taxa)"
              style={{
                width: '100%', height: 52, borderRadius: 'var(--raio-pill)',
                border: '1.5px solid var(--borda-campo)', padding: '0 var(--md) 0 50px',
                fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--tinta)',
                outline: 'none', transition: 'border-color 150ms, box-shadow 150ms',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--azul)' }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--borda-campo)' }}
            />
          </div>
        </div>

        <div className="reveal faq-pills" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 'var(--lg)' }}>
          {FAQ_CATEGORIAS.map((cat) => {
            const ativo = categoria === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoria(cat.id)}
                style={{
                  padding: '8px 18px', borderRadius: 'var(--raio-pill)', border: 'none',
                  cursor: 'pointer', fontWeight: 700, fontSize: '0.9375rem',
                  background: ativo ? 'var(--azul)' : 'var(--ceu)',
                  color: ativo ? '#fff' : 'var(--azul-profundo)',
                  transition: 'background 150ms, color 150ms, transform 150ms',
                }}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        <p className="reveal" style={{ fontSize: '0.875rem', color: '#5A6B7C', marginBottom: 'var(--md)' }}>
          {filtradas.length} {filtradas.length === 1 ? 'pergunta encontrada' : 'perguntas encontradas'}
        </p>

        <div ref={listaRef} className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sm)', minHeight: 120 }}>
          {filtradas.map((item, i) => (
            <div className="faq-row" key={item.pergunta}>
              <FaqItem pergunta={item.pergunta} resposta={item.resposta} index={i} />
            </div>
          ))}

          {filtradas.length === 0 && (
            <div style={{
              textAlign: 'center', padding: 'var(--xl) var(--md)', color: '#5A6B7C',
              background: 'var(--ceu)', borderRadius: 'var(--raio-lg)',
            }}>
              <p style={{ fontWeight: 700, marginBottom: 'var(--sm)' }}>Nenhuma pergunta encontrada 🤔</p>
              <p style={{ marginBottom: 'var(--md)' }}>Tente outra palavra-chave ou limpe os filtros.</p>
              <button
                type="button"
                onClick={limparFiltros}
                className="btn btn-secondary"
                style={{ minHeight: 40, padding: '8px 20px' }}
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 639px) {
          #faq h2 { font-size: 1.8rem !important; }
          .faq-pills { justify-content: center; }
        }
      `}</style>
    </section>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  )
}
