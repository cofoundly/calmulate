import type { Meta, StoryObj } from '@storybook/react'

import { CopyableText } from './CopyableText'

const meta = {
  title: 'CopyableText',
  component: CopyableText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CopyableText>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "I'm an CopyableText component",
  },
}
