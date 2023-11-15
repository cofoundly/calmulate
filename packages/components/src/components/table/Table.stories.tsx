import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Button } from '../button/Button'
import { Table } from './Table'

const meta = {
  title: 'Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>

            <Table.HeaderCell>Created By</Table.HeaderCell>

            <Table.HeaderCell>Team Members</Table.HeaderCell>

            <Table.HeaderCell>Date Created</Table.HeaderCell>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Frank's A Team</Table.Cell>

            <Table.Cell>Frank Gallagher</Table.Cell>

            <Table.Cell>1</Table.Cell>

            <Table.Cell>23 June 1988</Table.Cell>

            <Table.Cell>
              <Button variant="light">Edit</Button>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>Frank's B Team</Table.Cell>

            <Table.Cell>Frank Gallagher</Table.Cell>

            <Table.Cell>6</Table.Cell>

            <Table.Cell>23 June 1988</Table.Cell>

            <Table.Cell>
              <Button variant="light">Edit</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </>
    ),
  },
}
