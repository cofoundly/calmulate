import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { SlimLayout } from './SlimLayout'

const meta = {
  title: 'SlimLayout',
  component: SlimLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SlimLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <div className="min-h-screen" />,
  },
}
