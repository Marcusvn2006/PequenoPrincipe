import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CrownBadge from '../CrownBadge'

gsap.registerPlugin(ScrollTrigger)

export default function ContextoSection() {
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (counterRef.current) {
        const obj = { val: 0 }
        gsap.to(obj, {
          val: 7.76,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: counterRef.current, start: 'top 80%', once: true },
          onUpdate() {
            if (counterRef.current) {
              counterRef.current.textContent = `R$ ${obj.val.toFixed(2).replace('.', ',')} bilhões`
            }
          },
          onComplete() {
            if (counterRef.current) counterRef.current.textContent = 'R$ 7,76 bilhões'
          },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section style={{ background: 'var(--branco)', padding: 'var(--xxl) 0' }}>
      <div className="container contexto-grid">
        <div className="reveal" style={{ position: 'relative' }}>
          <CrownBadge />
          <img
            src="/assets/ilustracao-hospital.webp"
            alt="Fachada do Hospital Pequeno Príncipe com a coroa do complexo na entrada"
            style={{
              width: '100%', height: 280, borderRadius: 24,
              objectFit: 'contain', background: 'var(--ceu)',
              boxShadow: '0 12px 32px rgba(2,78,134,0.14)',
            }}
          />
        </div>

        <div className="reveal">
          <div
            ref={counterRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 4vw, 4.6rem)',
              color: 'var(--azul)',
              lineHeight: 1,
              marginBottom: 'var(--md)',
            }}
          >
            R$ 0,00 bilhões
          </div>

          <p>
            Esse é o potencial aproximado de doação do Imposto de Renda de pessoas físicas
            no Brasil, segundo a Receita Federal. Mas,{' '}
            <strong>somente 2,84% desse valor foi destinado para instituições filantrópicas em 2025</strong>.
          </p>

          <svg
            width="180"
            height="40"
            viewBox="0 0 180 40"
            aria-hidden="true"
            style={{ margin: 'var(--sm) 0 var(--lg)', display: 'block' }}
          >
            <path
              d="M5 32 C 50 8, 110 36, 160 14"
              fill="none"
              stroke="var(--azul)"
              strokeWidth="2.5"
              strokeDasharray="2 7"
              strokeLinecap="round"
            />
            <path d="M158 8 L172 13 L160 21 L161 14 Z" fill="var(--rosa)" />
          </svg>

          <p>
            A doação é <strong>fácil e sem custos</strong>. Todo o <strong>valor arrecadado</strong>{' '}
            é direcionado para os projetos do <strong>Hospital Pequeno Príncipe</strong> integrados
            às <strong>Causas 2doe4</strong> (Saúde, Equoterapia, Esporte, Meio Ambiente e Educação).
          </p>
        </div>
      </div>

      <style>{`
        .contexto-grid {
          display: grid;
          grid-template-columns: 0.45fr 1fr;
          gap: var(--xl);
          align-items: center;
        }
        @media (max-width: 1023px) {
          .contexto-grid { grid-template-columns: 1fr; }
          .contexto-grid > div:first-child { display: none; }
        }
      `}</style>
    </section>
  )
}
