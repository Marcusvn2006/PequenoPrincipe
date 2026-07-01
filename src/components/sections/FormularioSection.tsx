import { useState, type FormEvent, type ChangeEvent } from 'react'
import UploadZone from '../UploadZone'

type FieldKey =
  | 'nome' | 'cpf' | 'email' | 'telefone'
  | 'rua' | 'cep' | 'numero' | 'bairro'
  | 'complemento' | 'cidade' | 'estado' | 'como'

const CAMPOS_OBRIGATORIOS: FieldKey[] = [
  'nome', 'cpf', 'email', 'telefone',
  'rua', 'cep', 'numero', 'bairro',
  'cidade', 'estado', 'como',
]

const CAMPOS: { key: FieldKey; label: string; type?: string; placeholder: string; inputMode?: string; span?: boolean; obrigatorio?: boolean }[] = [
  { key: 'nome', label: 'NOME COMPLETO', type: 'text', placeholder: 'Nome completo', obrigatorio: true },
  { key: 'cpf', label: 'CPF', type: 'text', placeholder: 'CPF', inputMode: 'numeric', obrigatorio: true },
  { key: 'email', label: 'E-MAIL', type: 'email', placeholder: 'E-mail', obrigatorio: true },
  { key: 'telefone', label: 'TELEFONE', type: 'tel', placeholder: 'Telefone', obrigatorio: true },
  { key: 'rua', label: 'RUA', type: 'text', placeholder: 'Rua', obrigatorio: true },
  { key: 'cep', label: 'CEP', type: 'text', placeholder: 'CEP', inputMode: 'numeric', obrigatorio: true },
  { key: 'numero', label: 'NÚMERO', type: 'text', placeholder: 'Número', inputMode: 'numeric', obrigatorio: true },
  { key: 'bairro', label: 'BAIRRO', type: 'text', placeholder: 'Bairro', obrigatorio: true },
  { key: 'complemento', label: 'COMPLEMENTO', type: 'text', placeholder: 'Complemento', obrigatorio: false },
  { key: 'cidade', label: 'CIDADE', type: 'text', placeholder: 'Cidade', obrigatorio: true },
  { key: 'estado', label: 'ESTADO', type: 'text', placeholder: 'Estado', obrigatorio: true },
]

const COMO_SOUBE = [
  'Redes sociais', 'Indicação de amigo', 'E-mail marketing',
  'Televisão', 'Rádio', 'Jornal / Revista', 'Site do hospital', 'Outro',
]

const INITIAL_VALUES = Object.fromEntries(
  [...CAMPOS.map(c => c.key), 'como'].map(k => [k, ''])
) as Record<FieldKey, string>

const INITIAL_ERRORS = Object.fromEntries(
  [...CAMPOS.map(c => c.key), 'como'].map(k => [k, false])
) as Record<FieldKey, boolean>

function inputStyle(err: boolean): React.CSSProperties {
  return {
    height: 52,
    border: `1.5px solid ${err ? 'var(--accent)' : 'var(--borda-campo)'}`,
    borderRadius: 'var(--raio-md)',
    padding: '0 var(--md)',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    color: 'var(--tinta)',
    background: 'var(--branco)',
    width: '100%',
    outline: 'none',
    transition: 'border-color 150ms, box-shadow 150ms',
  }
}

