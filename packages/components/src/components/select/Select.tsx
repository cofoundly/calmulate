import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { AnimatePresence } from 'framer-motion'
import React, { ComponentPropsWithoutRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '../button/Button'
import { Menu } from './Menu'
import { SelectItem } from './SelectItem'

export type SelectOption = {
  value: string
  label: string
}

type Props = ComponentPropsWithoutRef<'div'> & {
  value: string
  options: SelectOption[]
  disabled?: boolean
  onValueChange: (option: SelectOption) => void
}

const Select = ({ className = '', value, options, disabled, onValueChange, ...props }: Props) => {
  const [open, setOpen] = useState(false)

  const label = options.find(option => option.value === value)?.label || ''

  return (
    <div className={twMerge('relative', className)} {...props}>
      <Button
        className="min-w-[10rem] justify-between"
        variant="secondaryNeutral"
        icon={<ChevronDownIcon />}
        iconPosition="right"
        disabled={disabled}
        onClick={() => {
          setOpen(!open)
        }}
      >
        {label}
      </Button>

      <AnimatePresence>
        {open && (
          <Menu
            options={options}
            onValueChange={value => {
              onValueChange(value)
              setOpen(false)
            }}
            onClose={() => {
              setOpen(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

Select.Item = SelectItem

export { Select }
