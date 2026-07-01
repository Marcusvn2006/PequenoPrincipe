export default function HistoriaSection() {
  return (
    <section id="historia" style={{ background: 'var(--ceu)', padding: 'var(--xxl) 0' }}>
      <div className="container historia-grid">
        <div className="reveal">
          <span style={{
            display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.06em',
            fontWeight: 800, fontSize: '0.8125rem', color: 'var(--rosa)', marginBottom: 'var(--sm)',
          }}>
            Assista ao filme da campanha
          </span>
          <h2 style={{ color: 'var(--azul)', fontSize: 'clamp(1.8rem, 2.5vw, 2.25rem)', marginBottom: 'var(--md)' }}>
            Uma história que vai tocar o seu coração
          </h2>
          <p>
            Luna saiu do Ceará e percorreu mais de{' '}
            <span style={{ color: 'var(--rosa)', fontWeight: 800 }}>3.4 mil km</span>{' '}
            para fazer um transplante no Pequeno Príncipe, o maior hospital pediátrico do Brasil.
            E a medula pegou!
          </p>
          <p><strong>Aperte o play</strong> e veja essa história emocionante.</p>
          <svg width="180" height="40" viewBox="0 0 180 40" aria-hidden="true" style={{ marginTop: 'var(--lg)' }}>
            <path
              d="M5 32 C 50 8, 110 36, 160 14"
              fill="none"
              stroke="#0067B1"
              strokeWidth="2.5"
              strokeDasharray="2 7"
              strokeLinecap="round"
            />
            <path d="M158 8 L172 13 L160 21 L161 14 Z" fill="#E94E8A" />
          </svg>
        </div>

        <div
          className="reveal video-frame"
          style={{
            background: 'var(--branco)',
            borderRadius: 'var(--raio-lg)',
            padding: 12,
            boxShadow: '0 14px 36px rgba(2,78,134,0.16)',
            transform: 'rotate(1.5deg)',
            transition: 'transform 250ms',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'rotate(0deg)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'rotate(1.5deg)')}
        >
          <div style={{
            position: 'relative',
            borderRadius: 'var(--raio-md)',
            overflow: 'hidden',
            aspectRatio: '16 / 9',
            background: 'var(--azul-noite)',
          }}>
            <iframe
              src="https://www.youtube.com/embed/CMStUX0tRdA"
              title="Luna viajou 3461km para fazer um Transplante de Medula Óssea"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            />
          </div>
          <a
            href="https://www.youtube.com/watch?v=CMStUX0tRdA"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ marginTop: 'var(--md)', width: '100%' }}
          >
            Assista no YouTube
          </a>
        </div>
      </div>

      <style>{`
        .historia-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: var(--xl);
          align-items: center;
        }
        @media (max-width: 1023px) {
          .historia-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
