import type { Meta, StoryObj } from '@storybook/react'

import { HugeText } from './HugeText'

const meta = {
  title: 'HugeText',
  component: HugeText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HugeText>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "I'm a HugeText component",
  },
}
