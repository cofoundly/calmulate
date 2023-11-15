import { Link as LinkPrimitive } from '@react-email/components'
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type LinkProps = {
  className?: string
  href?: string
  children?: ReactNode
}

export const Link = ({ className = '', href = '', children }: LinkProps) => {
  return (
    <LinkPrimitive className={twMerge(`text-theme-brand m-0 text-sm underline ${className}`)} href={href}>
      {children}
    </LinkPrimitive>
  )
}
