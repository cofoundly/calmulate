import { atom, useAtom } from 'jotai'

import { date } from '@/date'

import { Metric } from '../models'

type MetricSidebar = {
  open: boolean
  metric: Metric | null
  date: date.Dayjs | null
}

const metricSidebarAtom = atom<MetricSidebar>({
  open: false,
  metric: null,
  date: null,
})

export const useMetricSidebar = () => useAtom(metricSidebarAtom)
