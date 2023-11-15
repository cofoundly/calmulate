import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { TableBody } from './TableBody'
import { TableCell } from './TableCell'
import { TableHead } from './TableHead'
import { TableHeaderCell } from './TableHeaderCell'
import { TableRow } from './TableRow'

type Props = ComponentPropsWithoutRef<'table'>

const Table = ({ className = '', ...props }: Props) => {
  return (
    <div className="overflow-auto">
      <table className={twMerge('w-full table-auto', className)} {...props} />
    </div>
  )
}

Table.Head = TableHead
Table.HeaderCell = TableHeaderCell
Table.Body = TableBody
Table.Row = TableRow
Table.Cell = TableCell

export { Table }
