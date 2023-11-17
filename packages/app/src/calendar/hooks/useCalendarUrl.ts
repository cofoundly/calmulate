import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const atom = atomWithStorage('calendarUrl', '')

export const useCalendarUrl = () => useAtom(atom)
