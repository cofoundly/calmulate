import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

const TEST_ID = 'skeleton-loader'

type SkeletonLoaderProps = ComponentPropsWithoutRef<'div'>

const SkeletonLoader = ({ className = '', ...props }: SkeletonLoaderProps) => {
  return (
    <div
      className={twMerge(
        'bg-theme-background-subtle dark:bg-dark-theme-background-subtle h-8 w-full animate-pulse rounded-xl',
        className,
      )}
      data-testid={TEST_ID}
      {...props}
    />
  )
}

SkeletonLoader.TestId = TEST_ID

export { SkeletonLoader }
