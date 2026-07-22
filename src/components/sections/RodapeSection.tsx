export default function RodapeSection() {
  return (
    <footer
      id="rodape"
      style={{ background: 'var(--azul-profundo)', color: '#fff' }}
    >
      <div style={{ height: 4, background: 'linear-gradient(90deg, var(--amarelo) 0%, var(--rosa) 50%, var(--azul) 100%)' }} />

      <div className="container rodape-grid" style={{ padding: 'var(--xxl) 0 var(--lg)' }}>
        <div>
          <div style={{ background: 'var(--branco)', borderRadius: 'var(--raio-md)', padding: '8px 16px', display: 'inline-block', marginBottom: 'var(--md)' }}>
            <img src="/assets/logo-hpp.webp" alt="Complexo Pequeno Príncipe" style={{ height: 36, width: 'auto' }} />
          </div>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 280, margin: 0 }}>
            A BASEDOBEM conecta contribuintes, empresas, entidades e canais para fortalecer projetos
            dedicados a crianças, adolescentes e pessoas idosas.
          </p>
        </div>

        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 'var(--md)', color: 'var(--amarelo)' }}>
            Links rápidos
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li><a href="#como-funciona" className="rodape-link">Como funciona</a></li>
            <li><a href="#cac" className="rodape-link">O que é CAC</a></li>
            <li><a href="#fundos" className="rodape-link">Fundos apoiados</a></li>
            <li><a href="#entidades" className="rodape-link">Apresente seu projeto</a></li>
            <li><a href="#empresas" className="rodape-link">Empresas</a></li>
            <li><a href="#canais" className="rodape-link">Nossos canais</a></li>
            <li><a href="#faq" className="rodape-link">Perguntas frequentes</a></li>
            <li><a href="#" className="rodape-link">Privacidade</a></li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 'var(--md)', color: 'var(--amarelo)' }}>
            Contato
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li><a href="mailto:contato@2doe4.com.br" className="rodape-link">contato@2doe4.com.br</a></li>
            <li><a href="mailto:qg@2doe4.com.br" className="rodape-link">qg@2doe4.com.br</a></li>
            <li><a href="tel:+551441033444" className="rodape-link">(14) 4103-3444</a></li>
            <li><a href="https://wa.me/5514988388888" target="_blank" rel="noopener noreferrer" className="rodape-link">WhatsApp: (14) 98838-8888</a></li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 'var(--md)', color: 'var(--amarelo)' }}>
            Participe
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', margin: '0 0 var(--md)' }}>
            Destinar já faz diferença. Saber qual projeto você ajuda pode aproximar ainda mais o impacto.
          </p>
          <a
            href="#formulario"
            className="btn btn-primary"
            style={{ fontSize: '0.875rem', minHeight: 40, padding: '10px 20px' }}
          >
            Quero destinar
          </a>
          <a
            href="#formulario"
            className="btn btn-secondary"
            style={{ fontSize: '0.875rem', minHeight: 40, padding: '10px 20px', marginTop: '10px' }}
          >
            Apresentar meu projeto
          </a>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <div className="container" style={{ padding: 'var(--md) 0', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
            BASEDOBEM — Transformando destinação em conexão, transparência e impacto.
          </p>
        </div>
      </div>

      <style>{`
        .rodape-link {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-weight: 600;
          transition: color 150ms;
        }
        .rodape-link:hover { color: var(--amarelo); }
        .rodape-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: var(--xl);
        }
        @media (max-width: 1023px) {
          .rodape-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 639px) {
          .rodape-grid { grid-template-columns: 1fr; text-align: center; }
          .rodape-grid > div { display: flex; flex-direction: column; align-items: center; }
        }
      `}</style>
    </footer>
  )
}
