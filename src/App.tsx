import { useMemo, useState } from 'react'
import {
  Building2,
  Scale,
  BadgeCheck,
  ShieldCheck,
  Languages,
  Handshake,
  MapPin,
  Search,
  Star,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { AnimatedPlaceholder } from './components/AnimatedPlaceholder'
import { Carousel } from './components/Carousel'
import { Header } from './components/Header'
import { Odometer } from './components/Odometer'
import { ScrollToAnchor } from './components/ScrollToAnchor'
import { TopBar } from './components/TopBar'
import { blogPosts, coverageChips, properties, testimonials } from './lib/data'
import { cn, clamp } from './lib/utils'

type LeadForm = {
  name: string
  phone: string
  email: string
  propertyType: string
  intent: string
  location: string
  message: string
}

const AGENCY = {
  name: 'R.B. Estate Agency',
  since: 1990,
  years: 35,
  rating: 4.8,
  reviews: 1400,
  rank: 'Top 3 Real Estate Agent in Thane',
  phoneDisplay: '+91 91372 11351',
  phoneTel: '+919137211351',
  address:
    'Mayuresh Apartment, Ram Mandir Road, Ghodbunder Road, Kasarvadavali, Thane West 400615 (Opp. HyperCity)',
  hours: 'Mon–Sat • 9:00 AM – 7:00 PM',
  mapEmbed:
    'https://www.google.com/maps?q=Kasarvadavali%2C%20Thane%20West%20400615&output=embed',
  whatsappPrefill:
    'Hello R.B. Estate Agency — I want a free consultation for a property in Thane (Ghodbunder Road/Thane West). Please call me back.',
}

function SectionHeading({
  eyebrow,
  title,
  desc,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  desc?: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left')}>
      {eyebrow ? (
        <div className="text-xs font-bold tracking-[0.22em] text-[#E07B39]">
          {eyebrow.toUpperCase()}
        </div>
      ) : null}
      <h2 className="mt-3 font-serif text-3xl leading-tight text-[#0D1B2A] sm:text-4xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-[15px] leading-relaxed text-black/70 sm:text-[17px]">
          {desc}
        </p>
      ) : null}
    </div>
  )
}

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm font-semibold text-black/75">
      <MapPin className="mr-1.5 h-4 w-4 text-[#E07B39]" />
      {label}
    </span>
  )
}

