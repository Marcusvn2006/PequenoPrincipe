import { useState, type ChangeEvent, type FormEvent } from 'react'

type FieldKey = 'nome' | 'documento' | 'email' | 'telefone' | 'cidade' | 'estado' |
  'interesse' | 'publico' | 'canal' | 'mensagem'

const INTERESSES = [
  'Quero destinar como pessoa física',
  'Quero destinar como empresa',
  'Quero conhecer um projeto com CAC',
  'Quero apresentar um projeto',
  'Quero ser uma empresa parceira',
  'Quero participar como voluntário',
  'Quero conhecer os canais',
  'Outro assunto',
]

const PUBLICOS = ['Crianças e adolescentes', 'Pessoas idosas', 'Os dois', 'Ainda não sei']
const CANAIS = ['BASEDOBEM', '2DOE4', 'DOABEM', 'GPTDOABEM', 'Equobiel', 'CuradoaBem', 'Educação']

const INITIAL_VALUES: Record<FieldKey, string> = {
  nome: '', documento: '', email: '', telefone: '', cidade: '', estado: '',
  interesse: '', publico: '', canal: 'BASEDOBEM', mensagem: '',
}

const REQUIRED: FieldKey[] = ['nome', 'documento', 'email', 'telefone', 'cidade', 'estado', 'interesse', 'publico', 'mensagem']

function fieldStyle(error: boolean): React.CSSProperties {
  return {
    width: '100%', minHeight: 52, borderRadius: 'var(--raio-md)',
    border: `1.5px solid ${error ? 'var(--accent)' : 'var(--borda-campo)'}`,
    padding: '12px var(--md)', fontFamily: 'var(--font-body)', fontSize: '1rem',
    color: 'var(--tinta)', background: 'var(--branco)', outline: 'none',
  }
}

