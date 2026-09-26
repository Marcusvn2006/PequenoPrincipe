import { useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react'
import { MARCA_MAE, canais, ehSiteAtual, type Canal } from '../data/ecossistema'
import { SetaExterna } from './EcossistemaRodape'

// Rótulo do item na navbar. Não usa MARCA_MAE de propósito: o nome oficial da
// marca-mãe ainda está em aberto com o cliente, e a navbar é o ponto mais
// apertado do site. A marca aparece por extenso no topo do painel, na lista
// mobile e no bloco do rodapé.
const ROTULO_NAVBAR = 'Ecossistema'

// O canal deste site não vira link para si mesmo: vira uma marcação de posição
// atual, fora da ordem de tabulação (o Tab percorre só os quatro links).
function CanalItem({ canal, comDescricao }: { canal: Canal; comDescricao: boolean }) {
  if (ehSiteAtual(canal)) {
    return (
      <li>
        <div aria-current="page" tabIndex={-1} className="eco-item eco-item--atual">
          <span className="eco-ponto eco-ponto--atual" aria-hidden="true" />
          <div className="eco-item-texto">
            <p className="eco-item-nome">
              {canal.nome}
              <span className="eco-selo">você está aqui</span>
            </p>
            {comDescricao && <p className="eco-item-descricao">{canal.descricao}</p>}
          </div>
        </div>
      </li>
    )
  }

  return (
    <li>
      <a href={canal.url} target="_blank" rel="noopener noreferrer" className="eco-item">
        <span className="eco-ponto" aria-hidden="true" />
        <div className="eco-item-texto">
          <p className="eco-item-nome">
            {canal.nome}
            {comDescricao && <SetaExterna />}
          </p>
          {comDescricao && <p className="eco-item-descricao">{canal.descricao}</p>}
        </div>
        {!comDescricao && <SetaExterna />}
      </a>
    </li>
  )
}

// Item da navbar no desktop (> 1180px). Abre por clique, Enter ou Espaço (o
// <button> nativo cuida dos três); nunca por hover. Esc fecha e devolve o foco
// ao botão; clicar fora ou sair com Tab também fecha.
export default function EcossistemaMenu() {
  const [aberto, setAberto] = useState(false)
  const botaoRef = useRef<HTMLButtonElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const painelId = useId()

  useEffect(() => {
    if (!aberto) return
    const aoApontarFora = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setAberto(false)
    }
    document.addEventListener('pointerdown', aoApontarFora)
    return () => document.removeEventListener('pointerdown', aoApontarFora)
  }, [aberto])

  const aoTeclar = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && aberto) {
      e.stopPropagation()
      setAberto(false)
      botaoRef.current?.focus()
    }
  }

  const aoPerderFoco = (e: FocusEvent<HTMLDivElement>) => {
    if (aberto && !wrapRef.current?.contains(e.relatedTarget as Node | null)) setAberto(false)
  }

  return (
    <div className="eco-menu" ref={wrapRef} onKeyDown={aoTeclar} onBlur={aoPerderFoco}>
      <button
        ref={botaoRef}
        type="button"
        className="eco-gatilho"
        aria-expanded={aberto}
        aria-controls={painelId}
        onClick={() => setAberto((v) => !v)}
      >
        {ROTULO_NAVBAR}
        <svg className="eco-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div id={painelId} className="eco-painel" hidden={!aberto}>
        <div className="eco-painel-topo">
          <p className="eco-painel-marca">{MARCA_MAE}</p>
          <p className="eco-painel-legenda">Os canais da rede</p>
        </div>
        <ul className="eco-lista">
          {canais.map((canal) => <CanalItem key={canal.id} canal={canal} comDescricao />)}
        </ul>
      </div>
    </div>
  )
}

// Lista no menu hambúrguer (<= 1180px). Já vem aberta, igual aos outros links
// do menu. O clique num canal fecha o hambúrguer pelo handler do <nav>.
export function EcossistemaMenuMobile() {
  return (
    <div className="eco-mobile">
      <p className="eco-mobile-titulo">{MARCA_MAE}</p>
      <ul className="eco-lista">
        {canais.map((canal) => <CanalItem key={canal.id} canal={canal} comDescricao={false} />)}
      </ul>
    </div>
  )
}
