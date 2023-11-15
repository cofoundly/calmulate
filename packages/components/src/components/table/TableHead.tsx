import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'thead'>

export const TableHead = ({ className = '', ...props }: Props) => {
  return <thead className={twMerge(className)} {...props} />
}
