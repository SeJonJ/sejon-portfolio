import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { profile, strengths, skills, experience, projects, education } from './data'

/* ── helpers ─────────────────────────────────────────── */
function useTypewriter(text, { speed = 36, start = true } = {}) {
  const [out, setOut] = useState('')
  useEffect(() => {
    if (!start) return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed, start])
  return out
}

const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
)

const Prompt = ({ children }) => (
  <span>
    <span className="text-term">$</span> <span className="text-slate-300">{children}</span>
  </span>
)

/* ── window chrome ───────────────────────────────────── */
const Dots = () => (
  <div className="flex gap-2">
    <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
    <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
    <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
  </div>
)

const Window = ({ title, children, className = '' }) => (
  <div className={`overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/40 ${className}`}>
    <div className="flex items-center gap-3 border-b border-line bg-surface2/60 px-4 py-2.5">
      <Dots />
      <span className="font-mono text-xs text-faint">{title}</span>
    </div>
    <div className="p-5 sm:p-7">{children}</div>
  </div>
)

/* ── nav ─────────────────────────────────────────────── */
const NAV = [
  ['about', 'about'],
  ['skills', 'skills'],
  ['experience', 'work'],
  ['projects', 'projects'],
  ['education', 'edu'],
]
function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <a href="#top" className="font-mono text-sm font-bold">
          <span className="text-term">~/</span>sejon
        </a>
        <ul className="hidden gap-1 font-mono text-[13px] sm:flex">
          {NAV.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="rounded-md px-3 py-1.5 text-muted transition hover:bg-surface hover:text-term"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

/* ── section heading ─────────────────────────────────── */
const Heading = ({ cmd, children }) => (
  <Reveal className="mb-8">
    <div className="font-mono text-sm text-faint">
      <span className="text-term">$</span> {cmd}
    </div>
    <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-100">{children}</h2>
  </Reveal>
)

/* ── hero ────────────────────────────────────────────── */
function Hero() {
  const typed = useTypewriter(profile.summary, { speed: 28 })
  return (
    <header id="top" className="bg-grid">
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-14 sm:pt-20">
        <Window title="zsh — ~/sejon">
          <div className="font-mono text-[13.5px] leading-7 sm:text-sm">
            <div>
              <Prompt>whoami</Prompt>
            </div>
            <div className="text-cyan">{profile.name} · {profile.role}</div>

            <div className="mt-3">
              <Prompt>cat headline.txt</Prompt>
            </div>
            <h1 className="mt-1 font-sans text-3xl font-extrabold leading-tight tracking-tight text-slate-50 sm:text-5xl">
              {profile.headline[0]}
              <br />
              <span className="text-term text-glow">{profile.headline[1]}</span>
            </h1>

            <div className="mt-4">
              <Prompt>./summary --short</Prompt>
            </div>
            <p className="mt-1 max-w-2xl text-muted">
              {typed}
              <span className="ml-0.5 inline-block w-2 animate-blink text-term">▋</span>
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2.5 font-mono text-[13px]">
            <CopyBtn label="Gmail" value={profile.emails[0]} />
            <CopyBtn label="Naver" value={profile.emails[1]} />
            <LinkBtn href={profile.github}>GitHub</LinkBtn>
            <LinkBtn href={profile.blog}>Blog</LinkBtn>
            <LinkBtn href={profile.chatforyou}>ChatForYou ▶</LinkBtn>
          </div>
        </Window>
      </div>
    </header>
  )
}

const LinkBtn = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-lg border border-line bg-surface2 px-3.5 py-2 text-slate-300 transition hover:-translate-y-0.5 hover:border-term hover:text-term"
  >
    {children}
  </a>
)

function CopyBtn({ label, value, primary }) {
  const copy = () => {
    const done = () => window.dispatchEvent(new CustomEvent('toast', { detail: `📋 ${value} 복사됨` }))
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(done).catch(done)
    } else {
      const t = document.createElement('textarea')
      t.value = value
      t.style.position = 'fixed'
      t.style.opacity = '0'
      document.body.appendChild(t)
      t.select()
      try { document.execCommand('copy') } catch (e) { /* noop */ }
      document.body.removeChild(t)
      done()
    }
  }
  return (
    <button
      onClick={copy}
      title="클릭하면 주소가 복사됩니다"
      className={`rounded-lg border px-3.5 py-2 transition hover:-translate-y-0.5 ${
        primary
          ? 'border-term/40 bg-term/10 text-term hover:border-term'
          : 'border-line bg-surface2 text-slate-300 hover:border-term hover:text-term'
      }`}
    >
      ✉ {label}
    </button>
  )
}

/* ── about ───────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-5 py-16">
      <Heading cmd="cat about/strengths.md">핵심 역량</Heading>
      <div className="grid gap-4 sm:grid-cols-2">
        {strengths.map((s, i) => (
          <Reveal key={s.t} delay={i * 0.06}>
            <div className="h-full rounded-xl border border-line bg-surface p-5 transition hover:border-term/40">
              <div className="font-mono text-sm text-term">▹ {s.t}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── skills ──────────────────────────────────────────── */
