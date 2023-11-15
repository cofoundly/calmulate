import { useCallback } from 'react'

export const useLink = () => {
  const link = useCallback((to: string, target?: string) => {
    window.open(to, target)
  }, [])

  return link
}
