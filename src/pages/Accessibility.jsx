import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/ui/AnimatedSection'
import './Accessibility.css'

export default function Accessibility() {
  const [liveMessage, setLiveMessage] = useState('')

  return (
    <div className="accessibility-page">
      {/* Hero */}
      <div className="page-hero" aria-label="Accessibility demo page">
        <div className="page-hero-content">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Accessibility Demo
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Examples of inaccessible vs accessible web patterns
          </motion.p>
        </div>
      </div>

      <div className="container">
        {/* Introduction */}
        <AnimatedSection variant="fadeUp" style={{ paddingTop: '3rem' }}>
          <div style={{ background: 'rgba(0,78,137,0.06)', border: '1px solid var(--secondary)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>ℹ️ About This Page</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              This page demonstrates common web accessibility issues (WCAG violations) and their correct solutions. The "Issues Demo" section contains intentionally broken examples for educational purposes. The "Accessible Version" section shows the correct implementation.
            </p>
          </div>
        </AnimatedSection>

        {/* ============================================
            SECTION 1: ACCESSIBILITY ISSUES DEMO (BAD)
            ============================================ */}
        <section className="a11y-section" aria-labelledby="bad-examples-heading">
          <AnimatedSection variant="fadeUp">
            <h2 id="bad-examples-heading">
              <span className="a11y-section-title bad">⚠️ Accessibility Issues Demo — DO NOT COPY</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
              The following examples intentionally demonstrate common accessibility violations. These patterns harm users with disabilities and fail WCAG standards.
            </p>
          </AnimatedSection>

          <div className="a11y-examples-grid">
            {/* Bad: Images without alt text */}
            <AnimatedSection variant="fadeUp" delay={0.1}>
              <div className="a11y-example bad">
                <div className="a11y-example-title bad">❌ Bad: No Alt Text</div>
                <div className="a11y-demo">
                  {/* INTENTIONALLY BAD — no alt attribute */}
                  <img src="https://picsum.photos/seed/accessible1/200/120" />
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Screen readers cannot describe this image.</p>
                </div>
                <pre className="a11y-code">{`<!-- BAD: No alt attribute -->
<img src="travel.jpg" />`}</pre>
              </div>
            </AnimatedSection>

            {/* Bad: Button with no label */}
            <AnimatedSection variant="fadeUp" delay={0.15}>
              <div className="a11y-example bad">
                <div className="a11y-example-title bad">❌ Bad: Button with No Label</div>
                <div className="a11y-demo">
                  {/* INTENTIONALLY BAD — no accessible label */}
                  <button style={{ padding: '0.5rem 1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    <span>🔍</span>
                  </button>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Screen reader says "button" — no context of what it does.</p>
                </div>
                <pre className="a11y-code">{`<!-- BAD: No accessible name -->
<button>
  <span>🔍</span>
</button>`}</pre>
              </div>
            </AnimatedSection>

            {/* Bad: Low contrast */}
            <AnimatedSection variant="fadeUp" delay={0.2}>
              <div className="a11y-example bad">
                <div className="a11y-example-title bad">❌ Bad: Low Contrast Text</div>
                <div className="a11y-demo" style={{ background: 'white' }}>
                  <p className="low-contrast-text">This text has very low contrast against the background. Many users cannot read this. Ratio: 1.6:1 (fails WCAG AA requirement of 4.5:1)</p>
                </div>
                <pre className="a11y-code">{`/* BAD: Low contrast ratio */
.text {
  color: #cccccc; /* on white */
  /* Contrast ratio: 1.6:1 */
}`}</pre>
              </div>
            </AnimatedSection>

            {/* Bad: Form without labels */}
            <AnimatedSection variant="fadeUp" delay={0.25}>
              <div className="a11y-example bad">
                <div className="a11y-example-title bad">❌ Bad: Form Without Labels</div>
                <div className="a11y-demo">
                  {/* INTENTIONALLY BAD — no labels associated */}
                  <input
                    type="text"
                    placeholder="Enter your name"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg)', color: 'var(--text)', marginBottom: '0.5rem' }}
                  />
                  <input
                    type="email"
                    placeholder="Enter email"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg)', color: 'var(--text)' }}
                  />
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Placeholders disappear when typing. No persistent labels for screen readers.</p>
                </div>
                <pre className="a11y-code">{`<!-- BAD: No labels, only placeholder -->
<input type="text" placeholder="Name" />
<input type="email" placeholder="Email" />`}</pre>
              </div>
            </AnimatedSection>

            {/* Bad: Color only info */}
            <AnimatedSection variant="fadeUp" delay={0.3}>
              <div className="a11y-example bad">
                <div className="a11y-example-title bad">❌ Bad: Color-Only Information</div>
                <div className="a11y-demo">
                  <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Server Status (colorblind users can't distinguish these):</p>
                  <div className="color-only" aria-label="Status indicators — inaccessible">
                    <div className="color-indicator danger" />
                    <div className="color-indicator warning" />
                    <div className="color-indicator success" />
                  </div>
                </div>
                <pre className="a11y-code">{`<!-- BAD: Color is the only indicator -->
<div class="red-circle" />
<div class="yellow-circle" />
<div class="green-circle" />`}</pre>
              </div>
            </AnimatedSection>

            {/* Bad: No focus indicators */}
            <AnimatedSection variant="fadeUp" delay={0.35}>
              <div className="a11y-example bad">
                <div className="a11y-example-title bad">❌ Bad: No Focus Indicator</div>
                <div className="a11y-demo">
                  <button className="no-focus-btn" tabIndex={0}>
                    Click or Tab to me — you can't see when I'm focused
                  </button>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Keyboard users cannot tell which element is focused.</p>
                </div>
                <pre className="a11y-code">{`/* BAD: Removes focus ring */
button:focus {
  outline: none !important;
}`}</pre>
              </div>
            </AnimatedSection>

            {/* Bad: Inaccessible accordion */}
            <AnimatedSection variant="fadeUp" delay={0.4}>
              <div className="a11y-example bad">
                <div className="a11y-example-title bad">❌ Bad: Div-Based Accordion</div>
                <div className="a11y-demo">
                  {/* INTENTIONALLY BAD — using div for interactive element */}
                  <div
                    style={{ padding: '0.625rem', background: 'var(--bg-tertiary)', borderRadius: '4px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span>What is accessible travel?</span>
                    <span>+</span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Not keyboard accessible, no ARIA roles.</p>
                </div>
                <pre className="a11y-code">{`<!-- BAD: Div is not interactive -->
<div onclick="toggle()">
  Question text <span>+</span>
</div>`}</pre>
              </div>
            </AnimatedSection>

            {/* Bad: Tiny click targets */}
            <AnimatedSection variant="fadeUp" delay={0.45}>
              <div className="a11y-example bad">
                <div className="a11y-example-title bad">❌ Bad: Tiny Click Target</div>
                <div className="a11y-demo" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button className="tiny-target" aria-label="This button is too small" />
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>12×12px button. WCAG requires 44×44px minimum touch target.</p>
                </div>
                <pre className="a11y-code">{`/* BAD: Too small */
.btn {
  width: 12px;
  height: 12px;
}`}</pre>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ============================================
            SECTION 2: ACCESSIBLE VERSION (GOOD)
            ============================================ */}
        <section className="a11y-section" aria-labelledby="good-examples-heading">
          <AnimatedSection variant="fadeUp">
            <h2 id="good-examples-heading">
              <span className="a11y-section-title good">✅ Accessible Version — Correct Patterns</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
              These examples follow WCAG 2.1 AA standards and best practices for inclusive web design.
            </p>
          </AnimatedSection>

          <div className="a11y-examples-grid">
            {/* Good: Alt text */}
            <AnimatedSection variant="fadeUp" delay={0.1}>
              <div className="a11y-example good">
                <div className="a11y-example-title good">✅ Good: Descriptive Alt Text</div>
                <div className="a11y-demo">
                  <img
                    src="https://picsum.photos/seed/accessible1/200/120"
                    alt="Scenic aerial view of Bali rice terraces at sunset, with lush green terraced fields stepping down a hillside"
                  />
                </div>
                <pre className="a11y-code">{`<!-- GOOD: Descriptive alt attribute -->
<img
  src="bali.jpg"
  alt="Scenic aerial view of Bali
       rice terraces at sunset"
/>`}</pre>
              </div>
            </AnimatedSection>

            {/* Good: Button with aria-label */}
            <AnimatedSection variant="fadeUp" delay={0.15}>
              <div className="a11y-example good">
                <div className="a11y-example-title good">✅ Good: Labeled Button</div>
                <div className="a11y-demo">
                  <button
                    aria-label="Search destinations"
                    style={{ padding: '0.5rem 1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    <span aria-hidden="true">🔍</span>
                    <span style={{ marginLeft: '0.375rem' }}>Search</span>
                  </button>
                </div>
                <pre className="a11y-code">{`<!-- GOOD: Accessible button label -->
<button aria-label="Search destinations">
  <span aria-hidden="true">🔍</span>
  Search
</button>`}</pre>
              </div>
            </AnimatedSection>

            {/* Good: High contrast */}
            <AnimatedSection variant="fadeUp" delay={0.2}>
              <div className="a11y-example good">
                <div className="a11y-example-title good">✅ Good: High Contrast Text</div>
                <div className="a11y-demo">
                  <p style={{ color: '#1A1A2E', background: 'white', padding: '0.5rem', borderRadius: '4px' }}>
                    This text has high contrast. Ratio: 16.9:1 — exceeds WCAG AAA (7:1) and AA (4.5:1) requirements for normal text.
                  </p>
                </div>
                <pre className="a11y-code">{`/* GOOD: High contrast ratio */
.text {
  color: #1A1A2E; /* on white */
  /* Contrast ratio: 16.9:1 */
}`}</pre>
              </div>
            </AnimatedSection>

            {/* Good: Form with labels */}
            <AnimatedSection variant="fadeUp" delay={0.25}>
              <div className="a11y-example good">
                <div className="a11y-example-title good">✅ Good: Labeled Form Fields</div>
                <div className="a11y-demo">
                  <div style={{ marginBottom: '0.75rem' }}>
                    <label
                      htmlFor="good-name"
                      style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem', fontSize: '0.875rem' }}
                    >
                      Full Name <span style={{ color: 'var(--primary)' }} aria-label="required">*</span>
                    </label>
                    <input
                      id="good-name"
                      type="text"
                      aria-required="true"
                      aria-describedby="name-hint"
                      style={{ width: '100%', padding: '0.5rem', border: '2px solid var(--border)', borderRadius: '4px', background: 'var(--bg)', color: 'var(--text)' }}
                    />
                    <p id="name-hint" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Enter your first and last name
                    </p>
                  </div>
                </div>
                <pre className="a11y-code">{`<!-- GOOD: Label associated with input -->
<label for="name">Full Name *</label>
<input
  id="name"
  type="text"
  aria-required="true"
  aria-describedby="name-hint"
/>
<p id="name-hint">First and last name</p>`}</pre>
              </div>
            </AnimatedSection>

            {/* Good: Status with text+color+icon */}
            <AnimatedSection variant="fadeUp" delay={0.3}>
              <div className="a11y-example good">
                <div className="a11y-example-title good">✅ Good: Multi-Modal Status</div>
                <div className="a11y-demo">
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li className="status-with-icon">
                      <span style={{ color: '#ef4444', fontSize: '1rem' }} aria-hidden="true">🔴</span>
                      <span>Server A: <strong style={{ color: '#ef4444' }}>Offline</strong></span>
                    </li>
                    <li className="status-with-icon">
                      <span style={{ color: '#f59e0b', fontSize: '1rem' }} aria-hidden="true">🟡</span>
                      <span>Server B: <strong style={{ color: '#f59e0b' }}>Maintenance</strong></span>
                    </li>
                    <li className="status-with-icon">
                      <span style={{ color: '#22c55e', fontSize: '1rem' }} aria-hidden="true">🟢</span>
                      <span>Server C: <strong style={{ color: '#22c55e' }}>Online</strong></span>
                    </li>
                  </ul>
                </div>
                <pre className="a11y-code">{`<!-- GOOD: Color + icon + text -->
<li>
  <span aria-hidden="true">🔴</span>
  Server A: <strong>Offline</strong>
</li>`}</pre>
              </div>
            </AnimatedSection>

            {/* Good: Focus indicator */}
            <AnimatedSection variant="fadeUp" delay={0.35}>
              <div className="a11y-example good">
                <div className="a11y-example-title good">✅ Good: Visible Focus Ring</div>
                <div className="a11y-demo">
                  <button className="good-focus-btn" tabIndex={0}>
                    Tab to me — you can see when I'm focused!
                  </button>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Press Tab to see the orange focus ring.</p>
                </div>
                <pre className="a11y-code">{`/* GOOD: Clear focus indicator */
button:focus-visible {
  outline: 3px solid #ff6b35;
  outline-offset: 3px;
}`}</pre>
              </div>
            </AnimatedSection>

            {/* Good: Button-based accordion */}
            <AnimatedSection variant="fadeUp" delay={0.4}>
              <div className="a11y-example good">
                <div className="a11y-example-title good">✅ Good: Accessible Accordion</div>
                <div className="a11y-demo">
                  <AccordionDemo />
                </div>
                <pre className="a11y-code">{`<!-- GOOD: Button with ARIA -->
<button
  aria-expanded="false"
  aria-controls="answer-1"
  id="q-1"
>
  What is accessible travel?
</button>
<div
  id="answer-1"
  role="region"
  aria-labelledby="q-1"
>
  Answer content...
</div>`}</pre>
              </div>
            </AnimatedSection>

            {/* Good: ARIA Live Region */}
            <AnimatedSection variant="fadeUp" delay={0.45}>
              <div className="a11y-example good">
                <div className="a11y-example-title good">✅ Good: ARIA Live Region</div>
                <div className="a11y-demo">
                  <button
                    onClick={() => setLiveMessage(`Update: ${new Date().toLocaleTimeString()} — New destination added!`)}
                    style={{ padding: '0.5rem 1rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '0.75rem' }}
                    aria-label="Trigger live region update"
                  >
                    Trigger Update
                  </button>
                  <div
                    aria-live="polite"
                    aria-atomic="true"
                    className="aria-live-demo"
                    role="status"
                  >
                    {liveMessage || 'Screen readers will announce updates to this region automatically.'}
                  </div>
                </div>
                <pre className="a11y-code">{`<!-- GOOD: Live region for dynamic content -->
<div
  aria-live="polite"
  aria-atomic="true"
  role="status"
>
  Dynamic content here
</div>`}</pre>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* WCAG Summary */}
        <AnimatedSection variant="fadeUp">
          <div style={{ marginTop: '2rem', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}>
            <h2 style={{ marginBottom: '1rem' }}>📋 Key WCAG 2.1 Principles</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {[
                { letter: 'P', color: '#004E89', title: 'Perceivable', desc: 'Info must be presentable in ways users can perceive (alt text, captions, contrast).' },
                { letter: 'O', color: '#FF6B35', title: 'Operable', desc: 'All functionality must be keyboard accessible with adequate interaction time.' },
                { letter: 'U', color: '#1A936F', title: 'Understandable', desc: 'Information and operation must be understandable (clear labels, error messages).' },
                { letter: 'R', color: '#7c3aed', title: 'Robust', desc: 'Content must be robust enough to be interpreted by assistive technologies.' },
              ].map(p => (
                <div key={p.letter} style={{ textAlign: 'center', padding: '1.25rem', background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: p.color, color: 'white', fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                    {p.letter}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

function AccordionDemo() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <button
        aria-expanded={isOpen}
        aria-controls="acc-answer"
        id="acc-question"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0.625rem 0.875rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border)',
          borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, color: 'var(--text)',
          fontSize: '0.9375rem',
        }}
      >
        What is accessible travel?
        <span aria-hidden="true" style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      {isOpen && (
        <div
          id="acc-answer"
          role="region"
          aria-labelledby="acc-question"
          style={{ padding: '0.75rem 0.875rem', background: 'var(--card-bg)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 4px 4px' }}
        >
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Accessible travel ensures that people with disabilities or special needs can fully enjoy travel experiences. This includes wheelchair-accessible transport, sensory-friendly accommodations, and inclusive tour activities.
          </p>
        </div>
      )}
    </div>
  )
}
