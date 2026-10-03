// Contato oficial publicado no rodapé. O fallback do ErrorBoundary lê daqui
// também: com a página quebrada, é por aqui que o visitante ainda fala com a
// gente. Trocar um contato = trocar aqui (a faixa do topo da Navbar ainda tem
// os seus escritos à mão).

export interface Contato {
  rotulo: string
  href: string
  externo?: boolean
}

export const contatos: Contato[] = [
  { rotulo: 'contato@2doe4.com.br', href: 'mailto:contato@2doe4.com.br' },
  { rotulo: 'qg@2doe4.com.br', href: 'mailto:qg@2doe4.com.br' },
  { rotulo: '(14) 4103-3444', href: 'tel:+551441033444' },
  { rotulo: 'WhatsApp: (14) 98838-8888', href: 'https://wa.me/5514988388888', externo: true },
]
