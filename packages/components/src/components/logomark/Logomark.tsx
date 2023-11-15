import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import LogoSvg from '../../assets/logo.svg'

type Props = ComponentPropsWithoutRef<'svg'> & {
  variant?: 'default' | 'inverted'
}

export const Logomark = ({ className, variant = 'default', ...props }: Props) => {
  return (
    <LogoSvg
      className={twMerge(
        'h-8 w-auto',
        variant === 'default'
          ? 'fill-theme-brand stroke-fill-theme-brand dark:fill-dark-theme-brand dark:stroke-dark-theme-brand'
          : 'fill-theme-brand-inverted stroke-fill-theme-brand-inverted dark:fill-dark-theme-brand-inverted dark:stroke-dark-theme-brand-inverted',
        className,
      )}
      {...props}
    />
  )
}
