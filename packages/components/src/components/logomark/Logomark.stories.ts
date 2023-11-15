import type { Meta, StoryObj } from '@storybook/react'

import { Logomark } from './Logomark'

const meta = {
  title: 'Logomark',
  component: Logomark,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logomark>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
