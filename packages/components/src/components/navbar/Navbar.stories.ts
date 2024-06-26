import type { Meta, StoryObj } from '@storybook/react'

import { Navbar } from './Navbar'

const meta = {
  title: 'Navbar',
  component: Navbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      {
        name: 'Home',
      },
      {
        name: 'Settings',
      },
      {
        name: 'Teams',
        active: true,
      },
    ],
  },
}