const Bars = ({ level }) => (
  <span className="font-mono text-xs tracking-tight">
    {[0, 1, 2].map((i) => (
      <span key={i} className={i < level ? 'text-term' : 'text-line'}>
        ▰
      </span>
    ))}
  </span>
)
function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-5 py-16">
      <Heading cmd="skills --list">보유 기술</Heading>
      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((g, gi) => (
          <Reveal key={g.group} delay={gi * 0.05}>
            <div className="rounded-xl border border-line bg-surface p-5">
              <div className="mb-3 font-mono text-xs uppercase tracking-wider text-faint">{g.group}</div>
              <div className="flex flex-col gap-2.5">
                {g.items.map(([name, lvl]) => (
                  <div key={name} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-slate-300">{name}</span>
                    <Bars level={lvl} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── experience ──────────────────────────────────────── */
function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-5 py-16">
      <Heading cmd="git log --author=sejon">경력</Heading>
      <div className="flex flex-col gap-5">
        {experience.map((e, i) => (
          <Reveal key={e.org} delay={i * 0.05}>
            <div className="rounded-xl border border-line bg-surface p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-bold text-slate-100">{e.org}</h3>
                <span className="font-mono text-xs text-cyan">{e.when}</span>
              </div>
              {e.note && <p className="mt-1 text-xs text-faint">{e.note}</p>}
              <ul className="mt-4 flex flex-col gap-3">
                {e.items.map(([head, body]) => (
                  <li key={head} className="border-l-2 border-line pl-4">
                    <div className="text-sm font-semibold text-slate-200">{head}</div>
                    {body && <div className="mt-0.5 text-sm leading-relaxed text-muted">{body}</div>}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── projects ────────────────────────────────────────── */
function ProjectCard({ p, idx }) {
  return (
    <Reveal delay={idx * 0.06}>
      <div className="rounded-xl border border-line bg-surface p-6 transition hover:border-term/40">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xl font-extrabold tracking-tight text-slate-100">{p.name}</h3>
          <div className="flex gap-2 font-mono text-xs">
            {p.repo && <a className="text-muted hover:text-term" href={p.repo} target="_blank" rel="noopener noreferrer">[GitHub]</a>}
            {p.link && <a className="text-muted hover:text-term" href={p.link} target="_blank" rel="noopener noreferrer">[Live ▶]</a>}
          </div>
        </div>
        <p className="mt-1 font-mono text-[13px] text-cyan">// {p.one}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-faint">
          {p.meta.map((m) => (
            <span key={m}>▸ {m}</span>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">{p.desc}</p>

        {p.feats.length > 0 && (
          <div className="mt-5 flex flex-col gap-3">
            {p.feats.map(([t, d]) => (
              <div key={t} className="pl-4 relative">
                <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-sm bg-term" />
                <div className="text-sm font-semibold text-slate-200">{t}</div>
                <div className="text-sm leading-relaxed text-muted">{d}</div>
              </div>
            ))}
          </div>
        )}

        {p.troubles?.length > 0 && (
          <div className="mt-5 rounded-lg border border-line bg-surface2/70 p-4">
            <div className="font-mono text-xs font-bold tracking-wide text-amber">🔧 TROUBLESHOOTING</div>
            <div className="mt-3 flex flex-col gap-3">
              {p.troubles.map(([t, d]) => (
                <div key={t}>
                  <div className="text-sm font-semibold text-slate-200">{t}</div>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{d}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
          {p.stack.map((s) => (
            <span key={s} className="rounded-md border border-line px-2 py-1 text-muted">
              {s}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-5 py-16">
      <Heading cmd="ls projects/">프로젝트</Heading>
      <div className="flex flex-col gap-5">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} idx={i} />
        ))}
      </div>
    </section>
  )
}

/* ── education ───────────────────────────────────────── */
function Education() {
  return (
    <section id="education" className="mx-auto max-w-5xl px-5 py-16">
      <Heading cmd="cat education.txt">학력 &amp; 자격</Heading>
      <div className="grid gap-4 sm:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-xl border border-line bg-surface p-5">
            <div className="mb-3 font-mono text-xs uppercase tracking-wider text-faint">학력 / 교육</div>
            <ul className="flex flex-col gap-2">
              {education.edu.map((x) => (
                <li key={x} className="text-sm text-muted">
                  <span className="text-term">›</span> {x}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="h-full rounded-xl border border-line bg-surface p-5">
            <div className="mb-3 font-mono text-xs uppercase tracking-wider text-faint">자격증</div>
            <ul className="flex flex-col gap-2">
              {education.cert.map((x) => (
                <li key={x} className="text-sm text-muted">
                  <span className="text-term">›</span> {x}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── footer + toast ──────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-10 text-center">
        <div className="flex flex-wrap justify-center gap-4 font-mono text-sm">
          <button className="text-muted hover:text-term" onClick={() => navigator.clipboard?.writeText(profile.emails[0])}>Gmail</button>
          <a className="text-muted hover:text-term" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="text-muted hover:text-term" href={profile.blog} target="_blank" rel="noopener noreferrer">Blog</a>
          <a className="text-muted hover:text-term" href={profile.chatforyou} target="_blank" rel="noopener noreferrer">ChatForYou</a>
        </div>
        <p className="mt-4 font-mono text-xs text-faint">© 2026 장세존 · Backend Engineer · 고객사명은 NDA로 산업군 표기</p>
      </div>
    </footer>
  )
}

function Toast() {
  const [msg, setMsg] = useState('')
  const timer = useRef(null)
  useEffect(() => {
    const handler = (e) => {
      setMsg(e.detail)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setMsg(''), 1800)
    }
    window.addEventListener('toast', handler)
    return () => window.removeEventListener('toast', handler)
  }, [])
  return (
    <div
      className={`pointer-events-none fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 rounded-lg border border-term/40 bg-term/10 px-5 py-2.5 font-mono text-sm text-term backdrop-blur transition-all duration-200 ${
        msg ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      {msg}
    </div>
  )
}

/* ── app ─────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <main>
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
      </main>
      <Footer />
      <Toast />
    </div>
  )
}
