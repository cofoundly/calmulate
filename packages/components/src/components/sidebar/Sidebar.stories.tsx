import { Cog6ToothIcon, HomeModernIcon } from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Sidebar } from './Sidebar'

const meta = {
  title: 'Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: <HomeModernIcon />,
        active: true,
      },
      {
        name: 'Settings',
        href: '/settings',
        icon: <Cog6ToothIcon />,
        active: false,
      },
    ],
    onItemClick: href => {
      console.log(href)
    },
  },
}
