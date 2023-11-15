import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'tr'>

export const TableRow = ({ className = '', ...props }: Props) => {
  return <tr className={twMerge(className)} {...props} />
}
