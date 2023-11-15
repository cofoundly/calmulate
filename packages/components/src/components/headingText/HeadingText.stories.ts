import type { Meta, StoryObj } from '@storybook/react'

import { HeadingText } from './HeadingText'

const meta = {
  title: 'HeadingText',
  component: HeadingText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeadingText>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "I'm a HeadingText component",
  },
}
