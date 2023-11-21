import { BriefcaseIcon, HeartIcon, ScaleIcon } from '@heroicons/react/24/solid'
import { ProgressCircle } from 'components'
import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'div'>

export const CalendarDayStatus = ({ className = '', ...props }: Props) => {
  return (
    <div className={twMerge('flex flex-wrap items-center justify-center gap-2', className)} {...props}>
      <ProgressCircle size="xs" color="red" value={80}>
        <HeartIcon className="h-4 w-4 text-red-500" />
      </ProgressCircle>

      <ProgressCircle size="xs" color="green" value={90}>
        <BriefcaseIcon className="h-4 w-4 text-green-500" />
      </ProgressCircle>

      <ProgressCircle size="xs" color="orange" value={60}>
        <ScaleIcon className="h-4 w-4 text-orange-500" />
      </ProgressCircle>
    </div>
  )
}
