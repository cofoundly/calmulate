import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'>

export const CalendarVerticalLines = ({ className = '', ...props }: Props) => {
  return (
    <div
      className={twMerge(
        'divide-theme-border dark:divide-dark-theme-border col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x sm:grid sm:grid-cols-7',
        className,
      )}
      {...props}
    >
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className={`row-span-full grid-col-start-${index + 1}`} />
      ))}

      <div
        className={`row-span-full w-8 grid-col-start-${7 + 1}`} // w-8 corresponds to the right padding of the sticky header, ie. pr-8
      />
    </div>
  )
}
