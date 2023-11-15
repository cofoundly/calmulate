import type { Meta, StoryObj } from '@storybook/react'

import { LabelText } from './LabelText'

const meta = {
  title: 'LabelText',
  component: LabelText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LabelText>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "I'm a LabelText component",
  },
}
