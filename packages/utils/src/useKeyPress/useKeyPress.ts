import { useEffect } from 'react'

export const useKeyPress = (key: string, cb: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    const onKeyup = (event: KeyboardEvent) => {
      if (event.key === key) {
        cb(event)
      }
    }

    window.addEventListener('keyup', onKeyup)

    return () => window.removeEventListener('keyup', onKeyup)
  }, [cb, key])
}
