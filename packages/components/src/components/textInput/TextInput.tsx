import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { LabelText } from '../labelText/LabelText'

type Props = ComponentProps<'input'> & { label?: string }

export const TextInput = ({ className = '', label, ...props }: Props) => {
  return (
    <div className={twMerge('flex flex-col gap-y-2 text-left', className)}>
      {label && <LabelText htmlFor={label}>{label}</LabelText>}

      <input
        className="text-theme-content bg-theme-background dark:bg-dark-theme-background hover:bg-theme-background-muted dark:hover:bg-dark-theme-background-muted focus-visible:outline-theme-brand-subtle dark:focus-visible:outline-dark-theme-brand-subtle border-theme-border dark:border-dark-theme-border disabled:bg-theme-background-muted dark:disabled:bg-dark-theme-background-muted rounded-xl border px-4 py-2 text-sm shadow-sm outline-2 outline-offset-4 transition-colors focus-visible:outline disabled:cursor-not-allowed dark:text-white"
        id={label || undefined}
        {...props}
      />
    </div>
  )
}
