import React, { useState, type CSSProperties, type FormEvent } from 'react';
import { createRoot } from 'react-dom/client';
import { palettes, questions, steps, teams } from './data';
import './styles.css';

function App() {
  const [paletteId, setPaletteId] = useState('original');
  const [view, setView] = useState<'flyer' | 'worksheet'>(window.location.hash === '#worksheet' ? 'worksheet' : 'flyer');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [details, setDetails] = useState({ pain: '', name: '', institution: '', email: '', call: false });
  const [notice, setNotice] = useState('');
  const palette = palettes.find(p => p.id === paletteId)!;
  const completed = Object.keys(answers).length;
  const count = Object.values(answers).filter(answer => answer === 3).length;
  const style = { '--ink': palette.ink, '--accent': palette.accent, '--paper': palette.paper, '--line': palette.line, '--cta': palette.cta, '--cta-ink': palette.ctaInk || '#ffffff' } as CSSProperties;

  function navigate(next: typeof view) {
    setView(next);
    window.history.replaceState(null, '', next === 'worksheet' ? '#worksheet' : '#flyer');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function download(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = {
      survey: 'TriCheck · URMIA 2026',
      answers: questions.map((q, i) => ({ question: q.text, answer: q.options[answers[i]] })),
      whereItBreaks: details.pain, contact: { name: details.name, institution: details.institution, email: details.email, openToCall: details.call },
      rightColumnCount: count,
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tricheck-urmia-2026-answers.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice('Your answers have been downloaded. Nothing has been sent or stored online.');
  }

  return <div className="app" style={style}>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="toolbar">
      <nav aria-label="Pages" className="page-tabs">
        <button aria-current={view === 'flyer' ? 'page' : undefined} onClick={() => navigate('flyer')}>The approach</button>
        <button aria-current={view === 'worksheet' ? 'page' : undefined} onClick={() => navigate('worksheet')}>The worksheet <span aria-hidden="true">↗</span></button>
      </nav>
      <div className="tools">
        <span className="swatches" aria-hidden="true"><i style={{ background: palette.ink }} /><i style={{ background: palette.accent }} /></span>
        <label className="sr-only" htmlFor="palette">Color palette</label>
        <select id="palette" value={paletteId} onChange={event => setPaletteId(event.target.value)}>
          {palettes.map((p, i) => <option key={p.id} value={p.id}>{String(i + 1).padStart(2, '0')} / {p.name}</option>)}
        </select>
        <button className="print-button" onClick={() => window.print()} aria-label="Print current page">Print <span aria-hidden="true">↗</span></button>
      </div>
    </div>
    <div className={`sheet ${view}`}>
      <header className="masthead">
        <a className="wordmark" href="#flyer" onClick={event => { event.preventDefault(); navigate('flyer'); }}><span aria-hidden="true" />TriCheck</a>
        <div className="edition"><span>{view === 'flyer' ? 'URMIA 2026' : 'Worksheet'}</span><b>·</b>{view === 'flyer' ? 'Vendor clearance for higher education' : 'URMIA 2026'}</div>
      </header>
      <main id="main">
        {view === 'flyer' ? <>
          <section className="hero">
            <h1>A practical way out of<br />the <em>COI circle.</em></h1>
            <p>The certificate isn't the decision. A current COI can still leave the question that matters unanswered: <strong>Is this vendor cleared to work — and to be paid?</strong></p>
          </section>
          <section className="process" aria-label="From the circle to a shared status">
            <div className="process-row circle"><h2>The circle</h2><p>Request <span>→</span> Review <span>→</span> Clarify <span>→</span> Forward <span>→</span> Wait <span>→</span> Repeat <b>↻ &nbsp; And again at renewal</b></p></div>
            <div className="process-row path"><h2>The path</h2><p>Contract requirements <span>→</span> Evidence review <span>→</span> Exception routing <span>→</span> Human decision <span>→</span> Shared status</p></div>
            <div className="process-row signal"><h2>The signal</h2><div className="signal-content"><div className="statuses"><span className="eligible">Eligible</span><span className="exception">Exception</span><span className="blocked">Blocked</span></div><p>— one answer, reason attached, visible to every team</p></div></div>
          </section>
          <section className="steps" aria-label="How TriCheck works">{steps.map(([title, body], i) => <article key={title}><h2><span>{i + 1}</span> {title}</h2><p>{body}</p></article>)}</section>
          <section className="handoffs">
            <div className="handoff-intro"><span className="eyebrow">Built for the handoffs</span><h2>The circle breaks<br />{' '}where the work<br />{' '}changes hands.</h2><p>Every team touches the certificate; none of them owns the answer. The path gives each one the piece it actually needs.</p></div>
            {teams.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}
          </section>
          <section className="about" aria-label="About TriCheck">
            <article><h2>Structured evidence, not another inbox.</h2><p>Your records stay where they live — the contract, the ERP, the RMIS. TriCheck sits alongside them, reads the evidence, and returns one continuously current decision. Nothing gets replaced; the chase gets absorbed.</p></article>
            <article><h2>Built by practitioners.</h2><p>We've sat in the circle ourselves. We're at URMIA to learn where it breaks at your institution — and to shape TriCheck around what higher-ed risk teams actually need, before we build the wrong thing.</p></article>
          </section>
          <section className="survey-cta">
            <button onClick={() => navigate('worksheet')} className="survey-link"><span className="cta-arrow" aria-hidden="true">↗</span><span>Take the<br />survey</span></button>
            <div><h2>Tell us where your circle breaks.</h2><p><strong>Take a two-minute survey.</strong> Share what's true at your institution and where the process gets stuck.</p><p className="small">Seven questions. No sales pitch. Help shape TriCheck for higher education.</p></div>
          </section>
        </> : <>
          <section className="worksheet-heading"><h1>Where does your <em>COI circle</em> break?</h1><p>Take two minutes. Select what's true at your institution. Answers get more painful from left to right.</p></section>
          <form onSubmit={download}>
            <div className="survey-progress"><span>{completed} of 7 answered</span><progress value={completed} max={7} aria-label="Survey completion" /></div>
            <div className="scale"><div /><span>Under control</span><span>In the circle</span></div>
            <div className="questions">{questions.map((q, i) => <fieldset key={q.text} className="question">
              <legend className="sr-only">{i + 1}. {q.text}</legend>
              <div className="question-title" aria-hidden="true"><span>{i + 1}</span><h2>{q.text}</h2></div>
              <div className="options">{q.options.map((option, j) => <label key={option} className={answers[i] === j ? 'selected' : ''}>
                <input required type="radio" name={`question-${i}`} value={j} checked={answers[i] === j} onChange={() => { setAnswers({ ...answers, [i]: j }); setNotice(''); }} /><span>{option}</span>
              </label>)}</div>
            </fieldset>)}</div>
            <div className="question open-question"><label className="question-title" htmlFor="pain"><span>8</span><h2>Where does it break most for you? One sentence is plenty.</h2></label><textarea id="pain" value={details.pain} onChange={e => setDetails({ ...details, pain: e.target.value })} aria-label="Where does it break most for you?" rows={2} /></div>
            <section className="result" aria-label="Worksheet result"><div><h2>Three or more answers in the right-hand column? <em>You're in the circle.</em></h2><p>{completed < 7 ? 'Complete the worksheet to see where your process stands.' : count >= 3 ? 'Your answers point to the circle. Explore the TriCheck approach to see the path out.' : 'You have fewer than three answers in the right-hand column. Your answers still help identify where handoffs could improve.'}</p></div><div className="score"><output aria-live="polite" aria-label="Right-column count">{count}</output><span>Right-column count</span></div></section>
            <div className="contact-fields">
              <label>Name<input autoComplete="name" value={details.name} onChange={e => setDetails({ ...details, name: e.target.value })} /></label>
              <label>Institution / role<input autoComplete="organization" value={details.institution} onChange={e => setDetails({ ...details, institution: e.target.value })} /></label>
              <label>Email<input type="email" autoComplete="email" value={details.email} onChange={e => setDetails({ ...details, email: e.target.value })} /></label>
            </div>
            <label className="call-opt-in"><input type="checkbox" checked={details.call} onChange={e => setDetails({ ...details, call: e.target.checked })} />I'd do a 20-minute call to walk you through our process.</label>
            <div className="form-actions"><div><p>Your answers stay in this page until you download them.</p><p>Contact details are optional. No responses are sent online.</p></div><button className="download" type="submit">Download my answers <span aria-hidden="true">↓</span></button></div>
            <p role="status" className="notice">{notice}</p>
          </form>
        </>}
      </main>
      <footer><span><strong>TriCheck</strong> <b>·</b> Vendor clearance for higher education</span><span>URMIA 2026 <b>·</b> <span className="palette-label">Palette {paletteId === 'original' ? 'Original' : paletteId.toUpperCase()} — {palette.name}</span></span></footer>
    </div>
  </div>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
