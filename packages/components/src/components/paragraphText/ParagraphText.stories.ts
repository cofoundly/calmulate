import type { Meta, StoryObj } from '@storybook/react'

import { ParagraphText } from './ParagraphText'

const meta = {
  title: 'ParagraphText',
  component: ParagraphText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ParagraphText>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "I'm a ParagraphText component",
  },
}
