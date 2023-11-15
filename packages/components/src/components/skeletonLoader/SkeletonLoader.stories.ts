import type { Meta, StoryObj } from '@storybook/react'

import { SkeletonLoader } from './SkeletonLoader'

const meta = {
  title: 'SkeletonLoader',
  component: SkeletonLoader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SkeletonLoader>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'w-20',
  },
}