export default function FormularioSection() {
  const [values, setValues] = useState<Record<FieldKey, string>>(INITIAL_VALUES)
  const [errors, setErrors] = useState<Record<FieldKey, boolean>>(INITIAL_ERRORS)
  const [autorizo, setAutorizo] = useState(false)
  const [autorizoError, setAutorizoError] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (key: FieldKey) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues(v => ({ ...v, [key]: e.target.value }))
    if (e.target.value.trim()) setErrors(er => ({ ...er, [key]: false }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newErrors = { ...INITIAL_ERRORS }
    let ok = true
    CAMPOS_OBRIGATORIOS.forEach(k => {
      if (!values[k].trim()) { newErrors[k] = true; ok = false }
    })
    setErrors(newErrors)
    setAutorizoError(!autorizo)
    if (!autorizo) ok = false
    setSubmitted(ok)
  }

  return (
    <section style={{ background: 'var(--branco)', padding: 'var(--xxl) 0' }}>
      <div className="container">
        <h2 className="reveal" style={{ color: 'var(--azul)', fontSize: 'clamp(1.8rem, 2.5vw, 2.25rem)', marginBottom: 'var(--sm)' }}>
          Envie seu DARF
        </h2>
        <p className="reveal" style={{ maxWidth: 680, marginBottom: 'var(--lg)' }}>
          Preencha seus dados, anexe o DARF de doação e o comprovante de pagamento.
        </p>

        <span id="enviar-darf" style={{ position: 'relative', top: -120 }} aria-hidden="true" />

        <form
          id="form-darf"
          onSubmit={handleSubmit}
          noValidate
          style={{
            background: 'var(--branco)', borderRadius: 'var(--raio-lg)',
            boxShadow: '0 16px 44px rgba(2,78,134,0.14)',
            padding: 'var(--xl)', margin: '0 auto', maxWidth: 1040,
          }}
        >
          <div className="form-grid">
            {CAMPOS.map(campo => (
              <div key={campo.key} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sm)' }}>
                <label htmlFor={`f-${campo.key}`} style={{
                  fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.06em',
                  textTransform: 'uppercase', color: 'var(--azul)',
                }}>
                  {campo.label}
                  {campo.obrigatorio && <span style={{ color: 'var(--accent)' }}> *</span>}
                </label>
                <input
                  id={`f-${campo.key}`}
                  type={campo.type}
                  inputMode={campo.inputMode as React.HTMLAttributes<HTMLInputElement>['inputMode']}
                  placeholder={campo.placeholder}
                  value={values[campo.key]}
                  onChange={handleChange(campo.key)}
                  style={inputStyle(errors[campo.key])}
                />
                {errors[campo.key] && (
                  <p style={{ fontSize: '0.8125rem', color: 'var(--accent)', fontWeight: 700, margin: 0 }}>
                    Preencha este campo
                  </p>
                )}
              </div>
            ))}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sm)' }}>
              <label htmlFor="f-como" style={{
                fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.06em',
                textTransform: 'uppercase', color: 'var(--azul)',
              }}>
                COMO FICOU SABENDO DA POSSIBILIDADE DE DOAÇÃO?
                <span style={{ color: 'var(--accent)' }}> *</span>
              </label>
              <select
                id="f-como"
                value={values.como}
                onChange={handleChange('como')}
                style={inputStyle(errors.como)}
              >
                <option value="">Selecione uma opção</option>
                {COMO_SOUBE.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.como && (
                <p style={{ fontSize: '0.8125rem', color: 'var(--accent)', fontWeight: 700, margin: 0 }}>
                  Selecione uma opção
                </p>
              )}
            </div>
          </div>

          <div className="uploads-grid">
            <UploadZone
              label="DARF de doação"
              tooltip="É o documento que comprova que você realizou o pagamento da doação ao Hospital Pequeno Príncipe."
              icon={<DocIcon />}
            />
            <UploadZone
              label="Comprovante de pagamento"
              tooltip="É o documento que seu banco emite após você efetuar o pagamento do DARF. Prova que o dinheiro foi transferido com sucesso."
              icon={<CheckDocIcon />}
            />
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 'var(--lg)', marginTop: 'var(--lg)', flexWrap: 'wrap',
          }}>
            <label style={{
              display: 'flex', alignItems: 'flex-start', gap: 'var(--md)',
              cursor: 'pointer', maxWidth: 560,
            }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <input
                  type="checkbox"
                  checked={autorizo}
                  onChange={e => { setAutorizo(e.target.checked); if (e.target.checked) setAutorizoError(false) }}
                  style={{ position: 'absolute', opacity: 0, width: 28, height: 28, cursor: 'pointer' }}
                />
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  border: `2px solid ${autorizoError ? 'var(--accent)' : 'var(--azul)'}`,
                  background: autorizo ? 'var(--azul)' : 'var(--branco)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: 2, transition: 'background 150ms',
                }}>
                  {autorizo && (
                    <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5" style={{ width: 16, height: 16 }}>
                      <path d="M3 8.5 L6.5 12 L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span style={{ fontWeight: 700, marginTop: 4 }}>
                Eu autorizo que minha doação seja direcionada aos projetos do Hospital Pequeno
                Príncipe focados nas causas estruturais do 2doe4 (Saúde, Equoterapia, Esporte,
                Meio Ambiente e Educação). <span style={{ color: 'var(--accent)' }}>*</span>
              </span>
            </label>

            <button type="submit" className="btn btn-primary" style={{ minWidth: 200 }}>
              Enviar
            </button>
          </div>

          {submitted && (
            <div style={{
              marginTop: 'var(--md)', background: '#EAF7E6', color: '#1F6E13',
              borderRadius: 'var(--raio-md)', padding: 'var(--md)', fontWeight: 700,
            }}>
              Tudo certo! Recebemos suas informações. Em breve nossa equipe entrará em contato.
            </div>
          )}
        </form>
      </div>

      <style>{`
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--lg);
        }
        .uploads-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--lg);
          margin-top: var(--lg);
        }
        @media (max-width: 639px) {
          .form-grid, .uploads-grid { grid-template-columns: 1fr; }
          #form-darf > div:last-of-type { flex-direction: column; align-items: stretch; }
          #form-darf button[type="submit"] { width: 100%; }
        }
      `}</style>
    </section>
  )
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: '100%', height: '100%' }}>
      <path d="M6 2h8l5 5v15H6z" strokeLinejoin="round" />
      <path d="M14 2v5h5" strokeLinejoin="round" />
      <path d="M9 13h7M9 17h7" strokeLinecap="round" />
    </svg>
  )
}

function CheckDocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: '100%', height: '100%' }}>
      <path d="M6 2h8l5 5v15H6z" strokeLinejoin="round" />
      <path d="M14 2v5h5" strokeLinejoin="round" />
      <path d="M9 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
