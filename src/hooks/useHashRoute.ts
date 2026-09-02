import { useEffect, useState } from 'react'

export function useHashRoute(target: string): boolean {
  const [isActive, setIsActive] = useState(() => window.location.hash === target)

  useEffect(() => {
    const onHashChange = (): void => {
      setIsActive(window.location.hash === target)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [target])

  return isActive
}
