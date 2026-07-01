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
  { id: 'geral', label: 'Sobre o FIA' },
  { id: 'pessoa-fisica', label: 'Pessoa física' },
  { id: 'empresas', label: 'Empresas' },
]

export const FAQ_PERGUNTAS: FaqPergunta[] = [
  {
    pergunta: 'Quem pode direcionar parte do Imposto de Renda?',
    categoria: 'geral',
    resposta: [
      { type: 'heading', text: 'Pessoas físicas' },
      {
        type: 'list',
        items: [
          ['Que façam declaração do Imposto de Renda por formulário completo.'],
          ['O cálculo é feito com base no valor do Imposto de Renda Devido, seja ele a pagar ou a restituir. No caso de IR a pagar, o valor doado será descontado da quantia ainda a ser paga, e no caso de IR a restituir, o valor será somado à restituição.'],
        ],
      },
      { type: 'heading', text: 'Pessoas jurídicas' },
      {
        type: 'list',
        items: [
          ['Tributadas por lucro real.'],
          ['Que estejam recolhendo imposto.'],
        ],
      },
    ],
  },
  {
    pergunta: 'Qual é o limite máximo possível de redirecionamento de meu IR sem que eu tenha custo?',
    categoria: 'pessoa-fisica',
    resposta: [
      { type: 'heading', text: 'Pessoas físicas' },
      {
        type: 'list',
        items: [
          ['Até 6% do Imposto de Renda Devido, seja a pagar ou a restituir, desde que realizado até o último dia fiscal do ano-base. No caso do ano de 2025, 26 de dezembro.'],
          ['Até 3% do Imposto de Renda Devido, seja a pagar ou a restituir, desde que ocorra no momento da declaração, dentro do software da Receita Federal, até o último dia do prazo de entrega.'],
        ],
      },
      { type: 'heading', text: 'Pessoas jurídicas' },
      {
        type: 'list',
        items: [
          ['1% do IR devido por meio da lei do Fundo para a Infância e Adolescência (FIA).'],
          ['4% do IR Devido por meio da Lei Federal de Incentivo à Cultura.'],
          ['1% para o Programa Nacional de Apoio à Atenção Oncológica (Pronon).'],
          ['1% para o Programa Nacional de Apoio à Atenção da Saúde da Pessoa com Deficiência (Pronas/PCD).'],
        ],
      },
      { type: 'p', content: ['Há outras leis que estabelecem mais doações possíveis, mas pelas quais o Pequeno Príncipe não tem projetos. São elas:'] },
      {
        type: 'list',
        items: [
          ['2% para a Lei de Incentivo ao Esporte;'],
          ['1% para a Lei do Idoso.'],
        ],
      },
    ],
  },
  {
    pergunta: 'O redirecionamento para o FIA conflita com as demais formas de investimentos via incentivos fiscais?',
    categoria: 'geral',
    resposta: [
      { type: 'heading', text: 'Pessoas físicas' },
      { type: 'p', content: ['Para pessoas físicas, quando a doação é realizada dentro do ano-base de referência, as leis não são conflitantes. O direcionamento máximo é de 6% do IR Devido, podendo ser dividido entre as seguintes Leis: FIA/FUMCAD, Rouanet, Esporte e Idoso. Para apoio via PRONON e PRONAS, é possível direcionar mais 1% para cada possibilidade, sem conflito.'] },
      { type: 'p', content: ['Quando a doação é realizada no momento da declaração, é possível direcionar até 3% do Imposto de Renda Devido apenas para a Lei FIA/FUMCAD.'] },
      { type: 'heading', text: 'Pessoas jurídicas' },
      { type: 'p', content: ['As leis de incentivos NÃO conflitam entre si e é possível redirecionar até o limite de 9% para projetos aprovados, conforme abaixo:'] },
      {
        type: 'list',
        items: [
          ['1% por meio da lei do Fundo para a Infância e Adolescência (FIA).'],
          ['4% por meio da Lei Rouanet de Incentivo à Cultura.'],
          ['1% por meio da Lei do Idoso.'],
          ['1% por meio da Lei de Incentivo ao Esporte.'],
          ['1% por meio do Programa Nacional de Apoio à Atenção Oncológica (PRONON).'],
          ['1% por meio do Programa Nacional de Apoio à Atenção da Saúde da Pessoa com Deficiência (PRONAS/PCD).'],
        ],
      },
      { type: 'p', content: ['Há outras leis que estabelecem mais doações possíveis, mas pelas quais o Pequeno Príncipe não tem projetos. São elas:'] },
      {
        type: 'list',
        items: [
          ['2% para a Lei de Incentivo ao Esporte;'],
          ['1% para a Lei do Idoso.'],
        ],
      },
      { type: 'p', content: ['Total: 10% do Imposto de Renda'] },
    ],
  },
  {
    pergunta: 'Como posso saber antecipadamente o valor do meu imposto de Renda Devido?',
    categoria: 'pessoa-fisica',
    resposta: [
      {
        type: 'p',
        content: [
          { link: { text: 'Clique aqui', href: 'https://www.gov.br/receitafederal/pt-br' } },
          ' e acesse o Simulador da Receita Federal.',
        ],
      },
    ],
  },
  {
    pergunta: 'Em que período devo redirecionar parte do meu Imposto de Renda e quando devo declarar minha doação?',
    categoria: 'geral',
    resposta: [
      { type: 'heading', text: 'Pessoas físicas' },
      { type: 'heading', text: 'Quando doar:' },
      { type: 'p', content: ['1 – Dentro do ano base de referência, o limite é de até 6% do IR Devido, por meio de um boleto. O prazo é o último dia fiscal do ano, 26 de dezembro.'] },
      { type: 'p', content: ['2 – No momento da declaração do Imposto de Renda, o limite é de até 3% do IR Devido, direto no software da Receita Federal. O prazo é até o último dia de entrega da declaração.'] },
      { type: 'heading', text: 'Quando declarar:' },
      { type: 'p', content: ['Até o último dia de entrega da declaração.'] },
      { type: 'heading', text: 'Pessoas jurídicas' },
      { type: 'heading', text: 'Redirecionamento:' },
      { type: 'list', items: [['Até o último dia fiscal do trimestre ou do ano, dependendo da forma de tributação junto à Receita Federal.']] },
      { type: 'heading', text: 'Quando declarar:' },
      { type: 'list', items: [['No processo normal de IRPJ da empresa.']] },
    ],
  },
  {
    pergunta: 'É preciso pagar alguma taxa para doar?',
    categoria: 'geral',
    resposta: [
      { type: 'p', content: ['Não. Não existe ônus, custo ou taxas para que os doadores façam seu apoio, por se tratar de um simples redirecionamento do Imposto de Renda.'] },
    ],
  },
  {
    pergunta: 'Esta dedução entra no limite de valor junto com outras deduções, como gastos com saúde, educação, dependentes, entre outros?',
    categoria: 'pessoa-fisica',
    resposta: [
      { type: 'p', content: ['Não. Tais deduções não entram no limite das demais que o contribuinte tem direito.'] },
    ],
  },
  {
    pergunta: 'Como posso declarar o redirecionamento ao FIA na Declaração de Ajuste Anual?',
    categoria: 'pessoa-fisica',
    resposta: [
      { type: 'heading', text: 'Pessoa Física' },
      {
        type: 'list',
        items: [
          ['Ao pagar o boleto de sua doação, o mesmo se torna seu comprovante de pagamento e serve como recibo.'],
          ['Sua doação deverá ser informada à Receita Federal em sua declaração de IR no ano seguinte.'],
          [
            'O redirecionamento deve ser lançado no tópico ',
            { bold: '"Doações Efetuadas"' },
            ', sob o código 40 ("Doações – Estatuto da Criança e do Adolescente"), no qual também deverão ser inseridos os dados que constam no boleto pago: ',
            { bold: 'Razão social do fundo, CNPJ do fundo e o valor doado.' },
          ],
        ],
      },
      { type: 'p', content: ['A Pessoa Jurídica, para fins de comprovação, deverá registrar em sua escrituração os valores redirecionados, bem como manter a documentação à disposição do Fisco.'] },
    ],
  },
  {
    pergunta: 'O que é o Fundo para a Infância e Adolescência (FIA)?',
    categoria: 'geral',
    resposta: [
      { type: 'p', content: ['O Fundo para a Infância e Adolescência (FIA), também conhecido em alguns municípios como FUMCAD, é um fundo público vinculado aos Conselhos dos Direitos da Criança e do Adolescente — municipal, estadual ou nacional. Ele reúne recursos destinados ao financiamento de políticas, programas e projetos que garantam e promovam os direitos de crianças e adolescentes, com prioridade para aqueles em situação de vulnerabilidade social.'] },
      { type: 'p', content: ['Pessoas físicas e jurídicas podem destinar parte do seu Imposto de Renda Devido a esse fundo, apoiando projetos aprovados pelos respectivos Conselhos sem custo adicional para o doador.'] },
    ],
  },
  {
    pergunta: 'De onde vêm as verbas dos fundos?',
    categoria: 'geral',
    resposta: [
      { type: 'p', content: ['As verbas que compõem os Fundos para a Infância e Adolescência são oriundas de multas, recursos dos tesouros federal, estadual e municipal, de doações, e, vale destacar, de parte do Imposto de Renda Devido pelas pessoas físicas e jurídicas.'] },
    ],
  },
  {
    pergunta: 'Existe mais de um Fundo para Infância e Adolescência?',
    categoria: 'geral',
    resposta: [
      { type: 'p', content: ['Cada conselho da criança e do adolescente – em sua esfera de atuação – deve possuir um fundo e ser o responsável pela sua gestão e transferência de recursos.'] },
    ],
  },
  {
    pergunta: 'Como podem ser usadas as doações feitas para o fundo?',
    categoria: 'geral',
    resposta: [
      { type: 'p', content: ['As doações feitas para o fundo são destinadas à implementação de programas e projetos que atendam diretamente às necessidades das crianças e dos adolescentes, especialmente daqueles que se encontram em situação de vulnerabilidade pessoal ou social. As ações desenvolvidas abrangem as áreas de assistência social, educação, acolhimento, medidas socioeducativas, saúde, cultura, lazer, transporte, formação profissional, proteção e defesa dos direitos, por exemplo.'] },
    ],
  },
  {
    pergunta: 'Posso escolher um projeto para doar parte do meu Imposto de Renda?',
    categoria: 'geral',
    resposta: [
      { type: 'p', content: ['Os projetos do Pequeno Príncipe para doação podem ser escolhidos por meio do Banco de Projetos, um mecanismo disponível em diversos estados e municípios e que permitem que pessoas físicas e jurídicas selecionem um projeto específico para apoiar. Nos conselhos municipal, de Curitiba, e estadual, do Paraná, por exemplo, existe o Banco de Projetos e o Pequeno Príncipe, por sua vez, possui projetos aprovados em ambos.'] },
    ],
  },
  {
    pergunta: 'Posso fiscalizar como está sendo a utilização da minha doação?',
    categoria: 'geral',
    resposta: [
      { type: 'p', content: ['Todos os anos, o Pequeno Príncipe prepara um material de prestação de contas e o disponibiliza para todos os investidores por meio do redirecionamento de IR, tanto para empresas quanto pessoas físicas. Nossa intenção é garantir transparência e permitir que todos os parceiros tenham informações sobre o uso dos recursos.'] },
      { type: 'p', content: ['De qualquer forma, no Conselho Estadual do Paraná e no de Curitiba, todo o repasse de recursos aos projetos aprovados ocorre na forma de convênios. E esses convênios são auditados por técnicos estaduais e municipais, além de serem fiscalizados pelo Tribunal de Contas do Estado.'] },
    ],
  },
  {
    pergunta: 'A pessoa física que utilizar o formulário simplificado em sua declaração poderá fazer uma doação e utilizá-la como renúncia fiscal?',
    categoria: 'pessoa-fisica',
    resposta: [
      { type: 'p', content: ['Não. Apenas pessoas físicas que optem por fazer a sua declaração por meio do formulário completo é que podem fazer o redirecionamento de parte do Imposto de Renda ao FIA/FUMCAD sem custo algum. Caso não preencha esse requisito, não terá dedutibilidade fiscal.'] },
    ],
  },
  {
    pergunta: 'E as empresas, como operacionalizam a sua doação através da renúncia fiscal?',
    categoria: 'empresas',
    resposta: [
      { type: 'p', content: ['Dependendo do incentivo fiscal utilizado pela empresa, a doação é efetivada de formas diferentes. Abaixo, detalhes do processo, dividido por leis de incentivo:'] },
      {
        type: 'list',
        ordered: true,
        items: [
          [{ bold: 'Infância e Adolescência (FIA – 1%):' }, ' por meio do pagamento de um boleto bancário. Esse boleto pode ser gerado diretamente no site dos conselhos municipais, estaduais, distritais ou nacionais, dependendo do Conselho no qual o projeto escolhido foi aprovado. Optando por projetos do Pequeno Príncipe, nós emitimos o boleto bancário junto ao site do Conselho, com valor e data de vencimento escolhidos pelo doador.'],
          [{ bold: 'Lei Rouanet (Incentivo à Cultura – 4%):' }, ' por meio de um depósito bancário na conta bloqueada do projeto, aprovado junto ao Ministério da Cultura. Optando por projetos do Pequeno Príncipe, nós encaminhamos a conta bancária do projeto escolhido pelo doador, juntamente com o Diário Oficial da União que atesta a aprovação do projeto.'],
          [{ bold: 'Pronon (Oncologia – 1%):' }, ' por meio de um depósito bancário na conta bloqueada do projeto, aprovado junto ao Ministério da Saúde. Optando por projetos do Pequeno Príncipe, nós encaminhamos a conta bancária do projeto escolhido pelo doador, juntamente com o Diário Oficial da União que atesta a aprovação do projeto.'],
          [{ bold: 'Pronas (Acessibilidade às deficiências – 1%):' }, ' por meio de um depósito bancário na conta bloqueada do projeto, aprovado junto ao Ministério da Saúde. Optando por projetos do Pequeno Príncipe, nós encaminhamos a conta bancária do projeto escolhido pelo doador, juntamente com o Diário Oficial da União que atesta a aprovação do projeto.'],
        ],
      },
      { type: 'p', content: [{ bold: 'Importante:' }, ' Pronon e Pronas, aprovados pela Lei Federal nº 12.715/2012 - Decreto nº 7.988/2013, são incentivos bastante recentes. De acordo com nosso histórico, a aprovação dos projetos, anualmente, ocorre no final do ano, entre novembro e dezembro. Por conta disso, existe certeza das contas bancárias e valores para aporte apenas neste período do ano.'] },
      {
        type: 'list',
        ordered: true,
        start: 5,
        items: [
          [{ bold: 'Lei de Apoio (Fundo Nacional do Idoso – 1%):' }, ' Por meio de um depósito bancário na conta bloqueada do projeto, aprovado junto ao Fundo Nacional do Idoso.'],
          [{ bold: 'Lei do Esporte (Incentivo ao Esporte – 2%):' }, ' Por meio de um depósito bancário na conta bloqueada do projeto, aprovado junto ao Ministério do Esporte.'],
        ],
      },
      { type: 'p', content: [{ bold: 'Importante:' }, ' o Pequeno Príncipe não desenvolve projetos por meio da Lei do Idoso e Lei do Esporte.'] },
      { type: 'p', content: ['O valor total dos redirecionamentos feitos por pessoas jurídicas poderá ser deduzido do Imposto de Renda mensal (estimado), trimestral ou anual. Esse valor é deduzido diretamente do IR Devido, observados os seguintes aspectos:'] },
      {
        type: 'list',
        ordered: true,
        items: [
          ['Essa dedução fica limitada, individualmente, ao percentual de cada incentivo, sobre o Imposto de Renda Devido, sem inclusão do adicional.'],
          ['O valor deduzido diretamente do IR não será dedutível como despesa operacional para fins de apuração do lucro real e da contribuição social sobre o lucro. Ou seja, o valor da doação lançado como despesa, em conta de resultado, deverá ser adicionado ao lucro líquido, na parte "A" do Livro de Apuração do Lucro Real (Lalur) e da base de cálculo da contribuição social. Para fins de comprovação, a pessoa jurídica deverá registrar em sua escrituração os valores doados, bem como manterá documentação à disposição do Fisco.'],
        ],
      },
    ],
  },
  {
    pergunta: 'As empresas podem deduzir esta doação também como despesa?',
    categoria: 'empresas',
    resposta: [
      { type: 'p', content: ['Não. A empresa não pode deduzir a doação como despesa operacional na apuração do lucro real. Ela deve direcioná-la ao lucro líquido tributável apurado no Livro de Apuração do Lucro Real (Lalur).'] },
    ],
  },
  {
    pergunta: 'Como calcular a dedução do Imposto de Renda da empresa?',
    categoria: 'empresas',
    resposta: [
      { type: 'p', content: ['A dedução deve ser calculada sobre o Imposto de Renda Devido do trimestre ou do ano – dependendo da forma de tributação da empresa –, excluídos os adicionais.'] },
      { type: 'p', content: ['Veja o exemplo da dedução de 1%:'] },
      {
        type: 'list',
        items: [
          ['Imposto de Renda devido (100%) = R$ 9.000,00'],
          ['Limite de dedução (1%) = R$ 90,00'],
        ],
      },
      { type: 'p', content: ['O redirecionamento deve ser feito dentro do próprio ano-calendário.'] },
    ],
  },
  {
    pergunta: 'Se houver excesso no valor doado em relação ao limite de dedução, pode ser compensado no ano seguinte?',
    categoria: 'empresas',
    resposta: [
      { type: 'p', content: ['Não. Somente podem ser deduzidos os valores doados no próprio ano.'] },
    ],
  },
  {
    pergunta: 'As microempresas e as empresas tributadas pelo lucro presumido ou arbitrado também podem efetuar a destinação, deduzindo-a do Imposto de Renda?',
    categoria: 'empresas',
    resposta: [
      { type: 'p', content: ['Não. As pessoas jurídicas que optarem pela tributação com base no lucro presumido não poderão deduzir o valor das doações aos fundos dos direitos da criança e do adolescente, conforme o artigo 10, da lei 9.532, de 11 de dezembro de 1997.'] },
    ],
  },
]
