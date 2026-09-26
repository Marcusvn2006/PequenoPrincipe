import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'

type FieldKey = 'nome' | 'email' | 'telefone' | 'cidade' | 'estado' |
  'interesse' | 'publico' | 'canal' | 'mensagem'

type Envio = 'ocioso' | 'enviando' | 'sucesso' | 'falha'

const ENDPOINT = 'https://script.google.com/macros/s/AKfycbylYmMcHRjmVvghZmxd1k-HEUL46YlYLW4d762wZ0ocm1uL2xpR4lD1IOIhoKQxqqwU9Q/exec'
const TIMEOUT_MS = 15000

// Contato alternativo mostrado na mensagem de falha do envio.
// Fica null de propósito: basedobem.com.br não tem registro MX e o site ainda
// não tem canal próprio. Preencha quando o cliente informar o contato oficial,
// ex: { rotulo: 'contato@basedobem.com.br', href: 'mailto:contato@basedobem.com.br' }
const CONTATO_FALLBACK: { rotulo: string; href: string } | null = null

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
  nome: '', email: '', telefone: '', cidade: '', estado: '',
  interesse: '', publico: '', canal: 'BASEDOBEM', mensagem: '',
}

const REQUIRED: FieldKey[] = ['nome', 'email', 'telefone', 'cidade', 'estado', 'interesse', 'publico', 'mensagem']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Telefone brasileiro com DDD: 10 dígitos (fixo) ou 11 (celular, começando em 9),
// aceitando o prefixo 55 opcional e qualquer pontuação.
function telefoneValido(valor: string) {
  let digitos = valor.replace(/\D/g, '')
  if (digitos.length > 11 && digitos.startsWith('55')) digitos = digitos.slice(2)
  if (!/^[1-9]{2}/.test(digitos)) return false
  return digitos.length === 10 || (digitos.length === 11 && digitos[2] === '9')
}

