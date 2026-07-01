import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.from('.hero-h1', { y: 40, opacity: 0, duration: 0.7 })
        .from('.hero-sub', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-chip', { y: 20, opacity: 0, stagger: 0.12, duration: 0.5 }, '-=0.3')
        .from('.hero-action', { y: 20, opacity: 0, stagger: 0.1, duration: 0.4 }, '-=0.2')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="hero-bg"
      style={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div className="container hero-grid hero-offset">
        <div>
          <h1
            className="hero-h1"
            style={{
              color: 'var(--azul-profundo)',
              fontSize: 'clamp(1.7rem, 3vw, 2.6rem)',
              fontWeight: 700,
              letterSpacing: '0.01em',
              marginBottom: 'var(--sm)',
            }}
          >
            DOE SEU IMPOSTO DE RENDA PARA O HOSPITAL PEQUENO PRÍNCIPE E APOIE AS CAUSAS 2DOE4.
          </h1>

          <h2
            className="hero-sub"
            style={{
              color: 'var(--azul-profundo)',
              fontSize: 'clamp(1.8rem, 3.5vw, 3.4rem)',
              fontWeight: 800,
              marginBottom: 'var(--lg)',
              position: 'relative',
            }}
          >
            NÃO É NENHUM{' '}
            <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>
              BICHO DE 7 CABEÇAS.
              <svg
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                aria-hidden="true"
                style={{ position: 'absolute', left: 0, right: 0, bottom: -10, width: '100%', height: 14 }}
              >
                <path
                  d="M3 10 C 40 2, 70 12, 100 7 S 165 3, 197 9"
                  fill="none"
                  stroke="var(--rosa)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--sm)', padding: 0, margin: '0 0 var(--lg)' }}>
            {[
              'São apenas 3 passos',
              'Sem custo, direto na declaração',
              'Até 3% do IR - tendo imposto a pagar ou a restituir',
            ].map((text) => (
              <li
                key={text}
                className="hero-chip"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10, alignSelf: 'flex-start',
                  background: 'var(--branco)', borderRadius: 'var(--raio-pill)',
                  padding: '8px 18px 8px 12px', fontWeight: 700, color: 'var(--azul-profundo)',
                  boxShadow: '0 2px 8px rgba(2,78,134,0.08)',
                }}
              >
                <CrownIcon />
                {text}
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--md)' }}>
            <a className="btn btn-secondary hero-action" href="#como-doar">Ver o passo a passo</a>
            <a
              className="btn btn-primary hero-action"
              href="https://2doe4.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conhecer o Ecossistema 2doe4
            </a>
          </div>
        </div>

      </div>

      <style>{`
        .hero-bg {
          background: var(--amarelo) url('/assets/hero-bg.png') center center / cover no-repeat;
        }
        @media (max-width: 767px) {
          .hero-bg {
            background: var(--amarelo) url('/assets/hero-bg-mobile.webp') center top / cover no-repeat;
          }
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 0.72fr 1.28fr;
          gap: var(--xl);
          align-items: center;
          padding-top: var(--xl);
          padding-bottom: var(--xxl);
        }
        .hero-offset { margin-left: 200px; }
        @media (max-width: 1280px) {
          .hero-offset { margin-left: 80px; }
        }
        @media (max-width: 1023px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-offset { margin-left: 0; }
        }
      `}</style>
    </section>
  )
}

function CrownIcon() {
  return (
    <svg viewBox="0 0 24 20" aria-hidden="true" style={{ width: 20, height: 17, flexShrink: 0 }}>
      <path
        d="M2 17 L4 6 L8.5 10.5 L12 3 L15.5 10.5 L20 6 L22 17 Z"
        fill="#FFD200"
        stroke="#E8BD00"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
