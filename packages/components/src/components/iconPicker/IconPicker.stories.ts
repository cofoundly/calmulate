import type { Meta, StoryObj } from '@storybook/react'

import { IconPicker } from './IconPicker'

const meta = {
  title: 'IconPicker',
  component: IconPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IconPicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
