import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const atom = atomWithStorage('iCalCalendarUrl', '')

export const useICalCalendarUrl = () => useAtom(atom)
