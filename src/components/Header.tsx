import { useEffect, useMemo, useState } from 'react'
import { PhoneCall, Menu, X } from 'lucide-react'
import { cn } from '../lib/utils'
import { navLinks } from '../lib/data'

export function Header({
  phone,
  onConsult,
}: {
  phone: string
  onConsult: () => void
}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('app:navigation', close as EventListener)
    return () => window.removeEventListener('app:navigation', close as EventListener)
  }, [])

  const items = useMemo(() => navLinks, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-[#0D1B2A]/70',
        scrolled ? 'shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)]' : '',
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 transition-all',
          scrolled ? 'py-3' : 'py-4',
        )}
      >
        <a href="#home" className="group flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#C9A84C] text-[#0D1B2A]">
            <span className="font-serif text-lg leading-none">RB</span>
          </div>
          <div className="leading-tight">
            <div className="font-serif text-base text-[#FAF8F5] sm:text-lg">
              R.B. Estate Agency
            </div>
            <div className="text-xs text-white/70">Trusted Property Consultancy • Since 1990</div>
          </div>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {items.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-sm font-medium text-white/80 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${phone}`}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white/90 hover:bg-white/10"
          >
            <PhoneCall className="h-4 w-4" />
            <span className="hidden xl:inline">{phone}</span>
            <span className="xl:hidden">Call</span>
          </a>
          <button
            onClick={onConsult}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#C9A84C] px-5 text-sm font-bold text-[#0D1B2A] shadow-[0_12px_30px_-18px_rgba(201,168,76,0.8)] transition-transform hover:scale-[1.02]"
          >
            Get Free Consultation
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 lg:hidden"
          aria-label="Open menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          'lg:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <div className="mx-auto max-w-6xl px-4 pb-4">
          <div className="rounded-2xl border border-white/10 bg-[#0D1B2A] p-4">
            <div className="grid gap-1">
              {items.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-white/90 hover:bg-white/5"
                >
                  {l.label}
                  <span className="text-white/40">→</span>
                </a>
              ))}
            </div>
            <div className="mt-4 grid gap-2">
              <a
                href={`tel:${phone}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 text-sm font-bold text-white hover:bg-white/10"
              >
                <PhoneCall className="h-4 w-4" />
                Call {phone}
              </a>
              <button
                onClick={() => {
                  setOpen(false)
                  onConsult()
                }}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#C9A84C] text-sm font-extrabold text-[#0D1B2A]"
              >
                Get Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
