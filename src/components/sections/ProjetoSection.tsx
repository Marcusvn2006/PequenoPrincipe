import CrownBadge from '../CrownBadge'
import CouponChip from '../CouponChip'

const CAUSAS = [
  {
    nome: 'Saúde',
    texto: 'Campanhas preventivas, atendimentos comunitários e educação em saúde para quem mais precisa.',
    cor: 'var(--azul)',
    icon: <HeartPulseIcon />,
    cupom: 'CURADOABEM',
    instagram: 'curadoabem',
  },
  {
    nome: 'Equoterapia',
    texto: 'Reabilitação e desenvolvimento por meio da interação com cavalos – transformando vidas com propósito.',
    cor: 'var(--rosa)',
    icon: <HorseIcon />,
    cupom: 'POWERDOABEM',
    instagram: 'powerdoabem',
  },
  {
    nome: 'Esporte',
    texto: 'Inclusão social pelo esporte – formando atletas, criando oportunidades e transformando o futuro de jovens.',
    cor: 'var(--verde)',
    icon: <TrophyIcon />,
    cupom: 'ULTRADOABEM',
    instagram: 'ultradoabem',
  },
  {
    nome: 'Meio Ambiente',
    texto: 'Reflorestamento, educação ambiental e ações sustentáveis que conectam comunidade, natureza e agenda ESG.',
    cor: '#3D8B5C',
    icon: <LeafIcon />,
    cupom: 'VERDEDOABEM',
    instagram: 'verdedoabem',
  },
  {
    nome: 'Educação',
    texto: 'Oportunidades de aprendizado e desenvolvimento tecnológico como ferramentas de transformação social.',
    cor: 'var(--azul-profundo)',
    icon: <BookIcon />,
    cupom: 'BASEDOABEM',
    instagram: 'powerdoabem',
  },
]

export default function ProjetoSection() {
  return (
    <section id="causas" style={{ background: 'var(--branco)', padding: 'var(--xxl) 0' }}>
      <div className="container">
        <h2 className="reveal" style={{ color: 'var(--azul)', fontSize: 'clamp(1.8rem, 2.5vw, 2.25rem)', marginBottom: 'var(--xl)' }}>
          Conheça as Causas 2doe4
        </h2>
        <div className="projeto-grid">
          <div className="reveal" style={{ position: 'relative' }}>
            <CrownBadge />
            <img
              src="/assets/foto-projeto.webp"
              alt="Atendimento médico pediátrico em ambiente hospitalar moderno"
              style={{
                width: '100%', height: 340, borderRadius: 24,
                objectFit: 'contain', background: 'var(--ceu)',
                boxShadow: '0 12px 32px rgba(2,78,134,0.14)',
              }}
            />
          </div>

          <div className="reveal">
            <p>
              Sua destinação apoia o <strong>Hospital Pequeno Príncipe</strong> e fortalece o{' '}
              <strong>voluntariado de impacto</strong> por meio do Esporte, Educação e Tecnologia,
              conectando duplas de amigos a <strong>4h mensais de voluntariado</strong> com impacto
              mensurável. Conheça as frentes transformadoras:
            </p>
          </div>
        </div>

        <div className="reveal causas-grid">
          {CAUSAS.map((causa) => (
            <div
              key={causa.nome}
              className="causa-card"
              style={{
                background: 'var(--branco)', borderRadius: 'var(--raio-lg)',
                padding: 'var(--lg)', boxShadow: '0 6px 18px rgba(2,78,134,0.1)',
                border: '1.5px solid var(--ceu)',
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: '50%', background: causa.cor,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 'var(--md)',
              }}>
                {causa.icon}
              </div>
              <h3 style={{ color: 'var(--azul-profundo)', fontSize: '1.2rem', marginBottom: 'var(--sm)' }}>
                {causa.nome}
              </h3>
              <p style={{ margin: 0, fontSize: '0.9375rem', marginBottom: 'var(--md)' }}>{causa.texto}</p>
              <CouponChip codigo={causa.cupom} instagram={causa.instagram} compact />
            </div>
          ))}
        </div>

        <a
          className="btn btn-primary reveal"
          href="https://2doe4.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: 'var(--xl)', display: 'inline-flex' }}
        >
          Conheça os projetos em detalhes no site 2doe4
        </a>
      </div>

      <style>{`
        .projeto-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: var(--xl);
          align-items: center;
          margin-bottom: var(--xl);
        }
        .causas-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--lg);
        }
        .causa-card {
          transition: transform 200ms, box-shadow 200ms;
        }
        .causa-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(2,78,134,0.16);
        }
        @media (max-width: 1023px) {
          .projeto-grid { grid-template-columns: 1fr; }
          .causas-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 639px) {
          .causas-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

function HeartPulseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
      <path d="M3 12h4l2 4 3-7 2 3h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HorseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 21v-5l-2-2 1-5 4-3h3l4 3 2 1 2-1 1 2-3 2v8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="6" r="2" />
      <path d="M9 13v3M13 13v3" strokeLinecap="round" />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M8 4h8v4a4 4 0 0 1-8 0Z" strokeLinejoin="round" />
      <path d="M8 5H5a1 1 0 0 0-1 1v1a3 3 0 0 0 3 3M16 5h3a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12v4M9 20h6M10 16h4v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LeafIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 21c-1-6 1-12 7-15 5-2.5 9-1 9-1s.5 5-2 9c-3 5-9 7-14 7Z" strokeLinejoin="round" />
      <path d="M5 21c2-5 5-8 11-12" strokeLinecap="round" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 5c2-1 5-1 8 0v15c-3-1-6-1-8 0Z" strokeLinejoin="round" />
      <path d="M20 5c-2-1-5-1-8 0v15c3-1 6-1 8 0Z" strokeLinejoin="round" />
    </svg>
  )
}
