import type { Meta, StoryObj } from '@storybook/react'

import { ErrorPage } from './ErrorPage'

const meta = {
  title: 'ErrorPage',
  component: ErrorPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'No data',
    description: 'There is no data to display.',
  },
}
