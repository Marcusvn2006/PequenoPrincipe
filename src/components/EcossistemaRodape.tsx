import { MARCA_MAE, canais, ehSiteAtual } from '../data/ecossistema'

export function SetaExterna() {
  return (
    <svg className="eco-seta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

// Bloco do rodapé: sempre visível, sem interação necessária. Mesma estrutura e
// mesmo texto nos cinco sites da rede — o que muda de site para site é só o
// SITE_ATUAL em src/data/ecossistema.ts.
//
// Sem .reveal e sem ScrollTrigger, de propósito: este site já teve texto
// invisível por animação que não disparou. Se o GSAP falhar, o bloco continua lá.
export default function EcossistemaRodape() {
  return (
    <section className="eco-rodape" aria-labelledby="ecossistema-titulo">
      <div className="container" style={{ paddingTop: 'var(--xl)', paddingBottom: 'var(--xl)' }}>
        <h2 id="ecossistema-titulo" className="eco-rodape-marca">{MARCA_MAE}</h2>
        <p className="eco-rodape-legenda">Cinco canais, uma rede. Conheça os outros.</p>

        <ul className="eco-grade">
          {canais.map((canal) => {
            // O canal deste site aparece na lista, mas não vira link para si
            // mesmo: fica marcado como posição atual.
            if (ehSiteAtual(canal)) {
              return (
                <li key={canal.id}>
                  <div aria-current="page" tabIndex={-1} className="eco-cartao eco-cartao--atual">
                    <span className="eco-cartao-nome">
                      <span className="eco-ponto eco-ponto--atual" aria-hidden="true" />
                      {canal.nome}
                    </span>
                    <span className="eco-selo">você está aqui</span>
                    <span className="eco-cartao-descricao">{canal.descricao}</span>
                  </div>
                </li>
              )
            }

            return (
              <li key={canal.id}>
                <a href={canal.url} target="_blank" rel="noopener noreferrer" className="eco-cartao">
                  <span className="eco-cartao-nome">
                    {canal.nome}
                    <SetaExterna />
                  </span>
                  <span className="eco-cartao-descricao">{canal.descricao}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
