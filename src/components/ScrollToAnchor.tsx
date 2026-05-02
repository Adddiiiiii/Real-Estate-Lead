import { useEffect } from 'react'

export function ScrollToAnchor() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const a = target?.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return

      const href = a.getAttribute('href')
      if (!href || href === '#') return

      const el = document.querySelector(href)
      if (!el) return

      e.preventDefault()
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })

      // Close mobile menus that listen to this event
      window.dispatchEvent(new CustomEvent('app:navigation'))

      history.pushState(null, '', href)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
