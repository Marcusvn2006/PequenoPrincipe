// Tweaks — Doe seu IR · Pequeno Príncipe
// Aplica ajustes visuais via CSS vars / classes no <body>.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#E94E8A",
  "crowns": true,
  "anims": true,
  "faqMultiplo": false
}/*EDITMODE-END*/;

function PPTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accent);
    document.body.classList.toggle('no-crowns', !t.crowns);
    document.body.classList.toggle('no-anims', !t.anims);
    window.__faqMultiplo = !!t.faqMultiplo;
  }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Cores" />
      <TweakColor label="Cor do CTA principal" value={t.accent}
                  options={['#E94E8A', '#0067B1', '#3DAE2B']}
                  onChange={(v) => setTweak('accent', v)} />
      <TweakSection label="Personalidade" />
      <TweakToggle label="Padrão de coroas" value={t.crowns}
                   onChange={(v) => setTweak('crowns', v)} />
      <TweakToggle label="Animações de entrada" value={t.anims}
                   onChange={(v) => setTweak('anims', v)} />
      <TweakSection label="FAQ" />
      <TweakToggle label="Permitir várias abertas" value={t.faqMultiplo}
                   onChange={(v) => setTweak('faqMultiplo', v)} />
    </TweaksPanel>
  );
}

const __tweaksRoot = document.createElement('div');
document.body.appendChild(__tweaksRoot);
ReactDOM.createRoot(__tweaksRoot).render(<PPTweaks />);
