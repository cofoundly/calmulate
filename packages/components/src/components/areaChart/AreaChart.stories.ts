import type { Meta, StoryObj } from '@storybook/react'

import { AreaChart } from './AreaChart'

const meta = {
  title: 'AreaChart',
  component: AreaChart,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AreaChart>

export default meta

const CHART_DATA = [
  {
    date: 'Jan 22',
    SemiAnalysis: 2890,
    'The Pragmatic Engineer': 2338,
  },
  {
    date: 'Feb 22',
    SemiAnalysis: 2756,
    'The Pragmatic Engineer': 2103,
  },
  {
    date: 'Mar 22',
    SemiAnalysis: 3322,
    'The Pragmatic Engineer': 2194,
  },
  {
    date: 'Apr 22',
    SemiAnalysis: 3470,
    'The Pragmatic Engineer': 2108,
  },
  {
    date: 'May 22',
    SemiAnalysis: 3475,
    'The Pragmatic Engineer': 1812,
  },
  {
    date: 'Jun 22',
    SemiAnalysis: 3129,
    'The Pragmatic Engineer': 1726,
  },
]
const CHART_CATEGORIES = ['SemiAnalysis', 'The Pragmatic Engineer']

const valueFormatter = function (number: number) {
  return '$ ' + new Intl.NumberFormat('us').format(number).toString()
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'w-full h-96',
    data: CHART_DATA,
    index: 'date',
    categories: CHART_CATEGORIES,
    valueFormatter,
  },
}
