import type { Meta, StoryObj } from '@storybook/react'

import { SmallText } from './SmallText'

const meta = {
  title: 'SmallText',
  component: SmallText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SmallText>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "I'm a SmallText component",
  },
}
