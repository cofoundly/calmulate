import type { Meta, StoryObj } from '@storybook/react'

import { BarChart } from './BarChart'

const meta = {
  title: 'BarChart',
  component: BarChart,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BarChart>

export default meta

const CHART_DATA = [
  {
    name: 'Amphibians',
    'Number of threatened species': 2488,
  },
  {
    name: 'Birds',
    'Number of threatened species': 1445,
  },
  {
    name: 'Crustaceans',
    'Number of threatened species': 743,
  },
  {
    name: 'Ferns',
    'Number of threatened species': 281,
  },
  {
    name: 'Arachnids',
    'Number of threatened species': 251,
  },
  {
    name: 'Corals',
    'Number of threatened species': 232,
  },
  {
    name: 'Algae',
    'Number of threatened species': 98,
  },
]
const CHART_CATEGORIES = ['Number of threatened species']

const valueFormatter = (number: number) => `$ ${new Intl.NumberFormat('us').format(number).toString()}`

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'w-full h-96',
    data: CHART_DATA,
    index: 'name',
    categories: CHART_CATEGORIES,
    valueFormatter,
  },
}
