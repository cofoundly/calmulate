import { TinyText } from 'components'
import React, { ComponentPropsWithoutRef, forwardRef, Fragment } from 'react'
import { twMerge } from 'tailwind-merge'

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12
  const ampm = i < 12 ? 'AM' : 'PM'

  return `${hour}${ampm}`
})

const GRID_ROWS_PER_HOUR = 2 // TODO: SS later on we can introduce a zoom level which would modify this value
const GRID_ROWS = 24 * GRID_ROWS_PER_HOUR

type Props = ComponentPropsWithoutRef<'div'>

export const CalendarHorizontalLines = forwardRef(({ className = '', ...props }: Props, containerOffsetRef: any) => {
  return (
    <div
      className={twMerge(
        'divide-theme-border dark:divide-dark-theme-border col-start-1 col-end-2 row-start-1 grid divide-y',
        className,
      )}
      style={{ gridTemplateRows: `repeat(${GRID_ROWS}, minmax(3.5rem, 1fr))` }}
      {...props}
    >
      <div ref={containerOffsetRef} className="row-end-1 h-7" />

      {HOURS.map(hour => (
        <Fragment key={hour}>
          <div>
            <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right">
              <TinyText className="text-theme-content-subtle dark:text-dark-theme-content-subtle">{hour}</TinyText>
            </div>
          </div>

          {Array.from({ length: GRID_ROWS_PER_HOUR - 1 }).map((_, index) => (
            <div key={index} />
          ))}
        </Fragment>
      ))}
    </div>
  )
})
