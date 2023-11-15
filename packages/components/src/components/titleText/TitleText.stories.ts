import type { Meta, StoryObj } from '@storybook/react'

import { TitleText } from './TitleText'

const meta = {
  title: 'TitleText',
  component: TitleText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TitleText>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "I'm a TitleText component",
  },
}
