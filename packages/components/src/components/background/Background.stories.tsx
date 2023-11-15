import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Background } from './Background'

const meta = {
  title: 'Background',
  component: Background,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Background>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    children: <div className="flex h-screen items-center justify-center">"I'm a Background component"</div>,
  },
}

export const Inverted: Story = {
  args: {
    variant: 'inverted',
    children: <div className="flex h-screen items-center justify-center">"I'm a Background component"</div>,
  },
}
