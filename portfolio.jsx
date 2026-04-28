// Diogo Porto — quirky/humble dev portfolio variant
const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS_V2 = /*EDITMODE-BEGIN*/{
  "paper": "cream",
  "showCursor": true,
  "polaroidTilt": -3,
  "showCounter": true
}/*EDITMODE-END*/;

const PAPERS = {
  cream: { bg: "#f6f1e3", ink: "#1a1612", muted: "#7a6f5e", marker: "#ffe066", rule: "#1a1612" },
  white: { bg: "#fafaf7", ink: "#111", muted: "#666", marker: "#fff176", rule: "#111" },
  green: { bg: "#0d1410", ink: "#c8d8c5", muted: "#7a8c75", marker: "#7fff7f", rule: "#c8d8c5" }
};

const PROJECTS_V2 = [
  {
    title: "roommate-finding app",
    tag: "[wip · 2026]",
    blurb: "matching uni students who need shared housing. building it because i lived through the housing-search hell myself. might turn into a small startup, might just be a learning project — we'll see.",
    stack: "react native · node · postgres",
    href: "#"
  },
  {
    title: "sapo autofill",
    tag: "[shipped · 2025]",
    blurb: "a safari extension that fills out the SAPO portal forms for me, because typing the same thing 40 times a week was making me insane. solved a personal annoyance, ended up learning the WebExtensions API.",
    stack: "javascript · webextensions",
    href: "#"
  },
  {
    title: "sms spam classifier",
    tag: "[done · 2025]",
    blurb: "trained a small neural net to detect spam texts. tokenisation, embeddings, the whole bit. part of the freecodecamp ML cert — first time i felt like i actually got how the layers fit together.",
    stack: "python · tensorflow · keras",
    href: "#"
  },
  {
    title: "exoplanet classifier",
    tag: "[hackathon · 2025]",
    blurb: "48 hours, four people, way too much coffee. built a classifier for nasa space apps. 7th of 15 locally — not bad for a team that met two days before.",
    stack: "python · ml · sleep deprivation",
    href: "#"
  }
];

const STACK_V2 = [
  { k: "languages i actually use", v: "java, c/c++, python, sql, bash" },
  { k: "ml-ish stuff", v: "tensorflow, keras, numpy, pandas, jupyter" },
  { k: "tools", v: "git, docker, linux (arch btw — kidding, mostly ubuntu)" },
  { k: "web", v: "html, css, js (i'm getting there), rest, browser extensions" }
];

const NOW_V2 = [
  "finishing one (1) last subject — software engineering lab, fingers crossed",
  "shipping the roommate app slowly but surely",
  "applying to backend roles around europe (eu citizen, will travel)",
  "currently listening to: too much lo-fi while debugging"
];

function TypingCursor({ enabled }) {
  if (!enabled) return null;
  return <span className="cursor-blink">▊</span>;
}

function Marker({ children }) {
  return <span className="marker">{children}</span>;
}

function Wave() {
  const [frame, setFrame] = useState(0);
  const frames = ["( ﾟ◡ﾟ)/", "( ﾟ◡ﾟ)ノ", "(ﾉﾟ◡ﾟ)ﾉ", "( ﾟ◡ﾟ)ノ"];
  useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % frames.length), 320);
    return () => clearInterval(id);
  }, []);
  return <span className="wave-emote">{frames[frame]}</span>;
}

function Polaroid({ tilt }) {
  return (
    <div className="polaroid" style={{ transform: `rotate(${tilt}deg)` }}>
      <div className="polaroid-tape" />
      <div className="polaroid-img-wrap">
        <img src="assets/diogo.jpeg" alt="me, supposedly working" />
      </div>
      <div className="polaroid-caption">
        diogo, mid-debug<br/>
        <span className="polaroid-date">faro, 2026</span>
      </div>
    </div>
  );
}

function Counter({ enabled }) {
  if (!enabled) return null;
  const [n] = useState(() => 1247 + Math.floor(Math.random() * 200));
  return (
    <div className="counter">
      <span>★ visitors:</span>
      <span className="counter-num">{String(n).padStart(7, "0")}</span>
      <span className="counter-mini">(probably mostly me, refreshing)</span>
    </div>
  );
}

