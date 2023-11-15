import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './Select'

const meta = {
  title: 'Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

const options = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
]

export const Default: Story = {
  args: {
    value: options[0].value,
    options,
    onValueChange: value => {
      console.log(value)
    },
  },
}
