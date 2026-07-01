import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import CouponsMenu from './CouponsMenu'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
    }
  }, [])

  return (
    <>
      <style>{`
        .navbar-top {
          background: var(--azul-profundo);
          color: #fff;
          font-size: 0.8125rem;
          font-weight: 700;
          overflow: hidden;
          transition: max-height 200ms, padding 200ms, opacity 200ms;
        }
        .navbar-top .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--md);
          padding-top: 8px;
          padding-bottom: 8px;
        }
        .navbar-top a {
          color: #fff;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          opacity: 0.92;
          transition: opacity 150ms;
        }
        .navbar-top a:hover { opacity: 1; text-decoration: underline; }
        .navbar-top-linhas { display: flex; align-items: center; gap: var(--lg); }
        .navbar-top-social { display: flex; align-items: center; gap: 10px; }
        .navbar-top-social a {
          width: 26px; height: 26px; border-radius: 50%;
          background: rgba(255,255,255,0.14);
          justify-content: center;
        }
        .navbar-top-social a:hover { background: var(--verde); }

        .navbar-main {
          background: var(--branco);
          position: relative;
        }
        .navbar-main .container {
          display: flex;
          align-items: center;
          gap: var(--lg);
          position: relative;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: auto;
        }
        .navbar-links a:not(.nav-cta) {
          font-weight: 700;
          text-decoration: none;
          color: var(--azul-profundo);
          padding: 10px 14px;
          border-radius: var(--raio-pill);
          transition: background 150ms, color 150ms;
        }
        .navbar-links a:not(.nav-cta):hover { background: var(--ceu); color: var(--azul); }
        .nav-cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--amarelo) !important;
          color: var(--azul-profundo) !important;
          padding: 11px 20px !important;
          border-radius: var(--raio-pill) !important;
          font-weight: 800 !important;
          text-decoration: none;
          margin-left: 6px;
          box-shadow: 0 4px 14px rgba(255, 210, 0, 0.45);
          transition: transform 150ms, box-shadow 150ms, background 150ms;
        }
        .nav-cta:hover { background: #F0C600 !important; transform: translateY(-2px); box-shadow: 0 8px 18px rgba(255, 210, 0, 0.55); }

        .nav-burger { display: none; }
        @media (max-width: 639px) {
          .navbar-top { display: none; }
          .nav-burger { display: flex !important; }
          .navbar-links {
            display: none;
            position: absolute;
            top: 100%; right: 0; left: 0;
            background: var(--branco);
            flex-direction: column;
            align-items: stretch !important;
            padding: var(--lg);
            gap: var(--sm) !important;
            box-shadow: 0 16px 32px rgba(2,78,134,0.15);
            z-index: 100;
          }
          .navbar-links.aberto { display: flex; }
          .navbar-links a:not(.nav-cta) { padding: 14px var(--md); }
          .nav-cta { margin-left: 0; justify-content: center; }
        }
      `}</style>
      <header
        ref={navRef}
        style={{
          position: 'sticky', top: 0, zIndex: 50,
          boxShadow: scrolled ? '0 4px 24px rgba(2,78,134,0.16)' : 'none',
          transition: 'box-shadow 200ms',
        }}
      >
        <div
          className="navbar-top"
          style={{
            maxHeight: scrolled ? 0 : 40,
            opacity: scrolled ? 0 : 1,
            paddingTop: scrolled ? 0 : undefined,
            paddingBottom: scrolled ? 0 : undefined,
          }}
        >
          <div className="container">
            <div className="navbar-top-linhas">
              <a href="mailto:doepequenoprincipe@hpp.org.br">
                <EmailIcon /> doepequenoprincipe@hpp.org.br
              </a>
              <a href="tel:+554121083886">
                <PhoneIcon /> (41) 2108-3886
              </a>
            </div>
            <div className="navbar-top-social">
              <a href="https://wa.me/554121083886" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <WhatsIcon size={14} color="#fff" />
              </a>
            </div>
          </div>
        </div>

        <div className="navbar-main" style={{ padding: scrolled ? '10px 0' : '16px 0' }}>
          <div className="container">
            <a href="#inicio" aria-label="Pequeno Príncipe — início" style={{ display: 'flex', flexShrink: 0 }}>
              <img src="/assets/logo-hpp.webp" alt="Complexo Pequeno Príncipe" style={{ height: 44, width: 'auto' }} />
            </a>

            <div style={{ marginLeft: 'auto' }}>
              <CouponsMenu />
            </div>

            <button
              className="nav-burger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              style={{
                width: 44, height: 44,
                border: 'none', background: 'none', cursor: 'pointer',
                padding: 10, flexDirection: 'column', justifyContent: 'center', gap: 5,
              }}
            >
              <span style={{ display: 'block', height: 3, background: 'var(--azul)', borderRadius: 2 }} />
              <span style={{ display: 'block', height: 3, background: 'var(--azul)', borderRadius: 2 }} />
              <span style={{ display: 'block', height: 3, background: 'var(--azul)', borderRadius: 2 }} />
            </button>

            <nav
              className={`navbar-links${menuOpen ? ' aberto' : ''}`}
              aria-label="Navegação principal"
              onClick={(e) => { if ((e.target as HTMLElement).closest('a')) setMenuOpen(false) }}
            >
              <a href="#como-doar">Como doar</a>
              <a href="#causas">Causas 2doe4</a>
              <a href="#faq">FAQ</a>
              <a href="#">Privacidade</a>
              <a className="nav-cta" href="#enviar-darf">
                <CrownIcon /> Enviar DARF
              </a>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

function WhatsIcon({ size = 18, color = '#3DAE2B' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} aria-hidden="true" style={{ width: size, height: size, flexShrink: 0 }}>
      <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.9-1.4A10 10 0 1 0 12 2Zm5 13.6c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1a13 13 0 0 1-5.8-5.1c-.6-1-.9-2-.9-2.5 0-.6.3-1.4.8-1.7.3-.2.7-.2.9-.2h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.6c-.2.2-.3.4-.1.7.5.8 1.9 2.4 3.6 3.1.3.1.5.1.7-.1l.7-.9c.2-.3.4-.2.7-.1l1.9.9c.3.2.5.2.6.4 0 .1 0 .4-.3.7Z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8 10a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  )
}

function CrownIcon() {
  return (
    <svg viewBox="0 0 24 20" aria-hidden="true" style={{ width: 16, height: 14, flexShrink: 0 }}>
      <path
        d="M2 17 L4 6 L8.5 10.5 L12 3 L15.5 10.5 L20 6 L22 17 Z"
        fill="var(--azul-profundo)"
        stroke="var(--azul-profundo)"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
