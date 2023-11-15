import { Cog6ToothIcon, HomeModernIcon } from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Sidebar } from '../sidebar/Sidebar'
import { Popover } from './Popover'

const meta = {
  title: 'Popover',
  component: Popover,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    children: (
      <Sidebar
        items={[
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
        ]}
        onItemClick={href => {
          console.log(href)
        }}
      />
    ),
    onClose: () => {
      console.log('Close')
    },
  },
}
