import { useEffect, useRef } from 'react'

import { date } from '@/date'

export const useCalendarAutoScroll = () => {
  const container = useRef<HTMLDivElement>(null)
  const containerNav = useRef<HTMLDivElement>(null)
  const containerOffset = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!container.current || !containerNav.current || !containerOffset.current) return

    // Set the container scroll position based on the current time.
    const currentMinute = date().hour() * 60

    container.current.scrollTop =
      ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
        currentMinute) /
      (24 * 60)
  }, [])

  return {
    container,
    containerNav,
    containerOffset,
  }
}
