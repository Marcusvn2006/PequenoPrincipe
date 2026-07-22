import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
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

  useGSAP(
    () => {
      gsap.utils.toArray<Element>('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    },
    { scope: appRef }
  )

  return (
    <div ref={appRef}>
      <Navbar />
      <main>
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
      </main>
      <RodapeSection />
    </div>
  )
}
