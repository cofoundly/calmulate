import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'>

export const Container = ({ className = '', children, ...props }: Props) => {
  return (
    <div className={twMerge('relative mx-auto flex max-w-5xl flex-col gap-y-8', className)} {...props}>
      {children}
    </div>
  )
}
