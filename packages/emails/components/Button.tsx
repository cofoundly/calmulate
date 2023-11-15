import { Button as ButtonPrimitive } from '@react-email/components'
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
  className?: string
  href?: string
  children?: ReactNode
}

export const Button = ({ className = '', href, children }: ButtonProps) => {
  return (
    <ButtonPrimitive
      className={twMerge(
        `bg-theme-brand text-theme-brand-inverted my-8 cursor-pointer rounded-xl border px-4 py-2 text-sm font-medium shadow-sm ${className}`,
      )}
      href={href}
    >
      {children}
    </ButtonPrimitive>
  )
}