function validar(key: FieldKey, valor: string): string | undefined {
  if (REQUIRED.includes(key) && !valor.trim()) return 'Preencha este campo.'
  if (key === 'email' && !EMAIL_RE.test(valor.trim())) return 'Informe um e-mail válido, ex: nome@exemplo.com.'
  if (key === 'telefone' && !telefoneValido(valor)) return 'Informe o telefone com DDD, ex: (15) 99999-9999.'
  return undefined
}

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
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({})
  const [envio, setEnvio] = useState<Envio>('ocioso')
  const [falha, setFalha] = useState('')
  const hpRef = useRef<HTMLInputElement>(null)

  const change = (key: FieldKey) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = event.target.value
    setValues(current => ({ ...current, [key]: value }))
    if (errors[key] && !validar(key, value)) setErrors(current => ({ ...current, [key]: undefined }))
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (envio === 'enviando') return

    const nextErrors: Partial<Record<FieldKey, string>> = {}
    ;(Object.keys(values) as FieldKey[]).forEach(key => {
      const erro = validar(key, values[key])
      if (erro) nextErrors[key] = erro
    })
    setErrors(nextErrors)
    const primeiroErro = (Object.keys(INITIAL_VALUES) as FieldKey[]).find(key => nextErrors[key])
    if (primeiroErro) {
      document.getElementById(`f-${primeiroErro}`)?.focus()
      return
    }

    const payload = {
      tipo: 'contato',
      nome: values.nome.trim(),
      whatsapp: values.telefone.trim(),
      email: values.email.trim(),
      cidade: `${values.cidade.trim()}/${values.estado.trim().toUpperCase()}`,
      causa: values.canal,
      origem: 'basedobem/formulario',
      mensagem: [
        `Como deseja participar: ${values.interesse}`,
        `Fundo ou público de interesse: ${values.publico}`,
        '',
        values.mensagem.trim(),
      ].join('\n'),
      _hp: hpRef.current?.value ?? '',
    }

    setEnvio('enviando')
    setFalha('')
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)

    try {
      // text/plain evita o preflight CORS, que o Apps Script não responde.
      const resposta = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      const corpo = await resposta.json().catch(() => null) as { ok?: boolean; erro?: string } | null
      if (!resposta.ok || corpo?.ok !== true) throw new Error(corpo?.erro || `HTTP ${resposta.status}`)
      setValues(INITIAL_VALUES)
      setEnvio('sucesso')
    } catch (erro) {
      setFalha(controller.signal.aborted
        ? 'O envio demorou mais do que o esperado e não foi concluído.'
        : 'Não conseguimos enviar sua solicitação agora.')
      setEnvio('falha')
      console.error('Falha no envio do formulário:', erro)
    } finally {
      window.clearTimeout(timer)
    }
  }

  const input = (key: FieldKey, label: string, type = 'text', inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'], autoComplete?: string) => (
    <Field label={label} htmlFor={`f-${key}`} required error={errors[key]}>
      <input
        id={`f-${key}`}
        name={key}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={values[key]}
        onChange={change(key)}
        aria-invalid={errors[key] ? true : undefined}
        aria-describedby={errors[key] ? `f-${key}-erro` : undefined}
        style={fieldStyle(Boolean(errors[key]))}
      />
    </Field>
  )

  const enviando = envio === 'enviando'

  return (
    <section id="formulario" style={{ background: 'var(--branco)', padding: 'var(--xxl) 0' }}>
      <div className="container">
        <span className="section-eyebrow reveal">Formulário principal</span>
        <h2 className="section-title reveal">Como você quer fazer o bem?</h2>
        <p className="section-intro reveal">
          Preencha seus dados e selecione como deseja participar. Nossa equipe analisará sua
          solicitação e indicará o caminho adequado.
        </p>

        <form id="form-contato" className="reveal" onSubmit={submit} noValidate aria-busy={enviando}>
          <div className="form-grid">
            {input('nome', 'Nome completo', 'text', undefined, 'name')}
            {input('email', 'E-mail', 'email', 'email', 'email')}
            {input('telefone', 'Telefone', 'tel', 'tel', 'tel')}
            {input('cidade', 'Cidade', 'text', undefined, 'address-level2')}
            {input('estado', 'Estado', 'text', undefined, 'address-level1')}

            <Field label="Como deseja participar?" htmlFor="f-interesse" required error={errors.interesse}>
              <select
                id="f-interesse" value={values.interesse} onChange={change('interesse')}
                aria-invalid={errors.interesse ? true : undefined}
                aria-describedby={errors.interesse ? 'f-interesse-erro' : undefined}
                style={fieldStyle(Boolean(errors.interesse))}
              >
                <option value="">Selecione uma opção</option>
                {INTERESSES.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </Field>

            <Field label="Fundo ou público de interesse" htmlFor="f-publico" required error={errors.publico}>
              <select
                id="f-publico" value={values.publico} onChange={change('publico')}
                aria-invalid={errors.publico ? true : undefined}
                aria-describedby={errors.publico ? 'f-publico-erro' : undefined}
                style={fieldStyle(Boolean(errors.publico))}
              >
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
                  aria-invalid={errors.mensagem ? true : undefined}
                  aria-describedby={errors.mensagem ? 'f-mensagem-erro' : undefined}
                  style={{ ...fieldStyle(Boolean(errors.mensagem)), resize: 'vertical' }}
                />
              </Field>
            </div>
          </div>

          {/* Honeypot: escondido por CSS, não por type="hidden", para que robôs o preencham. */}
          <div className="form-hp" aria-hidden="true">
            <label htmlFor="f-hp">Não preencha este campo</label>
            <input id="f-hp" name="_hp" type="text" tabIndex={-1} autoComplete="off" ref={hpRef} />
          </div>

          <div className="form-submit-row">
            <p>
              Seus dados serão usados apenas para responder a esta solicitação e orientar você
              sobre a destinação.
            </p>
            <button type="submit" className="btn btn-primary" disabled={enviando}>
              {enviando ? 'Enviando…' : 'Enviar solicitação'}
            </button>
          </div>

          <div role="status" aria-live="polite">
            {enviando && <p className="form-progress">Enviando sua solicitação…</p>}
            {envio === 'sucesso' && (
              <div className="form-status">
                Recebemos sua solicitação. Nossa equipe vai entrar em contato pelos dados informados.
              </div>
            )}
          </div>

          {envio === 'falha' && (
            <div className="form-status form-status--falha" role="alert">
              {falha} Seus dados continuam preenchidos: tente enviar de novo em instantes.
              {CONTATO_FALLBACK && (
                <> Se preferir, fale conosco em <a href={CONTATO_FALLBACK.href}>{CONTATO_FALLBACK.rotulo}</a>.</>
              )}
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
        .field-error { color: var(--rosa-erro); font-size: .8125rem; font-weight: 700; margin: 0; }
        .form-message { grid-column: 1 / -1; }
        .form-hp { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
        .form-submit-row {
          display: flex; justify-content: space-between; align-items: center;
          gap: var(--lg); margin-top: var(--lg); flex-wrap: wrap;
        }
        .form-submit-row p { margin: 0; flex: 1 1 280px; }
        .form-submit-row .btn:disabled { opacity: .7; cursor: progress; transform: none; }
        .form-progress { margin: var(--lg) 0 0; font-weight: 700; color: var(--azul); }
        .form-status {
          margin-top: var(--lg); padding: var(--md); border-radius: var(--raio-md);
          background: #EAF7E6; color: #1F6E13; font-weight: 700;
        }
        .form-status--falha { background: #FDECEC; color: #9B1C1C; }
        @media (max-width: 767px) {
          #form-contato { padding: var(--lg); }
          .form-grid { grid-template-columns: 1fr; }
          .form-submit-row { align-items: stretch; flex-direction: column; }
          .form-submit-row p { flex: none; }
          .form-submit-row .btn { width: 100%; }
        }
        @media (max-width: 639px) { #form-contato { padding: var(--md); } }
      `}</style>
    </section>
  )
}

function Field({ label, htmlFor, required = false, error, children }: {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor}>
        {label}{required && <span style={{ color: 'var(--accent)' }}> *</span>}
      </label>
      {children}
      {error && <p className="field-error" id={`${htmlFor}-erro`}>{error}</p>}
    </div>
  )
}
