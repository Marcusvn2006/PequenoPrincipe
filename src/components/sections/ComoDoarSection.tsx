import type { ReactNode } from 'react'

function Chip({ children }: { children: ReactNode }) {
  return <span className="chip-termo">{children}</span>
}

function Sinal({ cor, children }: { cor: string; children: string }) {
  return (
    <span style={{
      width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem',
      color: '#fff', background: cor,
    }}>
      {children}
    </span>
  )
}

const PASSOS = [
  {
    num: 1,
    titulo: '1. Doação',
    corpo: (
      <>
        No programa da Receita Federal, após o preenchimento de toda a declaração, vá ao campo{' '}
        <Chip>Fichas da Declaração</Chip> e selecione a opção{' '}
        <Chip>Doações Diretamente na Declaração</Chip>. Na aba <Chip>Criança e Adolescente</Chip>{' '}
        clique em <Chip>Novo</Chip> e escolha a opção <Chip>Fundo Municipal</Chip>. UF:{' '}
        <Chip>PR - Paraná</Chip> | Município: <Chip>Curitiba</Chip>. No campo <Chip>Valor</Chip>{' '}
        digite o <Chip>Valor disponível para doação</Chip>, que é calculado pelo próprio programa
        e aparecerá no canto direito da tela.
      </>
    ),
  },
  {
    num: 2,
    titulo: '2. Impressão e pagamento',
    corpo: (
      <>
        Entre na opção <Chip>Imprimir</Chip>, selecione{' '}
        <Chip>DARF - Doações Diretamente na Declaração - ECA</Chip>. Efetue o pagamento do DARF
        de doação dentro do <strong>prazo da Receita</strong>.
      </>
    ),
  },
  {
    num: 3,
    titulo: '3. Envio de documentos',
    corpo: (
      <>
        Para que o Pequeno Príncipe receba a sua doação e a direcione para as iniciativas do{' '}
        <strong>ecossistema 2doe4</strong>, preencha seus dados abaixo e envie o DARF pago.
      </>
    ),
  },
]

export default function ComoDoarSection() {
  return (
    <section
      id="como-doar"
      className="crowns"
      style={{ background: 'var(--amarelo)', padding: 'var(--xxl) 0', position: 'relative' }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="reveal" style={{
          color: 'var(--azul-profundo)',
          fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
          maxWidth: 820,
          marginBottom: 'var(--lg)',
        }}>
          Confira o passo a passo para realizar a destinação do IR diretamente na declaração
        </h2>

        <div className="reveal" style={{ marginBottom: 'var(--xl)' }}>
          <p>
            Você pode <strong>doar até 3%</strong> do seu Imposto Devido, independentemente de ter{' '}
            <strong>IR a pagar</strong> ou <strong>IR a restituir</strong>.
          </p>
          <p>
            O <strong>único critério</strong> para a doação é que você utilize o{' '}
            <strong>formulário completo</strong> (deduções legais).
          </p>
        </div>

        <h3 className="reveal" style={{ fontSize: '1.5rem', color: 'var(--azul-profundo)', marginBottom: 'var(--lg)' }}>
          Como funciona:
        </h3>

        <div className="reveal funciona-cards">
          <div style={{ background: 'var(--ceu)', borderRadius: 'var(--raio-lg)', padding: 'var(--lg)' }}>
            <h3 style={{ color: 'var(--azul)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'var(--sm)' }}>
              <Sinal cor="var(--verde)">+</Sinal> IR a restituir
            </h3>
            <p style={{ margin: 0 }}>O <strong>valor doado</strong> será <strong>somado</strong> à sua <strong>restituição</strong>.</p>
          </div>
          <div style={{ background: 'var(--amarelo-claro)', borderRadius: 'var(--raio-lg)', padding: 'var(--lg)' }}>
            <h3 style={{ color: 'var(--azul)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'var(--sm)' }}>
              <Sinal cor="var(--azul)">−</Sinal> IR a pagar
            </h3>
            <p style={{ margin: 0 }}>O <strong>valor doado</strong> será <strong>subtraído</strong> da <strong>quantia a pagar</strong>.</p>
          </div>
        </div>

        <div style={{ position: 'relative', maxWidth: 880, marginTop: 'var(--xl)' }}>
          {PASSOS.map((passo, i) => (
            <div
              key={passo.num}
              className="reveal passo-item"
              style={{ paddingBottom: i < PASSOS.length - 1 ? 'var(--xl)' : 0 }}
            >
              {i < PASSOS.length - 1 && (
                <div style={{
                  position: 'absolute', left: 27, top: 56, bottom: -8,
                  borderLeft: '3px dotted var(--azul-profundo)', opacity: 0.45,
                }} />
              )}
              <div style={{
                width: 56, height: 56, borderRadius: '50%', background: 'var(--azul)',
                color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: '1.7rem', display: 'flex', alignItems: 'center',
                justifyContent: 'center', position: 'relative', zIndex: 1, flexShrink: 0,
              }}>
                {passo.num}
              </div>
              <div style={{
                background: 'var(--branco)', borderRadius: 'var(--raio-lg)',
                padding: 'var(--lg)', boxShadow: '0 6px 18px rgba(2,78,134,0.1)',
              }}>
                <h3 style={{ color: 'var(--azul)', fontSize: '1.5rem', marginBottom: 'var(--sm)' }}>
                  {passo.titulo}
                </h3>
                <p style={{ margin: 0 }}>{passo.corpo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .funciona-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--lg);
          margin-bottom: var(--xl);
          max-width: 880px;
        }
        .passo-item {
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: var(--lg);
          position: relative;
        }
        .passo-item > div:last-child {
          min-width: 0;
          overflow-wrap: break-word;
          word-break: break-word;
        }
        @media (max-width: 639px) {
          .funciona-cards { grid-template-columns: 1fr; }
          .passo-item {
            grid-template-columns: 44px 1fr;
            gap: var(--md);
          }
        }
      `}</style>
    </section>
  )
}
