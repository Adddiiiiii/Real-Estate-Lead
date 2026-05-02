import { useEffect, useMemo, useRef } from 'react'
import { cn } from '../lib/utils'

export function Carousel<T>({
  items,
  render,
  speedMs = 3000,
  className,
}: {
  items: T[]
  render: (item: T, index: number) => React.ReactNode
  speedMs?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const data = useMemo(() => items, [items])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let paused = false
    let timer = 0

    const step = () => {
      if (paused) return
      el.scrollBy({ left: el.clientWidth * 0.75, behavior: 'smooth' })
      // Loop to start
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      }
    }

    const start = () => {
      timer = window.setInterval(step, speedMs)
    }

    const onEnter = () => {
      paused = true
    }
    const onLeave = () => {
      paused = false
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('touchstart', onEnter, { passive: true })
    el.addEventListener('touchend', onLeave)

    start()

    return () => {
      window.clearInterval(timer)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('touchstart', onEnter)
      el.removeEventListener('touchend', onLeave)
    }
  }, [speedMs])

  return (
    <div
      ref={ref}
      className={cn(
        'flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {data.map((it, idx) => (
        <div key={idx} className="snap-start">
          {render(it, idx)}
        </div>
      ))}
    </div>
  )
}