export default function App() {
  const [propertyFilter, setPropertyFilter] = useState<'All' | 'Buy' | 'Rent' | 'Commercial'>('All')
  const [toast, setToast] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [lead, setLead] = useState<LeadForm>({
    name: '',
    phone: '',
    email: '',
    propertyType: 'Apartment',
    intent: 'Buy',
    location: 'Thane West',
    message: '',
  })

  const filteredProperties = useMemo(() => {
    if (propertyFilter === 'All') return properties
    return properties.filter((p) => p.badge === propertyFilter)
  }, [propertyFilter])

  const openWhatsApp = () => {
    const txt = encodeURIComponent(AGENCY.whatsappPrefill)
    const url = `https://wa.me/${AGENCY.phoneTel.replace(/\D/g, '')}?text=${txt}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const scrollToConsult = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault()
    const nameOk = lead.name.trim().length >= 2
    const phoneOk = lead.phone.replace(/\D/g, '').length >= 10

    if (!nameOk || !phoneOk) {
      setToast('Please enter your name and a valid phone number.')
      window.setTimeout(() => setToast(null), 2600)
      return
    }
    setLoading(true)

    const msg = `Lead Request — ${AGENCY.name}
    Name: ${lead.name}
    Phone: ${lead.phone}
    ${lead.email ? `Email: ${lead.email}` : ''}
    Property Type: ${lead.propertyType}
    Intent: ${lead.intent}
    Location: ${lead.location}
    ${lead.message ? `Message: ${lead.message}` : ''}`

    const url = `https://wa.me/${AGENCY.phoneTel.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`
    
    window.open(url, '_blank', 'noopener,noreferrer')
    setToast("Thanks! We'll reach out within 24 hours.")
    window.setTimeout(() => setToast(null), 3000)
    setLead({
      name: '',
      phone: '',
      email: '',
      propertyType: 'Apartment',
      intent: 'Buy',
      location: '',
      message: ''
    })
    if (!url) {
      alert("Something went wrong. Please call us directly.");
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <ScrollToAnchor />
      <TopBar phone={AGENCY.phoneDisplay} />
      <Header phone={AGENCY.phoneDisplay} onConsult={scrollToConsult} />

      {/* HERO */}
      <section id="home" className="relative min-h-[92vh]">
        <div className="absolute inset-0">
          <img
            src="/images/thane-skyline.jpg"
            alt="Thane skyline"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/85 via-[#0D1B2A]/65 to-[#0D1B2A]" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col justify-end px-4 pb-10 pt-12 sm:pb-14 lg:pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/85">
              <BadgeCheck className="h-4 w-4 text-[#C9A84C]" />
              Rated {AGENCY.rating}★ • {AGENCY.reviews.toLocaleString('en-IN')}+ verified reviews • {AGENCY.rank}
            </div>
            <h1 className="mt-5 font-serif text-[36px] leading-[1.05] text-[#FAF8F5] sm:text-[52px] lg:text-[60px]">
              Thane&apos;s Most Trusted Property Experts — Since 1990.
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/80 sm:text-[18px]">
              Helping families buy, sell, rent & invest for {AGENCY.years} years across Thane West and the Ghodbunder Road corridor.
            </p>

            {/* Search */}
            <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
              <div className="grid gap-3 md:grid-cols-12">
                <div className="md:col-span-3">
                  <label className="mb-1 block text-xs font-bold tracking-wide text-white/70">
                    Property Type
                  </label>
                  <select
                    className="focus-ring h-12 w-full rounded-xl border border-white/10 bg-[#0D1B2A]/60 px-3 text-sm font-semibold text-white"
                    value={lead.propertyType}
                    onChange={(e) => setLead((v) => ({ ...v, propertyType: e.target.value }))}
                  >
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Shop / Retail</option>
                    <option>Office</option>
                    <option>Industrial</option>
                    <option>Agricultural</option>
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="mb-1 block text-xs font-bold tracking-wide text-white/70">
                    Transaction
                  </label>
                  <select
                    className="focus-ring h-12 w-full rounded-xl border border-white/10 bg-[#0D1B2A]/60 px-3 text-sm font-semibold text-white"
                    value={lead.intent}
                    onChange={(e) => setLead((v) => ({ ...v, intent: e.target.value }))}
                  >
                    <option>Buy</option>
                    <option>Sell</option>
                    <option>Rent</option>
                    <option>Invest</option>
                  </select>
                </div>
                <div className="md:col-span-4">
                  <label className="mb-1 block text-xs font-bold tracking-wide text-white/70">
                    Location
                  </label>
                  <div className="relative">
                    <input
                      className="focus-ring h-12 w-full rounded-xl border border-white/10 bg-[#0D1B2A]/60 px-3 pr-10 text-sm font-semibold text-white placeholder:text-white/40"
                      value={lead.location}
                      onChange={(e) => setLead((v) => ({ ...v, location: e.target.value }))}
                      placeholder="Kasarvadavali, Manpada, Majiwada..."
                    />
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/45">
                      <AnimatedPlaceholder
                        items={['Kasarvadavali', 'Ghodbunder Rd', 'Hiranandani Estate', 'Manpada', 'Majiwada']}
                      />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-bold tracking-wide text-white/70">
                    &nbsp;
                  </label>
                  <button
                    onClick={scrollToConsult}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#C9A84C] px-4 text-sm font-extrabold text-[#0D1B2A] transition-transform hover:scale-[1.02]"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Trust strip */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[{ a: '35 Years', b: 'Established 1990' }, { a: '4.8★ Rated', b: 'Trusted reviews' }, { a: '1,400+ Families', b: 'Thane clientele' }].map(
                (t) => (
                  <div
                    key={t.a}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div className="text-lg font-extrabold text-white">{t.a}</div>
                    <div className="text-xs font-semibold tracking-wide text-white/65">{t.b}</div>
                  </div>
                ),
              )}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={scrollToConsult}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#C9A84C] px-6 text-sm font-extrabold text-[#0D1B2A] transition-transform hover:scale-[1.02]"
              >
                Get Free Consultation
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-bold text-white hover:bg-white/10"
                href={`tel:${AGENCY.phoneTel}`}
              >
                <PhoneCall className="h-4 w-4" />
                Click to Call
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#0B1624]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-10 sm:grid-cols-4">
          {[{ v: 35, s: '+', l: 'Years' }, { v: 1400, s: '+', l: 'Clients Served' }, { v: 48, s: '', l: '4.8★ Rating' }, { v: 100, s: '%', l: 'All Property Types' }].map(
            (x) => (
              <div key={x.l} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-extrabold text-white">
                  <Odometer value={x.v} suffix={x.s} />
                </div>
                <div className="mt-1 text-xs font-semibold tracking-wide text-white/70">
                  {x.l}
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-pad">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]">
                <img
                  src="/images/about-building.jpg"
                  alt="Thane apartments"
                  className="h-[360px] w-full object-cover sm:h-[460px]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0D1B2A]/25 via-transparent to-transparent" />
              </div>
            </div>
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="About"
                title="Rooted in Thane. Built on Trust."
                desc="Since 1990, R.B. Estate Agency has helped buyers, sellers, landlords, and investors make confident decisions with honest advice, strong local knowledge, and end‑to‑end support."
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, t: 'Transparent Dealings', d: 'Clear pricing & process.' },
                  { icon: MapPin, t: 'Local Expertise', d: 'Ghodbunder micro-markets.' },
                  { icon: Handshake, t: 'Full Support', d: 'Visits, paperwork, closure.' },
                ].map((f) => (
                  <div
                    key={f.t}
                    className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm"
                  >
                    <f.icon className="h-5 w-5 text-[#E07B39]" />
                    <div className="mt-3 text-sm font-extrabold text-[#0D1B2A]">{f.t}</div>
                    <div className="mt-1 text-xs font-semibold text-black/60">{f.d}</div>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-black/10 bg-[#FAF8F5] p-5">
                <div className="text-sm font-extrabold text-[#0D1B2A]">Our promise</div>
                <ul className="mt-3 grid gap-2 text-sm text-black/70">
                  {[
                    'Shortlists tailored to your budget, needs & timeline.',
                    'Guidance for documentation, legal checks & agreements.',
                    'A calm, professional process — no pressure selling.',
                  ].map((x) => (
                    <li key={x} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#C9A84C]" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={scrollToConsult}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#0D1B2A] px-6 text-sm font-extrabold text-[#FAF8F5] transition-transform hover:scale-[1.02]"
                >
                  Book Free Consultation
                </button>
                <button
                  onClick={openWhatsApp}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 text-sm font-extrabold text-[#0D1B2A] hover:bg-black/[0.02]"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  WhatsApp Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Services"
            title="Complete support for buyers, sellers, tenants & investors"
            desc="From discovery to closure — site visits, shortlisting, negotiations, documentation and agreements."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Building2, t: 'Buying', d: 'Shortlists, visits, negotiation & closing support.' },
              { icon: Handshake, t: 'Selling', d: 'Pricing guidance, listing, buyer screening & deal closure.' },
              { icon: BadgeCheck, t: 'Rental', d: 'Tenant sourcing, verification & agreement coordination.' },
              { icon: Scale, t: 'Commercial', d: 'Retail/office requirements with location intelligence.' },
              { icon: ShieldCheck, t: 'Industrial / Agricultural', d: 'Land, warehousing and compliance-aware guidance.' },
              { icon: Star, t: 'Free Valuation', d: 'Know your property’s market value with local comparables.' },
            ].map((s) => (
              <div
                key={s.t}
                className="group rounded-3xl border border-black/10 bg-[#FAF8F5] p-5 shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0D1B2A] text-[#C9A84C]">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <button
                    onClick={scrollToConsult}
                    className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-extrabold text-[#0D1B2A] hover:bg-black/[0.03]"
                  >
                    Know More <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-4 text-lg font-extrabold text-[#0D1B2A]">{s.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-black/70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section id="properties" className="section-pad">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Properties"
              title="Curated opportunities across Thane West"
              desc="Swipe through featured listings. Enquire to get matching options based on your budget and intent."
            />
            <div className="flex flex-wrap gap-2">
              {(['All', 'Buy', 'Rent', 'Commercial'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setPropertyFilter(f)}
                  className={cn(
                    'h-10 rounded-full px-4 text-sm font-extrabold',
                    propertyFilter === f
                      ? 'bg-[#0D1B2A] text-[#FAF8F5]'
                      : 'border border-black/10 bg-white text-[#0D1B2A] hover:bg-black/[0.02]',
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Carousel
              items={filteredProperties}
              speedMs={3000}
              render={(p) => (
                <div className="w-[290px] sm:w-[340px]">
                  <div className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-transform hover:-translate-y-1">
                    <div className="relative">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-44 w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute left-3 top-3 rounded-full bg-[#0D1B2A] px-3 py-1 text-xs font-extrabold text-[#FAF8F5]">
                        {p.badge}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-base font-extrabold text-[#0D1B2A]">{p.title}</div>
                      <div className="mt-1 text-sm font-semibold text-black/60">{p.location}</div>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="text-sm font-extrabold text-[#E07B39]">{p.priceLabel}</div>
                        <button
                          onClick={() => {
                            setLead((v) => ({
                              ...v,
                              intent: p.badge === 'Rent' ? 'Rent' : p.badge === 'Buy' ? 'Buy' : 'Invest',
                              message: `Interested in: ${p.title} (${p.location}). Please share details.`,
                            }))
                            scrollToConsult()
                          }}
                          className="inline-flex h-10 items-center justify-center rounded-full bg-[#C9A84C] px-4 text-xs font-extrabold text-[#0D1B2A] transition-transform hover:scale-[1.02]"
                        >
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={scrollToConsult}
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-extrabold text-[#0D1B2A] hover:bg-black/[0.02]"
            >
              View All Properties
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Experience you can rely on — advice you can trust"
            desc="A premium, transparent and locally-rooted service designed for confident decisions."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BadgeCheck, t: '35 Yrs Expertise', d: 'Deep local track record.' },
              { icon: Star, t: '1,400+ Reviews', d: 'Verified client trust.' },
              { icon: Handshake, t: 'Honest Advice', d: 'No pressure selling.' },
              { icon: Scale, t: 'Legal Help', d: 'Docs, checks, agreements.' },
              { icon: Building2, t: 'Wide Network', d: 'Builders & resale options.' },
              { icon: ShieldCheck, t: 'All Types', d: 'Residential to industrial.' },
              { icon: Languages, t: 'Multilingual Team', d: 'Comfortable communication.' },
              { icon: CheckCircle2, t: 'Free Consultation', d: 'Match requirements faster.' },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-3xl border border-black/10 bg-[#FAF8F5] p-5 shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-[#0D1B2A] shadow-sm">
                  <x.icon className="h-5 w-5 text-[#E07B39]" />
                </div>
                <div className="mt-4 text-sm font-extrabold text-[#0D1B2A]">{x.t}</div>
                <div className="mt-1 text-xs font-semibold text-black/60">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="section-pad">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Testimonials"
            title="4.8★ rated by Thane clients"
            desc="A few words from buyers, sellers, and landlords we’ve supported across Thane West."
          />
          <div className="mt-10">
            <Carousel
              items={testimonials}
              speedMs={3000}
              className="pb-1"
              render={(t) => (
                <div className="w-[320px] sm:w-[380px]">
                  <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-extrabold text-[#0D1B2A]">{t.name}</div>
                        <div className="text-xs font-semibold text-black/55">{t.locality} • {t.source}</div>
                      </div>
                      <div className="flex items-center gap-1 text-[#C9A84C]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-black/70">“{t.text}”</p>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </section>

      {/* LEAD FORM */}
      <section id="contact" className="relative">
        <div className="absolute inset-0">
          <img
            src="/images/consultation.jpg"
            alt="Consultation"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#0D1B2A]/80" />
        </div>
        <div className="relative section-pad">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <SectionHeading
                  eyebrow="Free Consultation"
                  title="Tell us what you need. We’ll call within 24 hours."
                  desc="Buy, sell, rent or invest — get clear guidance and matched listings in Thane West and Ghodbunder Road."
                />
                <div className="mt-6 grid gap-3">
                  {[
                    'No spam. Your contact stays private.',
                    'Shortlists + site visit planning based on your intent.',
                    'Transparent process and paperwork support.',
                  ].map((x) => (
                    <div key={x} className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/85">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#C9A84C]" />
                      <div className="text-sm font-semibold">{x}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#C9A84C] px-6 text-sm font-extrabold text-[#0D1B2A] transition-transform hover:scale-[1.02]"
                    href={`tel:${AGENCY.phoneTel}`}
                  >
                    <PhoneCall className="h-4 w-4" />
                    Call Now
                  </a>
                  <button
                    onClick={openWhatsApp}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-extrabold text-white hover:bg-white/10"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7">
                  <form
                    onSubmit={submitLead}
                    className="rounded-3xl border border-white/10 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-bold tracking-wide text-black/60">Name *</label>
                        <input
                          className="focus-ring h-12 w-full rounded-xl border border-black/10 bg-[#FAF8F5] px-3 text-sm font-semibold"
                          value={lead.name}
                          onChange={(e) => setLead((v) => ({ ...v, name: e.target.value }))}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold tracking-wide text-black/60">Phone *</label>
                        <input
                          className="focus-ring h-12 w-full rounded-xl border border-black/10 bg-[#FAF8F5] px-3 text-sm font-semibold"
                          value={lead.phone}
                          onChange={(e) => setLead((v) => ({ ...v, phone: e.target.value }))}
                          placeholder="10-digit mobile number"
                          inputMode="tel"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold tracking-wide text-black/60">Email (optional)</label>
                        <input
                          className="focus-ring h-12 w-full rounded-xl border border-black/10 bg-[#FAF8F5] px-3 text-sm font-semibold"
                          value={lead.email}
                          onChange={(e) => setLead((v) => ({ ...v, email: e.target.value }))}
                          placeholder="name@email.com"
                          inputMode="email"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold tracking-wide text-black/60">Property Type</label>
                        <select
                          className="focus-ring h-12 w-full rounded-xl border border-black/10 bg-[#FAF8F5] px-3 text-sm font-semibold"
                          value={lead.propertyType}
                          onChange={(e) => setLead((v) => ({ ...v, propertyType: e.target.value }))}
                        >
                          <option>Apartment</option>
                          <option>Villa</option>
                          <option>Shop / Retail</option>
                          <option>Office</option>
                          <option>Industrial</option>
                          <option>Agricultural</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold tracking-wide text-black/60">Intent</label>
                        <select
                          className="focus-ring h-12 w-full rounded-xl border border-black/10 bg-[#FAF8F5] px-3 text-sm font-semibold"
                          value={lead.intent}
                          onChange={(e) => setLead((v) => ({ ...v, intent: e.target.value }))}
                        >
                          <option>Buy</option>
                          <option>Sell</option>
                          <option>Rent</option>
                          <option>Invest</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-bold tracking-wide text-black/60">Location</label>
                        <input
                          className="focus-ring h-12 w-full rounded-xl border border-black/10 bg-[#FAF8F5] px-3 text-sm font-semibold"
                          value={lead.location}
                          onChange={(e) => setLead((v) => ({ ...v, location: e.target.value }))}
                          placeholder="Thane West / Ghodbunder Road"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="mb-1 block text-xs font-bold tracking-wide text-black/60">Message</label>
                      <textarea
                        className="focus-ring min-h-28 w-full rounded-xl border border-black/10 bg-[#FAF8F5] px-3 py-3 text-sm font-semibold"
                        value={lead.message}
                        onChange={(e) => setLead((v) => ({ ...v, message: e.target.value }))}
                        placeholder="Budget, preferred society, carpet area, move-in date, etc."
                      />
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex h-12 items-center justify-center rounded-xl bg-[#C9A84C] px-6 text-sm font-extrabold text-[#0D1B2A] transition-transform hover:scale-[1.02]"
                      >
                        {loading ? "Submitting..." : "Request Free Consultation"}
                      </button>
                      <div className="text-xs font-semibold text-black/55">
                        We&apos;ll call within 24 hours. <span className="font-extrabold">No spam.</span>
                      </div>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP + COVERAGE */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Coverage"
            title="Thane West specialists — especially Ghodbunder Road"
            desc="Meet us near Kasarvadavali (Opp. HyperCity). We cover key micro-markets and connect you to the right options faster."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-3xl border border-black/10 bg-[#FAF8F5]">
                <iframe
                  title="R.B. Estate Agency map"
                  src={AGENCY.mapEmbed}
                  className="h-[360px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-black/10 bg-[#FAF8F5] p-6">
                <div className="text-sm font-extrabold text-[#0D1B2A]">Areas we regularly serve</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {coverageChips.map((c) => (
                    <Chip key={c} label={c} />
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4">
                  <div className="text-xs font-bold tracking-wide text-black/55">OFFICE ADDRESS</div>
                  <div className="mt-2 text-sm font-extrabold text-[#0D1B2A]">{AGENCY.address}</div>
                  <div className="mt-3 text-xs font-semibold text-black/60">{AGENCY.hours}</div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <a
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0D1B2A] px-4 text-sm font-extrabold text-white"
                      href={`tel:${AGENCY.phoneTel}`}
                    >
                      <PhoneCall className="h-4 w-4" />
                      Call
                    </a>
                    <button
                      onClick={openWhatsApp}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-sm font-extrabold text-[#0D1B2A]"
                    >
                      <MessageCircle className="h-4 w-4 text-[#25D366]" />
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Insights"
            title="Practical guides for confident decisions"
            desc="Short reads for first-time buyers, NRI investors, and landlords in Thane."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((p) => (
              <article
                key={p.id}
                className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-transform hover:-translate-y-1"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <div className="text-xs font-bold tracking-wide text-black/45">{p.date}</div>
                  <div className="mt-2 text-base font-extrabold text-[#0D1B2A]">{p.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">{p.excerpt}</p>
                  <button
                    onClick={scrollToConsult}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#E07B39]"
                  >
                    Read More <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B1624] text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#C9A84C] text-[#0D1B2A]">
                  <span className="font-serif text-lg">RB</span>
                </div>
                <div>
                  <div className="font-serif text-lg">{AGENCY.name}</div>
                  <div className="text-xs font-semibold text-white/65">Trusted since 1990 • Thane West</div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Premium property consultancy for buyers, sellers, tenants and investors across Ghodbunder Road and Thane West.
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={openWhatsApp}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-extrabold hover:bg-white/10"
                >
                  WhatsApp
                </button>
                <a
                  href={`tel:${AGENCY.phoneTel}`}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-[#C9A84C] px-4 text-sm font-extrabold text-[#0D1B2A]"
                >
                  Call
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm font-extrabold">Quick Links</div>
              <div className="mt-3 grid gap-2 text-sm text-white/70">
                {[
                  ['Home', '#home'],
                  ['About', '#about'],
                  ['Services', '#services'],
                  ['Properties', '#properties'],
                  ['Testimonials', '#testimonials'],
                  ['Contact', '#contact'],
                ].map(([t, href]) => (
                  <a key={href} href={href} className="hover:text-white">
                    {t}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-extrabold">Office</div>
              <div className="mt-3 space-y-2 text-sm text-white/70">
                <div>{AGENCY.address}</div>
                <a className="inline-flex items-center gap-2 hover:text-white" href={`tel:${AGENCY.phoneTel}`}>
                  <PhoneCall className="h-4 w-4 text-[#C9A84C]" /> {AGENCY.phoneDisplay}
                </a>
                <div className="text-xs font-semibold text-white/60">{AGENCY.hours}</div>
              </div>
            </div>

            <div>
              <div className="text-sm font-extrabold">Property Types</div>
              <div className="mt-3 grid gap-2 text-sm text-white/70">
                {['Apartments', 'Resale', 'Rental', 'Commercial', 'Industrial', 'Agricultural'].map((x) => (
                  <div key={x}>{x}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/60">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                © {new Date().getFullYear()} {AGENCY.name}. All rights reserved.
              </div>
              <div>
                RERA Disclaimer: Property availability, pricing and approvals are subject to change. Please verify documents and RERA details before payment.
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <motion.button
        onClick={openWhatsApp}
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)]"
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 1.1,
          repeat: Infinity,
          repeatDelay: 8,
          ease: 'easeInOut',
        }}
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* MOBILE STICKY BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/10 bg-white/95 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <a
            href={`tel:${AGENCY.phoneTel}`}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#0D1B2A] text-sm font-extrabold text-white"
          >
            <PhoneCall className="h-4 w-4" />
            Call
          </a>
          <button
            onClick={openWhatsApp}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-extrabold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </button>
        </div>
      </div>

      {/* TOAST */}
      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            className="fixed left-1/2 top-24 z-[60] w-[min(560px,92vw)] -translate-x-1/2 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-[#0D1B2A] shadow-lg"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="h-16 lg:hidden" />
    </div>
  )
}
