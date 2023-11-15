import type { Meta, StoryObj } from '@storybook/react'

import { DonutChart } from './DonutChart'

const meta = {
  title: 'DonutChart',
  component: DonutChart,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DonutChart>

export default meta

const CHART_DATA = [
  {
    name: 'New York',
    sales: 9800,
  },
  {
    name: 'London',
    sales: 4567,
  },
  {
    name: 'Hong Kong',
    sales: 3908,
  },
  {
    name: 'San Francisco',
    sales: 2400,
  },
  {
    name: 'Singapore',
    sales: 1908,
  },
  {
    name: 'Zurich',
    sales: 1398,
  },
]

const valueFormatter = (number: number) => `$ ${new Intl.NumberFormat('us').format(number).toString()}`

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'w-full h-96',
    data: CHART_DATA,
    index: 'name',
    category: 'sales',
    valueFormatter,
  },
}
