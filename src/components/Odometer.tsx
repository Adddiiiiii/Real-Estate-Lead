import { useEffect, useRef, useState } from 'react'

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true)
      },
      { threshold: 0.35 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, inView }
}

export function Odometer({
  value,
  suffix,
}: {
  value: number
  suffix?: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 900
    const start = performance.now()
    const from = 0
    const to = value

    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(from + (to - from) * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <div ref={ref} className="tabular-nums">
      {display.toLocaleString('en-IN')}
      {suffix ?? ''}
    </div>
  )
}