function Section({ id, title, children }) {
  return (
    <section className="r-section" id={id} data-screen-label={id}>
      <h2 className="r-h2">
        <span className="r-h2-prompt">##</span> {title}
      </h2>
      {children}
    </section>
  );
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS_V2);
  const paper = PAPERS[tweaks.paper] || PAPERS.cream;

  useEffect(() => {
    document.body.style.background = paper.bg;
    document.body.style.color = paper.ink;
  }, [paper]);

  const [openIdx, setOpenIdx] = useState(null);

  return (
    <>
      <style>{`
        :root {
          --bg: ${paper.bg};
          --ink: ${paper.ink};
          --muted: ${paper.muted};
          --marker: ${paper.marker};
          --rule: ${paper.rule};
        }
      `}</style>

      <div className="r-page">
        <header className="r-header">
          <div className="r-header-left">
            <span className="r-prompt">~/diogo</span>
            <span className="r-prompt-sep">$</span>
            <span className="r-prompt-cmd">cat about.txt</span>
            <TypingCursor enabled={tweaks.showCursor} />
          </div>
          <nav className="r-nav">
            <a href="#work">work/</a>
            <a href="#stack">stack/</a>
            <a href="#now">now/</a>
            <a href="#contact">contact/</a>
          </nav>
        </header>

        <div className="r-divider">{"─".repeat(80)}</div>

        {/* INTRO */}
        <section className="r-intro" data-screen-label="intro">
          <div className="r-intro-grid">
            <div className="r-intro-text">
              <p className="r-greeting">hi, <Wave /></p>
              <h1 className="r-h1">
                i'm <Marker>diogo</Marker>. i write backends,<br/>
                train small models, and ship<br/>
                browser extensions when something<br/>
                annoys me long enough.
              </h1>
              <p className="r-sub">
                final-year cs student at universidade do algarve, graduating june 2026. comfortable in python, java, c/c++. dabble in ml. live in faro, portugal — open to moving anywhere in europe for a good first job.
              </p>
              <div className="r-tags">
                <span className="r-tag">#backend</span>
                <span className="r-tag">#ml-curious</span>
                <span className="r-tag">#eu-citizen</span>
                <span className="r-tag">#will-relocate</span>
                <span className="r-tag">#available-jun-2026</span>
              </div>
            </div>
            <div className="r-intro-photo">
              <Polaroid tilt={tweaks.polaroidTilt} />
            </div>
          </div>
        </section>

        {/* WORK */}
        <Section id="work" title="things i've made">
          <p className="r-section-lede">
            mostly side projects. some shipped, some still in the oven. click to read.
          </p>
          <ul className="r-projects">
            {PROJECTS_V2.map((p, i) => (
              <li key={p.title} className={`r-project ${openIdx === i ? "is-open" : ""}`}>
                <button className="r-project-btn" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                  <span className="r-project-bullet">{openIdx === i ? "▾" : "▸"}</span>
                  <span className="r-project-title">{p.title}</span>
                  <span className="r-project-tag">{p.tag}</span>
                </button>
                {openIdx === i && (
                  <div className="r-project-body">
                    <p>{p.blurb}</p>
                    <div className="r-project-meta">
                      <span><span className="r-meta-k">stack:</span> {p.stack}</span>
                      <a href={p.href} className="r-link">read more →</a>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Section>

        {/* STACK */}
        <Section id="stack" title="what's in my toolbox">
          <dl className="r-stack">
            {STACK_V2.map(s => (
              <React.Fragment key={s.k}>
                <dt>{s.k}</dt>
                <dd>{s.v}</dd>
              </React.Fragment>
            ))}
          </dl>
          <p className="r-footnote">
            * i list things i've actually used on a real project, not things i once watched a 10-minute youtube intro about.
          </p>
        </Section>

        {/* NOW */}
        <Section id="now" title="what i'm up to right now">
          <ul className="r-now-list">
            {NOW_V2.map((n, i) => (
              <li key={i}>
                <span className="r-checkbox">[{i === 3 ? "♪" : " "}]</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* CERTS / SMALL WINS */}
        <Section id="wins" title="small wins">
          <ul className="r-wins">
            <li><span className="r-medal">🏅</span> machine learning with python — freecodecamp, sep 2025. trained a CNN image classifier and an SMS spam filter, didn't break anything important.</li>
            <li><span className="r-medal">🚀</span> nasa space apps 2025 — 7th of 15 locally. counted as a top-half finish in my head.</li>
            <li><span className="r-medal">🧠</span> miup 2025 — represented ualg at the national programming marathon. got humbled by graph problems.</li>
            <li><span className="r-medal">👶</span> taught computing to kids at AI9 (sep 2024 – jun 2025). turns out explaining a for-loop to a 9-year-old is harder than writing one.</li>
          </ul>
        </Section>

        {/* CONTACT */}
        <Section id="contact" title="say hi">
          <p className="r-contact-lede">
            best way to reach me is email. i actually check it. promise.
          </p>
          <ul className="r-contact-list">
            <li>
              <span className="r-contact-k">email</span>
              <span className="r-contact-arrow">→</span>
              <a className="r-link r-link-big" href="mailto:diogo.g.portob@gmail.com">diogo.g.portob@gmail.com</a>
            </li>
            <li>
              <span className="r-contact-k">github</span>
              <span className="r-contact-arrow">→</span>
              <a className="r-link" href="#">github.com/diogopipas</a>
            </li>
            <li>
              <span className="r-contact-k">linkedin</span>
              <span className="r-contact-arrow">→</span>
              <a className="r-link" href="#">linkedin.com/in/diogo-porto</a>
            </li>
            <li>
              <span className="r-contact-k">site</span>
              <span className="r-contact-arrow">→</span>
              <a className="r-link" href="#">diogoporto.dev</a>
            </li>
            <li>
              <span className="r-contact-k">phone</span>
              <span className="r-contact-arrow">→</span>
              <span>+351 933 949 061</span>
            </li>
          </ul>
        </Section>

        {/* FOOTER */}
        <footer className="r-footer">
          <div className="r-divider">{"─".repeat(80)}</div>
          <div className="r-footer-row">
            <div>
              <p>built by hand. no frameworks were harmed.</p>
              <p className="r-muted">last updated: apr 28, 2026 · faro, pt</p>
            </div>
            <Counter enabled={tweaks.showCounter} />
          </div>
          <div className="r-eof">— end of file —</div>
        </footer>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection title="paper">
          <TweakRadio
            label="background"
            value={tweaks.paper}
            onChange={(v) => setTweak("paper", v)}
            options={[
              { value: "cream", label: "Cream" },
              { value: "white", label: "Plain" },
              { value: "green", label: "Phosphor" }
            ]}
          />
        </TweakSection>
        <TweakSection title="quirks">
          <TweakToggle
            label="terminal cursor"
            value={tweaks.showCursor}
            onChange={(v) => setTweak("showCursor", v)}
          />
          <TweakToggle
            label="visitor counter"
            value={tweaks.showCounter}
            onChange={(v) => setTweak("showCounter", v)}
          />
          <TweakSlider
            label="polaroid tilt"
            min={-12} max={12} step={1}
            value={tweaks.polaroidTilt}
            onChange={(v) => setTweak("polaroidTilt", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
