export function TopBar({ phone }: { phone: string }) {
  return (
    <div className="bg-[#0B1624] text-[#FAF8F5]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-[#C9A84C]" />
          <p className="opacity-95">
            Limited Listings on Ghodbunder Road — <span className="text-[#C9A84C]">Enquire Today!</span>
          </p>
        </div>
        <a
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-medium hover:bg-white/10"
          href={`tel:${phone}`}
        >
          Call: {phone}
        </a>
      </div>
    </div>
  )
}
