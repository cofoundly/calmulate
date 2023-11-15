import { atom, useAtom } from 'jotai'

const sidebarOpenAtom = atom(false)

export const useSidebarOpen = () => useAtom(sidebarOpenAtom)
