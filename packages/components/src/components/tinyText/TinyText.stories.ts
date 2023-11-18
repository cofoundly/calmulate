import type { Meta, StoryObj } from '@storybook/react'

import { TinyText } from './TinyText'

const meta = {
  title: 'TinyText',
  component: TinyText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TinyText>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "I'm a TinyText component",
  },
}
