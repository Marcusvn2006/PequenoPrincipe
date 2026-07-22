export type FaqCategoria = 'geral' | 'pessoa-fisica' | 'empresas'

export type FaqSpan =
  | string
  | { bold: string }
  | { link: { text: string; href: string } }

export type FaqBlock =
  | { type: 'heading'; text: string }
  | { type: 'p'; content: FaqSpan[] }
  | { type: 'list'; items: FaqSpan[][]; ordered?: boolean; start?: number }

export interface FaqPergunta {
  pergunta: string
  categoria: FaqCategoria
  resposta: FaqBlock[]
}

export const FAQ_CATEGORIAS: { id: FaqCategoria | 'todas'; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'geral', label: 'Sobre a BASEDOBEM e o CAC' },
  { id: 'pessoa-fisica', label: 'Pessoa física' },
  { id: 'empresas', label: 'Empresas e entidades' },
]

const answer = (text: string): FaqBlock[] => [{ type: 'p', content: [text] }]

export const FAQ_PERGUNTAS: FaqPergunta[] = [
  {
    pergunta: 'O que é a BASEDOBEM?',
    categoria: 'geral',
    resposta: answer('A BASEDOBEM é uma iniciativa que aproxima pessoas, empresas e entidades de projetos voltados à proteção de crianças, adolescentes e pessoas idosas. Seu objetivo é incentivar a destinação vinculada do Imposto de Renda e apoiar a organização, divulgação e acompanhamento das iniciativas.'),
  },
  {
    pergunta: 'Qual é a diferença entre destinação universal e vinculada?',
    categoria: 'geral',
    resposta: answer('Na destinação universal, o contribuinte escolhe o fundo, mas não identifica um projeto específico dentro da declaração. Na destinação vinculada, um projeto previamente aprovado e autorizado a captar pode ser indicado pelo apoiador, seguindo as regras do Conselho responsável.'),
  },
  {
    pergunta: 'O que significa CAC?',
    categoria: 'geral',
    resposta: answer('CAC é o Certificado de Autorização para Captação. Ele é emitido pelo Conselho de Direitos e autoriza uma organização a captar recursos para um projeto aprovado.'),
  },
  {
    pergunta: 'O CAC transfere o dinheiro diretamente para a entidade?',
    categoria: 'geral',
    resposta: answer('Não necessariamente. Os recursos seguem o fluxo do fundo e as regras estabelecidas pelo Conselho responsável. A vinculação, o repasse e a execução dependem da regulamentação local.'),
  },
  {
    pergunta: 'Posso escolher um projeto específico dentro da declaração?',
    categoria: 'pessoa-fisica',
    resposta: answer('No programa da Receita Federal, você escolhe o fundo. A vinculação a um projeto com CAC segue o procedimento estabelecido pelo Conselho e pelo município responsáveis.'),
  },
  {
    pergunta: 'A destinação aumenta o valor do meu imposto?',
    categoria: 'pessoa-fisica',
    resposta: answer('Não. Respeitados os limites legais, o valor é abatido do próprio Imposto de Renda devido.'),
  },
  {
    pergunta: 'Quanto uma pessoa física pode destinar na declaração?',
    categoria: 'pessoa-fisica',
    resposta: answer('Quem utiliza a tributação por deduções legais pode destinar até 3% para o Fundo da Criança e do Adolescente e até 3% para o Fundo da Pessoa Idosa.'),
  },
  {
    pergunta: 'Minha empresa também pode destinar?',
    categoria: 'empresas',
    resposta: answer('Empresas tributadas pelo lucro real podem destinar até 1% para cada um dos dois tipos de fundo, respeitando as regras aplicáveis.'),
  },
  {
    pergunta: 'Quem aprova e fiscaliza o projeto?',
    categoria: 'geral',
    resposta: answer('A análise, aprovação e fiscalização são realizadas pelo Conselho de Direitos e pelos órgãos competentes. A organização beneficiada é responsável pela execução e pela prestação de contas.'),
  },
  {
    pergunta: 'Qual é o papel dos voluntários e canais?',
    categoria: 'geral',
    resposta: answer('Eles ajudam na orientação, organização, divulgação, mobilização, conferência e acompanhamento das informações. Eles não substituem a responsabilidade legal da entidade executora ou do Conselho.'),
  },
  {
    pergunta: 'Minha organização pode apresentar um projeto?',
    categoria: 'empresas',
    resposta: answer('Sim. Entidades, universidades, fundações, instituições de saúde e grupos com atuação social podem apresentar suas iniciativas para uma análise inicial de aderência.'),
  },
  {
    pergunta: 'A apresentação garante a emissão do CAC?',
    categoria: 'empresas',
    resposta: answer('Não. A emissão do CAC depende da aprovação do projeto pelo Conselho responsável e do cumprimento de todos os requisitos estabelecidos no edital ou regulamentação local.'),
  },
  {
    pergunta: 'As regras são iguais em todos os municípios?',
    categoria: 'geral',
    resposta: answer('Não. Prazos, percentuais, documentos e procedimentos podem variar. Por isso, cada caso precisa ser analisado conforme o município e o Conselho responsáveis.'),
  },
]
