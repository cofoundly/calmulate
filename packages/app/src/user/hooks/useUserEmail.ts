import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const atom = atomWithStorage('userEmail', '')

export const useUserEmail = () => useAtom(atom)
