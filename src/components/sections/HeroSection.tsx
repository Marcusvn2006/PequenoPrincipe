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
            DESTINAÇÃO VINCULADA VIA CAC
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
            SEU IMPOSTO DE RENDA PODE FORTALECER UM{' '}
            <span style={{ position: 'relative', display: 'inline' }}>
              PROJETO QUE VOCÊ CONHECE.
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

          
 <p className="hero-action" style={{ marginTop: 'var(--lg)', maxWidth: 650, fontWeight: 700, color: 'var(--azul-profundo)' }}>
            A BASEDOBEM aproxima pessoas, empresas e entidades de projetos sociais aprovados pelos
            Conselhos de Direitos da Criança e do Adolescente e da Pessoa Idosa. Por meio do CAC,
            sua destinação pode ser vinculada a um projeto específico, com mais identificação,
            rastreabilidade e possibilidade de acompanhamento.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--md)' }}>
            <a className="btn btn-secondary hero-action" href="#formulario">Quero fazer uma destinação</a>
            <a
              className="btn btn-primary hero-action"
              href="#formulario"
            >
              Quero apresentar um projeto
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
          grid-template-columns: minmax(0, 0.95fr) minmax(180px, 1.05fr);
          gap: var(--xl);
          align-items: center;
          padding-top: var(--xl);
          padding-bottom: var(--xxl);
        }
        .hero-offset { margin-left: 120px; }
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

