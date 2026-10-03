// Contato oficial do site, num lugar só. Leem daqui: o rodapé, a faixa do topo
// da Navbar e o fallback do ErrorBoundary (com a página quebrada, é por aqui
// que o visitante ainda fala com a gente). Trocar um contato = trocar aqui.

export interface Contato {
  tipo: 'email' | 'telefone' | 'whatsapp'
  rotulo: string
  href: string
  externo?: boolean
}

export const contatos: Contato[] = [
  { tipo: 'email', rotulo: 'contato@2doe4.com.br', href: 'mailto:contato@2doe4.com.br' },
  { tipo: 'email', rotulo: 'qg@2doe4.com.br', href: 'mailto:qg@2doe4.com.br' },
  { tipo: 'telefone', rotulo: '(14) 4103-3444', href: 'tel:+551441033444' },
  { tipo: 'whatsapp', rotulo: 'WhatsApp: (14) 98838-8888', href: 'https://wa.me/5514988388888', externo: true },
]

// O primeiro de cada tipo: é o que aparece onde só cabe um (a faixa do topo).
export const contatoPrincipal = (tipo: Contato['tipo']) => contatos.find((c) => c.tipo === tipo)
