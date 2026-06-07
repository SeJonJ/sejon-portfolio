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

/* ── pdf export ──────────────────────────────────────── */
// 터미널 테마를 제외한 깔끔한 이력서 레이아웃(.print-resume)을 브라우저
// 인쇄 기능으로 PDF 저장. 저장 시 기본 파일명이 되도록 document.title 을 잠시 바꾼다.
function triggerPdf() {
  const prev = document.title
  document.title = '장세존_백엔드_이력서'
  const restore = () => {
    document.title = prev
    window.removeEventListener('afterprint', restore)
  }
  window.addEventListener('afterprint', restore)
  window.print()
}

function PdfButton({ className = '' }) {
  return (
    <button
      onClick={triggerPdf}
      title="이력서를 PDF로 저장합니다"
      className={`flex items-center gap-1.5 rounded-md border border-term/40 bg-term/10 px-3 py-1.5 font-mono text-[13px] text-term transition hover:-translate-y-0.5 hover:border-term ${className}`}
    >
      <span aria-hidden>⤓</span> PDF
    </button>
  )
}

/* ── nav ─────────────────────────────────────────────── */
const NAV = [
  ['about', 'about'],
  ['skills', 'skills'],
  ['experience', 'work'],
  ['projects', 'projects'],
  ['education', 'edu'],
]
function Nav({ onReveal }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <a href="#top" className="font-mono text-sm font-bold">
          <span className="text-term">~/</span>sejon
        </a>
        <div className="flex items-center gap-2">
          <ul className="hidden gap-1 font-mono text-[13px] sm:flex">
            {NAV.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    onReveal(id)
                  }}
                  className="rounded-md px-3 py-1.5 text-muted transition hover:bg-surface hover:text-term"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <PdfButton />
        </div>
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
/* ── interactive terminal ────────────────────────────── */
const SECTION_IDS = ['about', 'skills', 'experience', 'projects', 'education']
const COMMANDS = [
  { cmd: 'help', desc: '명령어 목록 보기' },
  { cmd: 'cat about/strengths.md', alias: ['about'], desc: '핵심 역량', section: 'about' },
  { cmd: 'skills --list', alias: ['skills'], desc: '보유 기술', section: 'skills' },
  { cmd: 'git log', alias: ['experience', 'work'], desc: '경력', section: 'experience' },
  { cmd: 'ls projects/', alias: ['projects', 'ls'], desc: '프로젝트', section: 'projects' },
  { cmd: 'cat education.txt', alias: ['education', 'edu'], desc: '학력·자격', section: 'education' },
  { cmd: 'cat resume.md', alias: ['all', 'resume', 'open'], desc: '전체 보기', all: true },
  { cmd: 'contact', desc: '연락처 출력', out: ['wkdtpwhs@gmail.com', 'wkdtpwhs@naver.com', 'github.com/SeJonJ'] },
  { cmd: 'clear', desc: '터미널 지우기' },
]
const CHIPS = ['help', 'cat about/strengths.md', 'skills --list', 'git log', 'ls projects/', 'cat education.txt', 'cat resume.md']

function flashSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  el.classList.remove('section-flash')
  void el.offsetWidth // force reflow so the animation can replay
  el.classList.add('section-flash')
  setTimeout(() => el.classList.remove('section-flash'), 1500)
}

function resolveCommand(raw) {
  const q = raw.trim().toLowerCase()
  if (!q) return null
  return (
    COMMANDS.find((c) => c.cmd.toLowerCase() === q) ||
    COMMANDS.find((c) => (c.alias || []).includes(q)) ||
    null
  )
}

