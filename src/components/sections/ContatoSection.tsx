import type { ReactNode } from 'react'
import CrownBadge from '../CrownBadge'

export default function ContatoSection() {
  return (
    <section id="contato" style={{ background: 'var(--ceu)', padding: 'var(--xxl) 0 0', overflow: 'hidden' }}>
      <div className="container contato-grid">
        <div className="reveal" style={{ paddingBottom: 'var(--xxl)' }}>
          <h2 style={{ color: 'var(--azul)', fontSize: 'clamp(1.8rem, 2.5vw, 2.25rem)', marginBottom: 'var(--md)' }}>
            Ainda ficou com alguma dúvida?
          </h2>
          <p>
            Cada município pode possuir procedimentos próprios para aprovação de projetos, emissão
            de CAC e vinculação de recursos. Fale com nossa equipe para entender o caminho adequado
            para sua destinação, empresa ou organização.
          </p>

          <a
            href="https://wa.me/5514988388888"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              background: 'var(--verde)', color: '#fff',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              textDecoration: 'none', marginBottom: 'var(--lg)',
            }}
          >
            <WhatsIcon /> ENTRE EM CONTATO
          </a>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--md)' }}>
            <ContactLine href="mailto:contato@2doe4.com.br" icon={<EmailIcon />}>
              contato@2doe4.com.br
            </ContactLine>
            <ContactLine href="mailto:qg@2doe4.com.br" icon={<EmailIcon />}>
              qg@2doe4.com.br
            </ContactLine>
            <ContactLine href="tel:+551441033444" icon={<PhoneIcon />}>
              (14) 4103-3444
            </ContactLine>
          </div>
        </div>

        <div className="reveal contato-foto" style={{ position: 'relative' }}>
          <CrownBadge top={6} left={-16} />
          <img
            src="/assets/foto-contato.webp"
            alt="Pessoa demonstrando cuidado e acolhimento"
            style={{
              width: '100%', height: 380,
              borderRadius: '24px 24px 0 0',
              objectFit: 'contain', background: 'var(--ceu)', display: 'block',
            }}
          />
        </div>
      </div>

      <style>{`
        .contato-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: var(--xl);
          align-items: end;
        }
        @media (max-width: 1023px) {
          .contato-grid { grid-template-columns: 1fr; }
          .contato-foto { display: none; }
        }
      `}</style>
    </section>
  )
}

function ContactLine({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--md)',
        fontWeight: 800, color: 'var(--azul-profundo)', textDecoration: 'none',
      }}
    >
      <span style={{
        width: 40, height: 40, borderRadius: '50%', background: 'var(--branco)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--azul)', flexShrink: 0, boxShadow: '0 2px 8px rgba(2,78,134,0.1)',
      }}>
        {icon}
      </span>
      {children}
    </a>
  )
}

function WhatsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.9-1.4A10 10 0 1 0 12 2Zm5 13.6c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1a13 13 0 0 1-5.8-5.1c-.6-1-.9-2-.9-2.5 0-.6.3-1.4.8-1.7.3-.2.7-.2.9-.2h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.6c-.2.2-.3.4-.1.7.5.8 1.9 2.4 3.6 3.1.3.1.5.1.7-.1l.7-.9c.2-.3.4-.2.7-.1l1.9.9c.3.2.5.2.6.4 0 .1 0 .4-.3.7Z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8 10a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  )
}
