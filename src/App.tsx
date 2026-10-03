import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import ErrorBoundary from './components/ErrorBoundary'
import WaveDivider from './components/WaveDivider'
import HeroSection from './components/sections/HeroSection'
import FormularioSection from './components/sections/FormularioSection'
import ContatoSection from './components/sections/ContatoSection'
import FaqSection from './components/sections/FaqSection'
import RodapeSection from './components/sections/RodapeSection'
import {
  CacSection,
  CanaisSection,
  ComparativoSection,
  ComoDestinarSection,
  EmpresasSection,
  EntidadesSection,
  FundosSection,
  ImpactoSection,
  PapelSection,
  ProcessoSection,
  SustentabilidadeSection,
} from './components/sections/NovaCopySections'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const appRef = useRef<HTMLDivElement>(null)
  // O fallback no lugar das seções: menu e rodapé tiram as âncoras para elas.
  const [conteudoFalhou, setConteudoFalhou] = useState(false)

  // Reveal ao rolar. O conteúdo nasce visível: o CSS só esconde .reveal sob
  // html.reveal-ativo, e essa classe entra depois do último gatilho registrado. Se a
  // montagem lançar, o catch mostra tudo em vez de deixar o erro desmontar a página.
  // Com prefers-reduced-motion não há classe nem gatilho: nada roda à toa.
  useGSAP(
    (_, contextSafe) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const raiz = document.documentElement
      const pendentes = new Map<Element, gsap.core.Tween>()
      const revelar = (el: Element) => {
        const tween = pendentes.get(el)
        pendentes.delete(el)
        tween?.scrollTrigger?.kill()
        tween?.kill()
        gsap.set(el, { opacity: 1, y: 0 })
      }

      // Foco pelo teclado num bloco ainda escondido: mostra na hora, sem fade.
      const aoFocar = contextSafe!((e: FocusEvent) => {
        const bloco = (e.target as Element).closest?.('.reveal')
        if (bloco && pendentes.has(bloco)) revelar(bloco)
      })

      try {
        gsap.utils.toArray<Element>('.reveal').forEach((el) => {
          try {
            const tween = gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
              // Sem isto o ScrollTrigger renderiza o tween já na criação, antes de
              // reveal-ativo existir, e grava "visível" como ponto de partida: não anima.
              immediateRender: false,
              onComplete: () => { pendentes.delete(el) },
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            })
            pendentes.set(el, tween)
          } catch (erro) {
            console.error('[reveal] Falha ao registrar um bloco; ele foi exibido sem animação.', el, erro)
            revelar(el)
          }
        })
        raiz.classList.add('reveal-ativo')
        document.addEventListener('focusin', aoFocar)
      } catch (erro) {
        console.error('[reveal] Falha ao montar a animação de rolagem; todo o conteúdo foi exibido sem animação.', erro)
        pendentes.forEach((_, el) => revelar(el))
      }

      return () => {
        document.removeEventListener('focusin', aoFocar)
        raiz.classList.remove('reveal-ativo')
      }
    },
    { scope: appRef }
  )

  // Deep links (/#faq): o navegador resolve o hash com o #root ainda vazio e fica no
  // topo. Depois da montagem e das fontes (que mudam a altura da página), recalcula os
  // gatilhos do ScrollTrigger e salta até o alvo; o salto dispara o reveal das seções.
  //
  // O header é sticky (ocupa espaço no fluxo) e encolhe ao sair do topo, com transição
  // de 200ms: tudo abaixo sobe até 52px depois do salto. Por isso realinha quando ele
  // assenta, desde que o visitante não tenha rolado nesse meio-tempo.
  useEffect(() => {
    let cancelado = false
    let timer = 0
    const alvoDoHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      return id ? document.getElementById(id) : null
    }
    const realinharDepoisDoHeader = (alvo: HTMLElement) => {
      const y = window.scrollY
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        if (!cancelado && Math.abs(window.scrollY - y) < 2) {
          alvo.scrollIntoView({ behavior: 'instant', block: 'start' })
        }
      }, 250)
    }

    document.fonts.ready.then(() => requestAnimationFrame(() => {
      const alvo = alvoDoHash()
      if (cancelado || !alvo) return
      ScrollTrigger.refresh()
      alvo.scrollIntoView({ behavior: 'instant', block: 'start' })
      realinharDepoisDoHeader(alvo)
    }))

    // Com a página aberta (hash digitado na barra, voltar/avançar, links do menu): 'auto'
    // segue o scroll-behavior do CSS, que já respeita prefers-reduced-motion.
    const aoMudarHash = () => {
      const alvo = alvoDoHash()
      if (!alvo) return
      alvo.scrollIntoView({ behavior: 'auto', block: 'start' })
      if ('onscrollend' in window) {
        window.addEventListener('scrollend', () => realinharDepoisDoHeader(alvo), { once: true })
      }
    }
    window.addEventListener('hashchange', aoMudarHash)

    return () => {
      cancelado = true
      window.clearTimeout(timer)
      window.removeEventListener('hashchange', aoMudarHash)
    }
  }, [])

  return (
    <div ref={appRef}>
      <Navbar conteudoFalhou={conteudoFalhou} />
      <main>
        {/* Um bloco que quebra (a timeline GSAP do hero, por exemplo) não leva a
            página junto: menu e rodapé ficam, e o fallback dá saída ao visitante. */}
        <ErrorBoundary onErro={() => setConteudoFalhou(true)}>
        <HeroSection />

        <WaveDivider
          bgColor="transparent"
          fillColor="#E8F3FB"
          path="M0,32 C240,64 480,0 720,16 C960,40 1200,56 1440,24 L1440,60 L0,60 Z"
          overlapPrevious
        />

        <ComparativoSection />

        <WaveDivider
          bgColor="var(--ceu)"
          fillColor="#FFFFFF"
          path="M0,28 C260,60 520,4 760,20 C1000,36 1240,52 1440,20 L1440,60 L0,60 Z"
        />

        <CacSection />

        <WaveDivider
          bgColor="var(--branco)"
          fillColor="#FFD200"
          path="M0,36 C220,4 480,56 740,28 C1000,0 1240,44 1440,28 L1440,60 L0,60 Z"
        />

        <ProcessoSection />

        <WaveDivider
          bgColor="var(--amarelo)"
          fillColor="#E8F3FB"
          path="M0,30 C240,58 520,2 780,22 C1040,42 1260,50 1440,22 L1440,60 L0,60 Z"
        />

        <PapelSection />
        <FundosSection />
        <EmpresasSection />
        <EntidadesSection />
        <CanaisSection />
        <SustentabilidadeSection />
        <ImpactoSection />
        <ComoDestinarSection />

        <WaveDivider
          bgColor="var(--amarelo)"
          fillColor="#FFFFFF"
          path="M0,30 C240,58 520,2 780,22 C1040,42 1260,50 1440,22 L1440,60 L0,60 Z"
        />

        <FormularioSection />

        <WaveDivider
          bgColor="var(--branco)"
          fillColor="#E8F3FB"
          path="M0,34 C260,2 540,54 800,26 C1060,0 1280,46 1440,30 L1440,60 L0,60 Z"
        />

        <ContatoSection />

        <FaqSection />
        </ErrorBoundary>
      </main>
      <RodapeSection conteudoFalhou={conteudoFalhou} />
    </div>
  )
}
