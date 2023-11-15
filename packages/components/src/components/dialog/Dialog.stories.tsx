import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Dialog } from './Dialog'

const meta = {
  title: 'Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    children: (
      <>
        <Dialog.Header title="Dialog Title" description="Dialog Description" />

        <Dialog.Actions />
      </>
    ),
  },
}

export const Dangerous: Story = {
  args: {
    open: true,
    children: (
      <>
        <Dialog.Header title="Dialog Title" description="Dialog Description" />

        <Dialog.Actions confirmIsDangerous />
      </>
    ),
  },
}

export const Loading: Story = {
  args: {
    open: true,
    children: (
      <>
        <Dialog.Header title="Dialog Title" description="Dialog Description" />

        <Dialog.Actions confirmLoading />
      </>
    ),
  },
}
