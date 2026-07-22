import type { ReactNode } from 'react'

type Tone = 'white' | 'sky' | 'yellow'

const toneBackground: Record<Tone, string> = {
  white: 'var(--branco)',
  sky: 'var(--ceu)',
  yellow: 'var(--amarelo)',
}

function SectionShell({
  id,
  eyebrow,
  title,
  intro,
  tone = 'white',
  children,
}: {
  id?: string
  eyebrow: string
  title: string
  intro?: string
  tone?: Tone
  children: ReactNode
}) {
  return (
    <section id={id} style={{ background: toneBackground[tone], padding: 'var(--xxl) 0' }}>
      <div className="container">
        <span className="section-eyebrow reveal">{eyebrow}</span>
        <h2 className="section-title reveal">{title}</h2>
        {intro && <p className="section-intro reveal">{intro}</p>}
        {children}
      </div>
    </section>
  )
}

function Cta({ children, secondary = false, external = false, href = '#formulario' }: {
  children: ReactNode
  secondary?: boolean
  external?: boolean
  href?: string
}) {
  return (
    <a
      className={`btn ${secondary ? 'btn-secondary' : 'btn-primary'}`}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map(item => (
        <li key={item}>
          <span aria-hidden="true">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Note({ children }: { children: ReactNode }) {
  return <div className="info-note reveal">{children}</div>
}

export function ComparativoSection() {
  const universal = [
    'O contribuinte escolhe o fundo.',
    'O recurso é administrado pelo Conselho responsável.',
    'O Conselho define sua aplicação conforme as políticas e regras locais.',
    'O doador não identifica um projeto específico na declaração.',
    'O acompanhamento ocorre pela política pública e pelo fundo.',
  ]
  const vinculada = [
    'O projeto é previamente analisado pelo Conselho.',
    'A organização recebe autorização para captar.',
    'O apoiador consegue identificar o projeto.',
    'O recurso segue as regras do fundo e do município.',
    'A execução e a prestação de contas podem ser acompanhadas.',
  ]

  return (
    <SectionShell
      id="destinacao-vinculada"
      eyebrow="Destinar é importante. Saber para onde vai também."
      title="Do fundo ao projeto: entenda os dois caminhos de destinação."
      tone="sky"
      intro="Quando a destinação é realizada diretamente na Declaração do Imposto de Renda, o contribuinte escolhe um Fundo da Criança e do Adolescente ou um Fundo da Pessoa Idosa."
    >
      <p className="section-copy reveal">
        O recurso fortalece as políticas e os projetos financiados pelo fundo, mas o contribuinte
        não seleciona, dentro do programa da Receita Federal, qual projeto específico receberá sua
        contribuição. Em municípios que regulamentam a captação vinculada, o CAC permite que um
        projeto previamente analisado e aprovado pelo Conselho de Direitos capte recursos de
        pessoas físicas e empresas.
      </p>
      <div className="compare-grid reveal">
        <article className="content-card">
          <h3>Destinação ao fundo</h3>
          <BulletList items={universal} />
        </article>
        <article className="content-card content-card--accent">
          <h3>Destinação vinculada via CAC</h3>
          <BulletList items={vinculada} />
        </article>
      </div>
      <Note>
        <strong>Destinar ao fundo fortalece uma política pública.</strong> Vincular a destinação
        aproxima você de um projeto.
      </Note>
      <div className="section-actions reveal"><Cta secondary>Entender a destinação vinculada</Cta></div>
      <GlobalSectionStyles />
    </SectionShell>
  )
}

export function CacSection() {
  return (
    <SectionShell
      id="cac"
      eyebrow="O caminho para uma destinação mais identificável"
      title="CAC: a autorização que conecta sua destinação a um projeto aprovado."
      intro="O Certificado de Autorização para Captação, conhecido como CAC, é o documento emitido pelo Conselho de Direitos que permite a uma entidade captar recursos para um projeto previamente analisado e aprovado."
    >
      <div className="two-column reveal">
        <div className="section-copy">
          <p>
            Com o CAC, o projeto deixa de depender somente da distribuição geral dos recursos do
            fundo e passa a poder mobilizar pessoas e empresas interessadas em apoiar diretamente
            aquela iniciativa.
          </p>
          <p>
            O recurso continua seguindo o controle do fundo e as normas do Conselho responsável.
            A execução permanece sob responsabilidade da entidade beneficiada.
          </p>
        </div>
        <article className="content-card">
          <h3>O CAC ajuda a oferecer</h3>
          <BulletList items={[
            'Identificação do projeto apoiado',
            'Maior rastreabilidade dos recursos',
            'Metas e público beneficiado definidos',
            'Acompanhamento da execução',
            'Prestação de contas',
            'Maior proximidade entre projeto e apoiador',
          ]} />
        </article>
      </div>
      <Note>
        <strong>Observação importante:</strong> as regras de captação, os prazos, os documentos,
        os percentuais destinados ao fundo geral e os meios de pagamento podem variar conforme o
        município e o Conselho responsável. A emissão do CAC também não garante que o projeto
        captará todo o valor autorizado.
      </Note>
      <div className="section-actions reveal"><Cta>Quero saber como funciona na minha cidade</Cta></div>
    </SectionShell>
  )
}

const PROCESSO = [
  ['A entidade apresenta o projeto', 'A organização estrutura sua proposta, define o público atendido, os objetivos, o orçamento, as atividades e os indicadores de impacto.'],
  ['O Conselho realiza a análise', 'O projeto participa do processo estabelecido pelo Conselho Municipal ou Estadual responsável, que verifica sua regularidade, relevância e viabilidade.'],
  ['O projeto é aprovado', 'Após a análise técnica e a aprovação do Conselho, a entidade pode receber o Certificado de Autorização para Captação.'],
  ['Começa a mobilização de recursos', 'Com o CAC vigente, o projeto pode ser apresentado a pessoas físicas e empresas interessadas em realizar uma destinação vinculada.'],
  ['O recurso é recebido pelo fundo', 'A destinação segue o procedimento definido pelo Conselho e pelo município. O recurso é recebido pelo fundo e relacionado ao projeto conforme a regulamentação local.'],
  ['A entidade executa o projeto', 'Após o cumprimento das condições estabelecidas, a organização beneficiada executa as atividades aprovadas.'],
  ['Os resultados são acompanhados', 'A entidade apresenta as informações e prestações de contas exigidas, permitindo acompanhar a aplicação dos recursos e o impacto gerado.'],
]

export function ProcessoSection() {
  return (
    <SectionShell
      id="como-funciona"
      eyebrow="Da proposta ao impacto"
      title="Um processo construído para unir aprovação, captação e acompanhamento."
      tone="yellow"
    >
      <div className="timeline reveal">
        {PROCESSO.map(([title, text], index) => (
          <article className="timeline-item" key={title}>
            <span className="timeline-number">{index + 1}</span>
            <div className="content-card">
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="section-actions reveal">
        <Cta secondary>Quero destinar a um projeto</Cta>
        <Cta>Quero preparar meu projeto</Cta>
      </div>
    </SectionShell>
  )
}

export function PapelSection() {
  return (
    <SectionShell
      id="basedobem"
      eyebrow="Uma ponte entre quem quer ajudar e quem transforma"
      title="A BASEDOBEM aproxima projetos, contribuintes, empresas e Conselhos."
      tone="sky"
      intro="A BASEDOBEM é a marca principal de uma rede de canais dedicada a incentivar a cultura da destinação vinculada. Nosso papel é orientar, conectar e fortalecer organizações que desenvolvem projetos para crianças, adolescentes e pessoas idosas."
    >
      <div className="compare-grid reveal">
        <article className="content-card">
          <h3>Para as entidades</h3>
          <BulletList items={[
            'Orientação inicial sobre a destinação vinculada',
            'Apoio na organização e apresentação do projeto',
            'Conferência de informações e documentos',
            'Mobilização para captação de recursos',
            'Apoio à comunicação e à divulgação',
            'Acompanhamento das informações de execução',
          ]} />
        </article>
        <article className="content-card">
          <h3>Para pessoas e empresas</h3>
          <BulletList items={[
            'Explicação sobre as formas de destinação',
            'Apresentação de projetos e causas',
            'Orientação sobre o procedimento aplicável',
            'Aproximação com entidades beneficiadas',
            'Acesso às informações de acompanhamento',
          ]} />
        </article>
      </div>
      <Note>
        <strong>Responsabilidades bem definidas.</strong> A BASEDOBEM e seus canais apoiam a
        organização, a conferência, a mobilização e o acompanhamento. A responsabilidade legal
        pela execução do projeto e pela prestação de contas permanece com a entidade beneficiada.
        A aprovação, a gestão do fundo e a fiscalização seguem sob responsabilidade dos Conselhos
        e órgãos competentes.
      </Note>
      <p className="section-copy reveal" style={{ marginTop: 'var(--lg)', fontWeight: 800, color: 'var(--azul-profundo)' }}>
        Você escolhe gerar impacto. A BASEDOBEM ajuda a construir o caminho.
      </p>
    </SectionShell>
  )
}

export function FundosSection() {
  return (
    <SectionShell
      id="fundos"
      eyebrow="Duas fases da vida. Duas formas de proteger direitos."
      title="Conheça os fundos apoiados pela BASEDOBEM."
      intro="A destinação pode beneficiar projetos vinculados ao Fundo da Criança e do Adolescente, ao Fundo da Pessoa Idosa ou aos dois, respeitando os limites e procedimentos legais."
    >
      <div className="compare-grid reveal">
        <article id="fundo-crianca" className="content-card">
          <h3>Fundo da Criança e do Adolescente</h3>
          <p><strong>Proteção e oportunidades desde o começo da vida.</strong></p>
          <BulletList items={[
            'Acolhimento e proteção', 'Educação e desenvolvimento', 'Saúde e prevenção',
            'Cultura e esporte', 'Fortalecimento de vínculos', 'Combate à violência',
            'Inclusão de crianças e adolescentes em situação de vulnerabilidade',
          ]} />
          <Cta secondary>Apoiar projetos para crianças e adolescentes</Cta>
        </article>
        <article id="fundo-idosa" className="content-card content-card--accent">
          <h3>Fundo da Pessoa Idosa</h3>
          <p><strong>Cuidado, dignidade e participação em todas as fases da vida.</strong></p>
          <BulletList items={[
            'Promoção da saúde', 'Convivência e fortalecimento de vínculos',
            'Combate ao isolamento', 'Proteção contra violência e abandono',
            'Inclusão social e digital', 'Cultura, esporte e qualidade de vida',
            'Defesa dos direitos da pessoa idosa',
          ]} />
          <Cta>Apoiar projetos para pessoas idosas</Cta>
        </article>
      </div>

      <Note>
        Você pode escolher uma das frentes ou apoiar as duas, conforme seu perfil e os limites
        legais aplicáveis.
      </Note>

      <div className="percentage-panel reveal">
        <div>
          <span>ATÉ</span>
          <strong>3% + 3%</strong>
        </div>
        <div>
          <h3>Parte do seu Imposto de Renda pode proteger direitos e transformar projetos.</h3>
          <p>
            Pessoas físicas que utilizam a tributação por deduções legais podem destinar,
            diretamente na Declaração de Ajuste Anual, até 3% do imposto devido ao Fundo da
            Criança e do Adolescente e até 3% ao Fundo da Pessoa Idosa.
          </p>
          <p>
            Os valores são abatidos do próprio Imposto de Renda devido, portanto a destinação não
            aumenta o imposto calculado. O sistema da Receita Federal apresenta automaticamente os
            limites disponíveis.
          </p>
        </div>
      </div>
      <Note>
        <strong>Importante:</strong> na declaração, o contribuinte escolhe o fundo. Para vincular a
        contribuição a um projeto com CAC, é necessário seguir o procedimento estabelecido pelo
        Conselho responsável no município ou estado.
      </Note>
      <div className="section-actions reveal"><Cta>Receber orientação para destinar</Cta></div>
    </SectionShell>
  )
}

export function EmpresasSection() {
  return (
    <SectionShell
      id="empresas"
      eyebrow="Transforme imposto em investimento social"
      title="Sua empresa pode aproximar a estratégia ESG de um impacto real e identificável."
      tone="sky"
      intro="Empresas tributadas pelo lucro real podem destinar parte do Imposto de Renda devido aos Fundos da Criança e do Adolescente e da Pessoa Idosa. O limite de dedução é considerado separadamente para cada fundo: até 1% para cada um deles."
    >
      <p className="section-copy reveal">
        Por meio da destinação vinculada, quando prevista pelas regras locais, a empresa pode apoiar
        um projeto aprovado e acompanhar com maior proximidade:
      </p>
      <div className="compare-grid reveal">
        <article className="content-card">
          <h3>Acompanhe com maior proximidade</h3>
          <BulletList items={[
            'A causa atendida', 'O território beneficiado', 'As metas do projeto',
            'A execução das atividades', 'Os resultados alcançados',
            'As informações de prestação de contas',
          ]} />
        </article>
        <article className="content-card">
          <h3>Mais do que uma destinação</h3>
          <p>A empresa também pode envolver colaboradores, parceiros e clientes em ações de:</p>
          <BulletList items={[
            'Voluntariado', 'Divulgação', 'Mobilização', 'Conhecimento do projeto',
            'Fortalecimento da comunidade', 'Responsabilidade social',
          ]} />
        </article>
      </div>
      <div className="section-actions reveal">
        <Cta secondary>Quero destinar como empresa</Cta>
        <Cta>Conhecer possibilidades de parceria</Cta>
      </div>
    </SectionShell>
  )
}

export function EntidadesSection() {
  return (
    <SectionShell
      id="entidades"
      eyebrow="Seu projeto pode fazer parte desta base"
      title="Entidades, universidades, fundações e grupos sociais: apresentem seus projetos."
      intro="A BASEDOBEM está aberta para conhecer iniciativas que protejam direitos e gerem impacto para crianças, adolescentes e pessoas idosas."
    >
      <div className="two-column reveal">
        <article className="content-card">
          <h3>Podem apresentar propostas</h3>
          <BulletList items={[
            'Organizações da sociedade civil', 'Associações e entidades de classe',
            'Universidades e instituições de ensino', 'Fundações',
            'Hospitais e instituições de saúde', 'Grupos e organizações esportivas',
            'Iniciativas culturais e comunitárias',
          ]} />
        </article>
        <div className="mini-steps">
          {[
            ['Apresente sua organização', 'Conte quem vocês são, onde atuam e qual público é atendido.'],
            ['Descreva o projeto', 'Informe o problema, os objetivos, as atividades e o impacto esperado.'],
            ['Passe pela curadoria inicial', 'As informações serão conferidas para avaliar a aderência aos fundos e às regras aplicáveis.'],
            ['Receba orientação', 'Quando houver enquadramento, a organização será orientada sobre documentação, chamamentos e procedimentos para buscar a aprovação.'],
          ].map(([title, text], index) => (
            <article key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>
          ))}
        </div>
      </div>
      <p className="section-copy reveal">
        O projeto passará por uma análise inicial de aderência. Quando houver possibilidade de
        enquadramento, a equipe poderá orientar a organização sobre os próximos passos e sobre o
        processo conduzido pelo Conselho de Direitos responsável.
      </p>
      <Note>
        A análise da BASEDOBEM não substitui a avaliação oficial do Conselho de Direitos e não
        representa garantia de aprovação ou emissão do CAC.
      </Note>
      <div className="section-actions reveal"><Cta>Quero apresentar meu projeto</Cta></div>
    </SectionShell>
  )
}

const CANAIS = [
  ['BASEDOBEM', 'Marca principal desta rede e ponto de conexão entre projetos, contribuintes, empresas e Conselhos.'],
  ['2DOE4', 'Mobilização de voluntários, comunicação das causas, apoio na organização e acompanhamento das iniciativas.'],
  ['DOABEM', 'Canal de conexão entre pessoas, empresas, organizações e oportunidades de gerar impacto.'],
  ['GPTDOABEM', 'Canal de conhecimento e apoio digital para orientar organizações, voluntários e projetos na produção de conteúdo, divulgação e mobilização.'],
  ['Equobiel', 'Canal dedicado a projetos e ações relacionados à equoterapia, à inclusão e ao desenvolvimento.'],
  ['CuradoaBem', 'Canal voltado à saúde, ao cuidado e à mobilização de recursos para instituições e projetos da área.'],
  ['Frente de Educação', 'Ações ligadas à educação, formação e desenvolvimento, incluindo iniciativas relacionadas ao Monteiro Lobato e ao Colégio Politécnico de Sorocaba.'],
]

export function CanaisSection() {
  return (
    <SectionShell
      id="canais"
      eyebrow="Uma rede de conhecimento, mobilização e impacto"
      title="Canais diferentes unidos pelo mesmo propósito."
      tone="sky"
      intro="A BASEDOBEM é a marca principal. Seus canais ajudam a ampliar o alcance das causas, mobilizar pessoas, compartilhar conhecimento e criar novas possibilidades de sustentabilidade."
    >
      <div className="channel-grid reveal">
        {CANAIS.map(([name, text]) => (
          <article className="channel-card" key={name}>
            <span aria-hidden="true">{name.slice(0, 1)}</span>
            <h3>{name}</h3>
            <p>{text}</p>
            {name === '2DOE4' ? (
              <Cta href="https://2doe4.com.br/" external secondary>Conhecer o 2DOE4</Cta>
            ) : (
              <Cta>Entrar em contato</Cta>
            )}
          </article>
        ))}
      </div>
      <Note><strong>Cada canal amplia uma causa.</strong> Juntos, eles fortalecem a BASEDOBEM.</Note>
    </SectionShell>
  )
}

export function SustentabilidadeSection() {
  return (
    <SectionShell
      id="sustentabilidade"
      eyebrow="O impacto não precisa depender de uma única fonte"
      title="Causas sociais também precisam de visibilidade e sustentabilidade."
      intro="Além da destinação do Imposto de Renda, os canais da BASEDOBEM podem desenvolver ações de conteúdo e parcerias com a iniciativa privada, plataformas de e-commerce e produtos digitais."
    >
      <p className="section-copy reveal">
        A proposta é transformar comunicação, indicação responsável e presença digital em novas
        oportunidades de mobilização e geração de recursos para voluntários, canais e projetos.
      </p>
      <div className="compare-grid reveal">
        <article className="content-card">
          <h3>Como esse ciclo pode funcionar</h3>
          <BulletList items={[
            'Os canais divulgam causas e projetos',
            'O conteúdo amplia a visibilidade das organizações',
            'Produtos, serviços ou plataformas parceiras são apresentados',
            'Compras realizadas por links identificados podem gerar comissão',
            'Os recursos são divididos conforme as regras de cada parceria',
            'Parte dos valores pode fortalecer as causas apoiadas',
          ]} />
        </article>
        <article className="content-card content-card--accent">
          <h3>Toda ação deverá apresentar com clareza</h3>
          <BulletList items={[
            'Qual empresa participa', 'Como a comissão é gerada',
            'Como os valores são divididos', 'Qual causa ou estrutura será beneficiada',
            'Como os resultados serão apresentados',
          ]} />
        </article>
      </div>
      <div className="section-actions reveal"><Cta>Conhecer a frente de sustentabilidade</Cta></div>
    </SectionShell>
  )
}

export function ImpactoSection() {
  return (
    <SectionShell
      id="impacto"
      eyebrow="Por trás de cada projeto, existe uma história"
      title="Uma destinação pode ajudar uma iniciativa a continuar transformando vidas."
      tone="sky"
    >
      <div className="impact-panel reveal">
        <p>Projetos sociais não são apenas documentos, números e prestações de contas.</p>
        <p>
          São crianças encontrando novas oportunidades, adolescentes construindo outros caminhos e
          pessoas idosas recebendo cuidado, convivência e dignidade.
        </p>
        <p>
          A destinação vinculada aproxima você dessas histórias e permite compreender como sua
          decisão pode contribuir para resultados reais.
        </p>
        <Cta>Quero conhecer projetos</Cta>
      </div>
    </SectionShell>
  )
}

const DECLARACAO = [
  ['Utilize a tributação por deduções legais', 'A opção é conhecida popularmente como declaração completa.'],
  ['Acesse “Doações Diretamente na Declaração”', 'Escolha entre Criança e Adolescente ou Pessoa Idosa.'],
  ['Selecione o fundo', 'Escolha se deseja destinar para um fundo nacional, estadual ou municipal.'],
  ['Informe o valor', 'O próprio programa apresentará o limite disponível.'],
  ['Emita e pague o DARF', 'O DARF da destinação precisa ser pago dentro do prazo. O valor será considerado no cálculo final do Imposto de Renda.'],
]

const VINCULADA = [
  ['Conheça o projeto', 'Verifique sua causa, público, território, metas e situação do certificado.'],
  ['Confira as regras locais', 'O procedimento de vinculação depende do Conselho e do município responsáveis.'],
  ['Siga as orientações para destinar', 'A equipe informa os documentos, dados bancários, formulários ou demais procedimentos aplicáveis ao projeto.'],
  ['Guarde os comprovantes', 'Mantenha recibos, comprovantes e documentos necessários para sua declaração.'],
  ['Acompanhe o projeto', 'Receba informações sobre a execução, os resultados e a prestação de contas disponibilizada pela entidade.'],
]

function DestinationPath({ title, steps }: { title: string; steps: string[][] }) {
  return (
    <article className="content-card destination-path">
      <h3>{title}</h3>
      {steps.map(([step, text], index) => (
        <div key={step}>
          <span>{index + 1}</span>
          <p><strong>{step}</strong><br />{text}</p>
        </div>
      ))}
    </article>
  )
}

export function ComoDestinarSection() {
  return (
    <SectionShell
      id="como-destinar"
      eyebrow="Escolha o caminho certo para sua destinação"
      title="Fundo ou projeto: a BASEDOBEM ajuda você a entender como participar."
      tone="yellow"
    >
      <div className="compare-grid reveal">
        <DestinationPath title="Destinação diretamente na declaração" steps={DECLARACAO} />
        <DestinationPath title="Destinação vinculada a um projeto com CAC" steps={VINCULADA} />
      </div>
      <div className="section-actions reveal"><Cta secondary>Quero orientação para destinar</Cta></div>
    </SectionShell>
  )
}

function GlobalSectionStyles() {
  return (
    <style>{`
      .section-eyebrow {
        display: inline-block; text-transform: uppercase; letter-spacing: .07em;
        font-weight: 800; font-size: .8125rem; color: var(--rosa); margin-bottom: var(--sm);
      }
      .section-title {
        color: var(--azul); font-size: clamp(1.8rem, 2.7vw, 2.5rem);
        max-width: 920px; margin-bottom: var(--md);
      }
      .section-intro, .section-copy { max-width: 920px; font-size: 1.08rem; }
      .section-intro { margin-bottom: var(--xl); }
      .section-copy { margin-bottom: var(--lg); }
      .compare-grid, .two-column {
        display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--lg); align-items: start; margin-top: var(--lg);
      }
      .content-card, .channel-card {
        background: var(--branco); border: 1.5px solid rgba(0,103,177,.12);
        border-radius: var(--raio-lg); padding: var(--lg);
        box-shadow: 0 8px 24px rgba(2,78,134,.1);
      }
      .content-card--accent { border-top: 6px solid var(--rosa); }
      .content-card h3, .channel-card h3, .mini-steps h3 {
        color: var(--azul-profundo); font-size: 1.35rem; margin-bottom: var(--sm);
      }
      .content-card p:last-child, .channel-card p:last-child { margin-bottom: 0; }
      .check-list { list-style: none; padding: 0; margin: var(--md) 0 0; display: grid; gap: 10px; }
      .check-list li { display: flex; gap: 10px; align-items: flex-start; }
      .check-list li > span:first-child {
        width: 24px; height: 24px; border-radius: 50%; background: var(--amarelo);
        color: var(--azul-profundo); font-weight: 900; display: inline-flex;
        align-items: center; justify-content: center; flex: 0 0 auto; font-size: .8rem;
      }
      .info-note {
        max-width: 960px; background: var(--amarelo-claro); color: var(--azul-profundo);
        border-left: 5px solid var(--amarelo); border-radius: var(--raio-md);
        padding: var(--lg); margin-top: var(--lg);
      }
      .section-actions { display: flex; flex-wrap: wrap; gap: var(--md); margin-top: var(--lg); }
      .timeline { max-width: 960px; display: grid; gap: var(--md); }
      .timeline-item { display: grid; grid-template-columns: 56px 1fr; gap: var(--md); position: relative; }
      .timeline-item:not(:last-child)::before {
        content: ''; position: absolute; left: 27px; top: 54px; bottom: -18px;
        border-left: 3px dotted rgba(2,78,134,.45);
      }
      .timeline-number {
        width: 56px; height: 56px; border-radius: 50%; background: var(--azul); color: #fff;
        font-family: var(--font-display); font-weight: 800; font-size: 1.5rem;
        display: flex; align-items: center; justify-content: center; z-index: 1;
      }
      .percentage-panel {
        margin-top: var(--xl); padding: var(--xl); border-radius: var(--raio-lg);
        background: var(--azul-profundo); color: #fff; display: grid;
        grid-template-columns: .65fr 1.35fr; gap: var(--xl); align-items: center;
      }
      .percentage-panel > div:first-child { text-align: center; }
      .percentage-panel span { display: block; font-weight: 800; letter-spacing: .12em; }
      .percentage-panel strong { display: block; font-family: var(--font-display); font-size: clamp(3rem, 7vw, 6rem); color: var(--amarelo); line-height: 1; }
      .percentage-panel h3 { color: var(--amarelo); font-size: 1.55rem; }
      .mini-steps { display: grid; gap: var(--md); }
      .mini-steps article { display: grid; grid-template-columns: 42px 1fr; gap: var(--md); }
      .mini-steps article > span, .destination-path > div > span {
        width: 42px; height: 42px; border-radius: 50%; background: var(--azul);
        color: #fff; display: flex; align-items: center; justify-content: center;
        font-family: var(--font-display); font-weight: 800; flex: 0 0 auto;
      }
      .mini-steps p { margin: 0; }
      .channel-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--lg); }
      .channel-card { display: flex; flex-direction: column; align-items: flex-start; }
      .channel-card > span {
        width: 48px; height: 48px; border-radius: 50%; background: var(--azul);
        color: #fff; display: flex; align-items: center; justify-content: center;
        font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; margin-bottom: var(--md);
      }
      .channel-card p { flex: 1; }
      .channel-card .btn { margin-top: var(--md); font-size: .9rem; min-height: 42px; padding: 9px 18px; }
      .impact-panel {
        max-width: 900px; border-radius: var(--raio-lg); background: var(--branco);
        padding: var(--xl); box-shadow: 0 14px 36px rgba(2,78,134,.14);
        border-top: 6px solid var(--amarelo);
      }
      .impact-panel p { font-size: 1.12rem; }
      .destination-path > div { display: flex; gap: var(--md); margin-top: var(--md); }
      .destination-path > div > span { width: 34px; height: 34px; }
      .destination-path > div p { margin: 0; }
      @media (max-width: 1023px) {
        .channel-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      @media (max-width: 767px) {
        .compare-grid, .two-column, .percentage-panel, .channel-grid { grid-template-columns: 1fr; }
        .percentage-panel { padding: var(--lg); }
        .section-actions .btn { width: 100%; }
      }
      @media (max-width: 639px) {
        .timeline-item { grid-template-columns: 44px 1fr; }
        .timeline-number { width: 44px; height: 44px; font-size: 1.2rem; }
        .timeline-item:not(:last-child)::before { left: 21px; top: 42px; }
        .content-card, .channel-card, .impact-panel { padding: var(--md); }
      }
    `}</style>
  )
}
