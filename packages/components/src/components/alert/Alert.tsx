import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '../button/Button'
import { SmallText } from '../smallText/SmallText'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

const variantToBgColor: Record<AlertVariant, string> = {
  info: `bg-theme-background-muted dark:bg-dark-theme-background-muted`,
  success: 'bg-green-50 dark:bg-green-900',
  warning: 'bg-orange-50 dark:bg-orange-900',
  error: 'bg-red-50 dark:bg-red-900',
}

const variantToBorderColor: Record<AlertVariant, string> = {
  info: `border-theme-border dark:border-dark-theme-border`,
  success: 'border-green-200 dark:border-green-700',
  warning: 'border-orange-200 dark:border-orange-700',
  error: 'border-red-200 dark:border-red-700',
}

const variantToIcon: Record<AlertVariant, typeof InformationCircleIcon> = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: ExclamationCircleIcon,
}

const variantToTextColor: Record<AlertVariant, string> = {
  info: `text-theme-content dark:text-dark-theme-content-emphasis`,
  success: 'text-green-700 dark:text-dark-theme-content-emphasis',
  warning: 'text-orange-700 dark:text-dark-theme-content-emphasis',
  error: 'text-red-700 dark:text-dark-theme-content-emphasis',
}

type Props = {
  className?: string
  variant?: AlertVariant
  children?: ReactNode
  onClose?: () => void
}

export const Alert = ({ className, variant = 'success', children, onClose }: Props) => {
  const Icon = variantToIcon[variant]

  return (
    <div
      className={twMerge(
        'break-word flex w-full max-w-lg items-center space-x-2 overflow-hidden rounded-xl border px-3 py-2',
        variantToBgColor[variant],
        variantToBorderColor[variant],
        variantToTextColor[variant],
        className,
      )}
    >
      <div>
        <Icon className={`h-5 w-5 text-inherit`} />
      </div>

      <SmallText className="w-full text-inherit dark:text-inherit">{children}</SmallText>

      {onClose && (
        <Button
          className="p-0 text-inherit hover:text-inherit dark:text-inherit dark:hover:text-inherit"
          variant="light"
          onClick={onClose}
        >
          <XMarkIcon className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
