import { HeartIcon } from '@heroicons/react/24/solid'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { ProgressCircle } from './ProgressCircle'

const meta = {
  title: 'ProgressCircle',
  component: ProgressCircle,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressCircle>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'xs',
    color: 'red',
    value: 80,
    children: <HeartIcon className="h-4 w-4 text-red-500" />,
  },
}
