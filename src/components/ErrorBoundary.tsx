import { Component, type ErrorInfo, type ReactNode } from 'react'
import { MARCA_MAE, canais, ehSiteAtual } from '../data/ecossistema'
import { contatos } from '../data/contato'

// Erro lançado por um componente durante a renderização (ou num efeito/ciclo
// de vida) desmonta a árvore inteira: sem isto o #root fica vazio e o visitante
// vê tela branca. É o caso da timeline GSAP do hero (HeroSection), que roda num
// useEffect sem proteção. Tem que ser classe — hooks não capturam esse erro.
//
// NÃO pega: erro em handler de evento (onClick etc.), em código assíncrono
// (setTimeout, promessa, fetch) nem fora da árvore React. Esses não desmontam
// a página; só não são tratados aqui.

interface Props {
  children: ReactNode
  fallback?: ReactNode
  // Avisa quem está fora do boundary (o App esconde as âncoras do menu e do
  // rodapé, que apontariam para seções que caíram).
  onErro?: (erro: Error) => void
}

interface State {
  erro: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { erro: null }

  static getDerivedStateFromError(erro: Error): State {
    return { erro }
  }

  componentDidCatch(erro: Error, info: ErrorInfo) {
    // O React já registra o erro; aqui vai a pilha de componentes, que no build
    // de produção é a única pista de qual bloco caiu.
    console.error('ErrorBoundary:', erro, info.componentStack)
    this.props.onErro?.(erro)
  }

  render() {
    if (this.state.erro) return this.props.fallback ?? <FalhaPagina />
    return this.props.children
  }
}

// O que o visitante vê no lugar do conteúdo que caiu: onde está, que esta parte
// falhou, como falar com a gente (o mesmo contato do rodapé) e para onde mais
// ir na rede.
export function FalhaPagina() {
  const outros = canais.filter((canal) => !ehSiteAtual(canal))

  return (
    <section className="falha" data-falha="">
      <div className="container">
        <div className="falha-caixa">
          <img src="/assets/logo-basedobem.webp" alt="BASEDOBEM" className="falha-logo" />
          <h1 className="falha-titulo">Esta parte do site não carregou.</h1>
          <p className="falha-texto">Foi uma falha nossa, não sua. Recarregar a página costuma resolver.</p>

          <button type="button" className="btn btn-secondary" onClick={() => window.location.reload()}>
            Recarregar a página
          </button>

          <div className="falha-bloco">
            <h2 className="falha-subtitulo">Fale com a gente</h2>
            <ul className="falha-contatos">
              {contatos.map(({ rotulo, href, externo }) => (
                <li key={href}>
                  <a href={href} {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{rotulo}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="falha-bloco">
            <h2 className="falha-subtitulo">Enquanto isso, conheça a rede {MARCA_MAE}</h2>
            <ul className="falha-rede">
              {outros.map((canal) => (
                <li key={canal.id}>
                  <a href={canal.url} target="_blank" rel="noopener noreferrer" className="falha-canal">
                    <span className="falha-canal-nome">{canal.nome}</span>
                    <span className="falha-canal-descricao">{canal.descricao}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Só tokens do site; mesmo cartão do formulário (raio lg, sombra azul).
          O .container fica no div interno: o `padding: 0 ...` dele é shorthand e
          zeraria o padding vertical desta seção. */}
      <style>{`
        .falha { background: var(--ceu); padding: var(--xxl) 0; }
        .falha-caixa {
          max-width: 760px; margin: 0 auto; background: var(--branco);
          border-radius: var(--raio-lg); box-shadow: 0 16px 44px rgba(2,78,134,.14);
          padding: var(--xl); display: flex; flex-direction: column; align-items: flex-start; gap: var(--md);
        }
        .falha-logo { height: 44px; width: auto; }
        .falha-titulo { color: var(--azul-profundo); font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800; }
        .falha-texto { margin: 0; color: var(--tinta); }
        .falha-bloco {
          width: 100%; display: flex; flex-direction: column; gap: var(--sm);
          padding-top: var(--md); border-top: 1px solid var(--borda-campo);
        }
        .falha-subtitulo { font-size: 1.1rem; color: var(--azul-profundo); }
        .falha-contatos { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: var(--sm) var(--lg); }
        .falha-contatos a { font-weight: 700; overflow-wrap: anywhere; }
        .falha-rede { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--sm); }
        .falha-canal {
          display: flex; flex-direction: column; gap: 4px; height: 100%; text-decoration: none;
          background: var(--ceu); border: 1px solid transparent; border-radius: var(--raio-md);
          padding: 14px var(--md); transition: border-color 150ms;
        }
        .falha-canal:hover { border-color: var(--azul); }
        .falha-canal-nome { font-weight: 800; color: var(--azul-profundo); }
        .falha-canal-descricao { font-size: 0.875rem; line-height: 1.4; color: var(--tinta); }
        @media (max-width: 639px) {
          .falha-caixa { padding: var(--lg); }
          .falha-rede { grid-template-columns: minmax(0, 1fr); }
        }
      `}</style>
    </section>
  )
}
