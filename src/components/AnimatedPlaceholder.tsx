import { useEffect, useMemo, useState } from 'react'

export function AnimatedPlaceholder({ items }: { items: string[] }) {
  const list = useMemo(() => items.filter(Boolean), [items])
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (list.length <= 1) return
    const t = window.setInterval(() => {
      setIdx((v) => (v + 1) % list.length)
    }, 1800)
    return () => window.clearInterval(t)
  }, [list])

  return (
    <span className="text-white/55">
      {list[idx]}
    </span>
  )
}
