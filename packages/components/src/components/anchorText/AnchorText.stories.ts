import type { Meta, StoryObj } from '@storybook/react'

import { AnchorText } from './AnchorText'

const meta = {
  title: 'AnchorText',
  component: AnchorText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnchorText>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "I'm an AnchorText component",
  },
}
