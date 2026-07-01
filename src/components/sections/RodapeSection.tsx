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
            Doe seu Imposto de Renda e ajude o maior hospital pediátrico do Brasil e os voluntários
            do movimento 2doe4 a continuarem transformando vidas.
          </p>
        </div>

        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 'var(--md)', color: 'var(--amarelo)' }}>
            Links rápidos
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li><a href="#contato" className="rodape-link">Contato</a></li>
            <li><a href="#como-doar" className="rodape-link">Como doar</a></li>
            <li><a href="#causas" className="rodape-link">Causas 2doe4</a></li>
            <li><a href="#faq" className="rodape-link">FAQ</a></li>
            <li><a href="#" className="rodape-link">Privacidade</a></li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 'var(--md)', color: 'var(--amarelo)' }}>
            Contato
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li><a href="mailto:doepequenoprincipe@hpp.org.br" className="rodape-link">doepequenoprincipe@hpp.org.br</a></li>
            <li><a href="tel:+554121083886" className="rodape-link">(41) 2108-3886</a></li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 'var(--md)', color: 'var(--amarelo)' }}>
            Saiba mais
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', margin: '0 0 var(--md)' }}>
            <a
              href="https://pequenoprincipe.org.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="rodape-link"
            >
              Site oficial do Hospital Pequeno Príncipe →
            </a>
          </p>
          <a
            href="https://2doe4.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: '0.875rem', minHeight: 40, padding: '10px 20px' }}
          >
            Seja um voluntário no Ecossistema 2doe4
          </a>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <div className="container" style={{ padding: 'var(--md) 0', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
            Copyright © 2026 Hospital Pequeno Príncipe. Todos os direitos reservados.
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