function Terminal({ onReveal, onRevealAll }) {
  const [log, setLog] = useState([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [hIdx, setHIdx] = useState(-1)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [log])

  const print = (prompt, lines) => setLog((l) => [...l, { prompt, lines }])

  const run = (raw) => {
    const cmd = raw.trim()
    if (!cmd) return
    setHistory((h) => [...h, cmd])
    setHIdx(-1)
    if (cmd.toLowerCase() === 'clear') {
      setLog([])
      return
    }
    const c = resolveCommand(cmd)
    if (!c) {
      print(cmd, [
        { t: `command not found: ${cmd}`, cls: 'text-rose-400' },
        { t: "'help' 를 입력하면 사용 가능한 명령어를 볼 수 있어요.", cls: 'text-faint' },
      ])
      return
    }
    if (c.cmd === 'help') {
      print(cmd, [
        { t: '사용 가능한 명령어:', cls: 'text-muted' },
        ...COMMANDS.filter((x) => x.cmd !== 'help').map((x) => ({
          t: `  ${x.cmd.padEnd(24)} ${x.desc}`,
          cls: 'text-slate-300',
        })),
        { t: '  (아래 칩을 클릭해도 실행됩니다 · ↑↓ 로 입력 기록 탐색)', cls: 'text-faint' },
      ])
      return
    }
    const out = []
    if (c.out) c.out.forEach((o) => out.push({ t: o, cls: 'text-cyan' }))
    if (c.all) out.push({ t: '→ 전체 섹션을 표시합니다.', cls: 'text-term' })
    else if (c.section) out.push({ t: `→ ${c.section} 섹션을 표시합니다.`, cls: 'text-term' })
    print(cmd, out)
    if (c.all) onRevealAll()
    else if (c.section) onReveal(c.section)
  }

  const onKey = (e) => {
    if (e.key === 'Enter') {
      run(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const ni = hIdx < 0 ? history.length - 1 : Math.max(0, hIdx - 1)
      setHIdx(ni)
      setInput(history[ni])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (hIdx < 0) return
      const ni = hIdx + 1
      if (ni >= history.length) {
        setHIdx(-1)
        setInput('')
      } else {
        setHIdx(ni)
        setInput(history[ni])
      }
    }
  }

  return (
    <div onClick={() => inputRef.current?.focus()} className="cursor-text">
      {log.length > 0 && (
        <div
          ref={bodyRef}
          className="mt-5 max-h-60 overflow-y-auto border-t border-line pt-4 font-mono text-[13px] leading-6 no-scrollbar"
        >
          {log.map((entry, i) => (
            <div key={i} className="mb-2.5">
              <div>
                <span className="text-term">$</span> <span className="text-slate-200">{entry.prompt}</span>
              </div>
              {entry.lines.map((ln, j) => (
                <div key={j} className={`whitespace-pre-wrap ${ln.cls}`}>
                  {ln.t}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center font-mono text-sm">
        <span className="text-term">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoComplete="off"
          aria-label="terminal command input"
          placeholder="help"
          className="ml-2 w-full bg-transparent text-slate-100 caret-term outline-none placeholder:text-faint"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px]">
        {CHIPS.map((c) => (
          <button
            key={c}
            onClick={(e) => { e.stopPropagation(); run(c) }}
            className="rounded-md border border-line bg-surface2 px-2.5 py-1 text-muted transition hover:border-term hover:text-term"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}

function Hero({ onReveal, onRevealAll }) {
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

            <div className="mt-5 text-faint">
              # 장세존에 대해 더 알려드릴게요 — 명령어를 입력하거나 아래 칩을 눌러보세요. (<span className="text-term">help</span>)
            </div>
          </div>

          <Terminal onReveal={onReveal} onRevealAll={onRevealAll} />

          <div className="mt-7 flex flex-wrap gap-2.5 border-t border-line pt-6 font-mono text-[13px]">
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
function fauxHash(s) {
  let h = 0
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h.toString(16).padStart(7, '0').slice(0, 7)
}

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-5 py-16">
      <Heading cmd="git log --author=sejon">경력</Heading>
      <div className="flex flex-col gap-5">
        {experience.map((e, i) => (
          <Reveal key={e.org} delay={i * 0.05}>
            <div className="rounded-xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-term/40">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-bold text-slate-100">{e.org}</h3>
                <span className="font-mono text-xs text-cyan">{e.when}</span>
              </div>
              {e.note && <p className="mt-1 text-xs text-faint">{e.note}</p>}
              <ul className="mt-4 flex flex-col gap-1.5">
                {e.items.map(([head, body]) => (
                  <li
                    key={head}
                    className="group/item rounded-r-md border-l-2 border-line py-1.5 pl-4 transition-all duration-200 hover:border-term hover:bg-surface2/50"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs text-faint transition-colors group-hover/item:text-term">●</span>
                      <span className="text-sm font-semibold text-slate-200 transition-colors group-hover/item:text-term">
                        {head}
                      </span>
                      <span className="ml-auto hidden shrink-0 font-mono text-[10px] text-faint opacity-0 transition-opacity duration-300 group-hover/item:opacity-100 sm:block">
                        commit {fauxHash(head)}
                      </span>
                    </div>
                    {body && <div className="mt-1 pl-5 text-sm leading-relaxed text-muted">{body}</div>}
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

/* ── print / pdf resume (terminal theme 제외, 내용 동일) ── */
function PrintResume() {
  return (
    <div className="print-resume" aria-hidden>
      <header className="pr-head">
        <div className="pr-head-top">
          <div className="pr-id">
            <h1>{profile.name}</h1>
            <div className="pr-role">{profile.role}</div>
          </div>
          <div className="pr-contact">
            <div>{profile.emails[0]}</div>
            <div>{profile.emails[1]}</div>
            <div>{profile.github.replace('https://', '')}</div>
            <div>{profile.blog.replace('https://', '')}</div>
          </div>
        </div>
        <p className="pr-summary">{profile.summary}</p>
      </header>

      <section className="pr-sec">
        <h2>핵심 역량</h2>
        <div className="pr-grid2">
          {strengths.map((s) => (
            <div key={s.t} className="pr-card">
              <b>{s.t}</b>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pr-sec">
        <h2>보유 기술</h2>
        <div className="pr-skills">
          {skills.map((g) => (
            <div key={g.group} className="pr-skill-row">
              <span className="pr-skill-group">{g.group}</span>
              <span className="pr-skill-items">
                {g.items.map(([name, lvl], i) => (
                  <span key={name} className="pr-skill">
                    {name}
                    <span className="pr-lvl">
                      <span className="on">{'▰'.repeat(lvl)}</span>
                      <span className="off">{'▰'.repeat(3 - lvl)}</span>
                    </span>
                    {i < g.items.length - 1 ? <span className="pr-dot"> · </span> : null}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="pr-sec">
        <h2>경력</h2>
        {experience.map((e) => (
          <div key={e.org} className="pr-exp">
            <div className="pr-exp-head">
              <b>{e.org}</b>
              <span className="pr-when">{e.when}</span>
            </div>
            {e.note && <div className="pr-note">{e.note}</div>}
            <ul>
              {e.items.map(([head, body]) => (
                <li key={head}>
                  <b>{head}</b>
                  {body && <span className="pr-body"> — {body}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="pr-sec">
        <h2>프로젝트</h2>
        {projects.map((p) => (
          <div key={p.name} className="pr-proj">
            <div className="pr-exp-head">
              <b>{p.name}</b>
              <span className="pr-when">{p.meta.join(' · ')}</span>
            </div>
            <div className="pr-one">{p.one}</div>
            <p className="pr-body">{p.desc}</p>
            {p.feats.length > 0 && (
              <ul>
                {p.feats.map(([t, d]) => (
                  <li key={t}>
                    <b>{t}</b> — {d}
                  </li>
                ))}
              </ul>
            )}
            {p.troubles?.length > 0 && (
              <div className="pr-trouble">
                <b>TROUBLESHOOTING</b>
                <ul>
                  {p.troubles.map(([t, d]) => (
                    <li key={t}>
                      <b>{t}</b> — {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="pr-stack">{p.stack.join('  ·  ')}</div>
          </div>
        ))}
      </section>

      <section className="pr-sec">
        <h2>학력 &amp; 자격</h2>
        <div className="pr-grid2">
          <div className="pr-card">
            <b>학력 / 교육</b>
            <ul>
              {education.edu.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="pr-card">
            <b>자격증</b>
            <ul>
              {education.cert.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ── app ─────────────────────────────────────────────── */
function useIsDesktop() {
  const query = '(min-width: 768px)'
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : true)
  const [desktop, setDesktop] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = () => setDesktop(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return desktop
}

function DesktopHint() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-28 text-center">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="font-mono text-sm text-faint"
      >
        ↑ 위 터미널에서 명령어를 실행하거나 칩을 클릭하면 내용이 여기에 나타납니다.
      </motion.p>
      <p className="mt-3 font-mono text-xs text-faint/70">
        예: <span className="text-term">cat about/strengths.md</span> · <span className="text-term">ls projects/</span> ·{' '}
        <span className="text-term">cat resume.md</span> (전체)
      </p>
    </div>
  )
}

export default function App() {
  const isDesktop = useIsDesktop()
  const [revealed, setRevealed] = useState(() => new Set())
  const [pending, setPending] = useState(null)

  const reveal = (id) => {
    if (!isDesktop) {
      flashSection(id)
      return
    }
    setRevealed((s) => (s.has(id) ? s : new Set(s).add(id)))
    setPending(id)
  }
  const revealAll = () => {
    if (!isDesktop) {
      flashSection('about')
      return
    }
    setRevealed(new Set(SECTION_IDS))
    setPending('about')
  }

  useEffect(() => {
    if (!pending) return
    const t = setTimeout(() => {
      flashSection(pending)
      setPending(null)
    }, 90)
    return () => clearTimeout(t)
  }, [pending, revealed])

  const show = (id) => !isDesktop || revealed.has(id)

  return (
    <>
      <div className="screen-root min-h-screen">
        <Nav onReveal={reveal} />
        <Hero onReveal={reveal} onRevealAll={revealAll} />
        <main>
          {isDesktop && revealed.size === 0 && <DesktopHint />}
          {show('about') && <About />}
          {show('skills') && <Skills />}
          {show('experience') && <Experience />}
          {show('projects') && <Projects />}
          {show('education') && <Education />}
        </main>
        <Footer />
        <Toast />
      </div>
      <PrintResume />
    </>
  )
}
