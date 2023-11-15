import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Background } from '../background/Background'

type Props = ComponentPropsWithoutRef<'div'>

export const SlimLayout = ({ className, children, ...props }: Props) => {
  return (
    <div className={twMerge('relative flex min-h-screen justify-center md:px-12 lg:px-0', className)} {...props}>
      <div className="bg-theme-background dark:bg-dark-theme-background relative z-10 flex flex-1 flex-col justify-center px-4 py-10 md:flex-none md:px-28">
        <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">{children}</div>
      </div>

      <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
        <Background className="absolute inset-0" />
      </div>
    </div>
  )
}
