// Fonte única do ecossistema Conecta DoaBem.
//
// Este arquivo é COPIADO para os outros sites da rede (DoaBem, GPT DoaBem,
// Base do Bem, Afiliado Social). Ao portar, a única linha que muda é
// SITE_ATUAL — o resto fica idêntico, para que os cinco sites mostrem
// exatamente a mesma lista.
//
// Os nomes e descrições vieram do documento "Pacto pela Destinação", escrito
// pelo cliente. O cliente AINDA NÃO confirmou os nomes oficiais dos canais:
// quando confirmar, a troca é aqui, nesta lista, e em nenhum outro lugar.
// Nenhum componente deve escrever nome, URL ou descrição de canal no código.

export const MARCA_MAE = 'Conecta DoaBem'

// Qual canal é este site. Muda ao portar o arquivo para os outros sites.
export const SITE_ATUAL = 'basedobem'

export interface Canal {
  id: string
  nome: string
  url: string
  descricao: string
}

export const canais: readonly Canal[] = [
  {
    id: '2doe4',
    nome: '2Doe4',
    url: 'https://2doe4.com.br',
    descricao: 'Voluntariado por causas. Escolha uma causa e doe seu tempo.',
  },
  {
    id: 'doabem',
    nome: 'DoaBem',
    url: 'https://doabem.com.br',
    descricao: 'Voluntariado, oficinas e apoio às Santas Casas.',
  },
  {
    id: 'gptdoabem',
    nome: 'GPT DoaBem',
    url: 'https://gptdoabem.com.br',
    descricao: 'Formação digital e presença solidária para ONGs e criadores.',
  },
  {
    id: 'basedobem',
    nome: 'Base do Bem',
    url: 'https://basedobem.com.br',
    descricao: 'Destinação de recursos e leis de incentivo.',
  },
  {
    id: 'afiliadosocial',
    nome: 'Afiliado Social',
    url: 'https://afiliadosocial.com.br',
    descricao: 'Consumo consciente: seu cupom vira recurso para causas.',
  },
]

// Confere o SITE_ATUAL na hora em que o arquivo e carregado. E aqui que o
// erro acontece: este arquivo vai ser copiado para os outros quatro sites, e
// o SITE_ATUAL e a unica linha que muda em cada copia. Um erro de digitacao
// nao quebra pagina nenhuma — o site so deixa de se marcar como "voce esta
// aqui" —, entao sem este aviso ele passaria despercebido.
if (!canais.some((canal) => canal.id === SITE_ATUAL)) {
  console.error(
    `SITE_ATUAL "${SITE_ATUAL}" não existe em canais.
` +
      `Valores válidos: ${canais.map((canal) => canal.id).join(', ')}`,
  )
}

// true no canal que corresponde a este site — ele é marcado como "você está
// aqui" e não vira link para si mesmo.
export const ehSiteAtual = (canal: Canal): boolean => canal.id === SITE_ATUAL