export default function FormularioSection() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState<Partial<Record<FieldKey, boolean>>>({})
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const [mailReady, setMailReady] = useState(false)

  const change = (key: FieldKey) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = event.target.value
    setValues(current => ({ ...current, [key]: value }))
    if (value.trim()) setErrors(current => ({ ...current, [key]: false }))
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: Partial<Record<FieldKey, boolean>> = {}
    REQUIRED.forEach(key => { if (!values[key].trim()) nextErrors[key] = true })
    setErrors(nextErrors)
    setConsentError(!consent)
    if (Object.keys(nextErrors).length || !consent) return

    const subject = `Contato BASEDOBEM — ${values.interesse}`
    const body = [
      `Nome: ${values.nome}`,
      `CPF ou CNPJ: ${values.documento}`,
      `E-mail: ${values.email}`,
      `Telefone: ${values.telefone}`,
      `Cidade/Estado: ${values.cidade} / ${values.estado}`,
      `Interesse: ${values.interesse}`,
      `Público ou fundo de interesse: ${values.publico}`,
      `Canal de origem: ${values.canal}`,
      '',
      'Mensagem:',
      values.mensagem,
    ].join('\n')

    setMailReady(true)
    window.location.href = `mailto:contato@2doe4.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const input = (key: FieldKey, label: string, type = 'text', inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']) => (
    <Field label={label} htmlFor={`f-${key}`} required error={errors[key]}>
      <input
        id={`f-${key}`}
        type={type}
        inputMode={inputMode}
        value={values[key]}
        onChange={change(key)}
        style={fieldStyle(Boolean(errors[key]))}
      />
    </Field>
  )

  return (
    <section id="formulario" style={{ background: 'var(--branco)', padding: 'var(--xxl) 0' }}>
      <div className="container">
        <span className="section-eyebrow reveal">Formulário principal</span>
        <h2 className="section-title reveal">Como você quer fazer o bem?</h2>
        <p className="section-intro reveal">
          Preencha seus dados e selecione como deseja participar. Nossa equipe analisará sua
          solicitação e indicará o caminho adequado.
        </p>

        <form id="form-contato" className="reveal" onSubmit={submit} noValidate>
          <div className="form-grid">
            {input('nome', 'Nome completo')}
            {input('documento', 'CPF ou CNPJ', 'text', 'numeric')}
            {input('email', 'E-mail', 'email', 'email')}
            {input('telefone', 'Telefone', 'tel', 'tel')}
            {input('cidade', 'Cidade')}
            {input('estado', 'Estado')}

            <Field label="Como deseja participar?" htmlFor="f-interesse" required error={errors.interesse}>
              <select id="f-interesse" value={values.interesse} onChange={change('interesse')} style={fieldStyle(Boolean(errors.interesse))}>
                <option value="">Selecione uma opção</option>
                {INTERESSES.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </Field>

            <Field label="Fundo ou público de interesse" htmlFor="f-publico" required error={errors.publico}>
              <select id="f-publico" value={values.publico} onChange={change('publico')} style={fieldStyle(Boolean(errors.publico))}>
                <option value="">Selecione uma opção</option>
                {PUBLICOS.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </Field>

            <Field label="De qual canal você chegou?" htmlFor="f-canal">
              <select id="f-canal" value={values.canal} onChange={change('canal')} style={fieldStyle(false)}>
                {CANAIS.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </Field>

            <div className="form-message">
              <Field label="Mensagem" htmlFor="f-mensagem" required error={errors.mensagem}>
                <textarea
                  id="f-mensagem"
                  value={values.mensagem}
                  onChange={change('mensagem')}
                  placeholder="Conte brevemente como podemos ajudar."
                  rows={5}
                  style={{ ...fieldStyle(Boolean(errors.mensagem)), resize: 'vertical' }}
                />
              </Field>
            </div>
          </div>

          <label className="consent-row">
            <input
              type="checkbox"
              checked={consent}
              onChange={event => { setConsent(event.target.checked); if (event.target.checked) setConsentError(false) }}
            />
            <span>
              Autorizo o uso dos dados enviados para que a equipe da BASEDOBEM entre em contato e
              preste as orientações solicitadas, conforme a <a href="#">Política de Privacidade</a>.
            </span>
          </label>
          {consentError && <p className="field-error">É necessário autorizar o contato.</p>}

          <div className="form-submit-row">
            <p>
              A solicitação será preparada para envio a <strong>contato@2doe4.com.br</strong>.
            </p>
            <button type="submit" className="btn btn-primary">Enviar solicitação</button>
          </div>

          {mailReady && (
            <div className="form-status" role="status">
              Seu aplicativo de e-mail foi aberto com a solicitação preenchida. Revise a mensagem
              e confirme o envio para concluir o contato.
            </div>
          )}
        </form>
      </div>

      <style>{`
        #form-contato {
          background: var(--branco); border-radius: var(--raio-lg);
          box-shadow: 0 16px 44px rgba(2,78,134,.14); padding: var(--xl); max-width: 1040px;
        }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--lg); }
        .form-field { display: flex; flex-direction: column; gap: var(--sm); }
        .form-field label {
          font-size: .75rem; font-weight: 800; letter-spacing: .06em;
          text-transform: uppercase; color: var(--azul);
        }
        .field-error { color: var(--accent); font-size: .8125rem; font-weight: 700; margin: 0; }
        .form-message { grid-column: 2; grid-row: span 2; }
        .consent-row { display: flex; align-items: flex-start; gap: var(--md); margin-top: var(--lg); cursor: pointer; }
        .consent-row input { width: 24px; height: 24px; accent-color: var(--azul); flex: 0 0 auto; }
        .form-submit-row {
          display: flex; justify-content: space-between; align-items: center;
          gap: var(--lg); margin-top: var(--lg); flex-wrap: wrap;
        }
        .form-submit-row p { margin: 0; }
        .form-status {
          margin-top: var(--lg); padding: var(--md); border-radius: var(--raio-md);
          background: #EAF7E6; color: #1F6E13; font-weight: 700;
        }
        @media (max-width: 767px) {
          #form-contato { padding: var(--lg); }
          .form-grid { grid-template-columns: 1fr; }
          .form-message { grid-column: auto; grid-row: auto; }
          .form-submit-row { align-items: stretch; flex-direction: column; }
          .form-submit-row .btn { width: 100%; }
        }
        @media (max-width: 639px) { #form-contato { padding: var(--md); } }
      `}</style>
    </section>
  )
}

function Field({ label, htmlFor, required = false, error = false, children }: {
  label: string
  htmlFor: string
  required?: boolean
  error?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor}>
        {label}{required && <span style={{ color: 'var(--accent)' }}> *</span>}
      </label>
      {children}
      {error && <p className="field-error">Preencha este campo.</p>}
    </div>
  )
}
