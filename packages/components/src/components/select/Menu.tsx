import { motion } from 'framer-motion'
import React, { ComponentPropsWithoutRef, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { useKeyPress, useOutsideClick } from 'utils'

import { Button } from '../button/Button'
import { Card } from '../card/Card'
import { SelectOption } from './Select'

const INITIAL_ANIMATION = {
  opacity: 0,
  transform: 'translateY(-4px)',
  scale: 0.95,
}

type Props = ComponentPropsWithoutRef<'ul'> & {
  options: SelectOption[]
  onValueChange: (value: SelectOption) => void
  onClose: (event?: MouseEvent | KeyboardEvent) => void
}

export const Menu = ({ className = '', options, onValueChange, onClose, ...props }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, onClose)

  useKeyPress('Escape', onClose)

  return (
    <motion.div
      ref={ref}
      className="absolute z-10 mt-2 min-w-[10rem]"
      initial={INITIAL_ANIMATION}
      animate={{ opacity: 1, transform: 'translateY(0px)', scale: 1 }}
      exit={INITIAL_ANIMATION}
    >
      <Card className="p-0">
        <ul {...props} className={twMerge(className)}>
          {options.map(option => (
            <li key={option.value}>
              <Button
                className={`w-full justify-start px-4 py-2`}
                variant="lightNeutral"
                onClick={() => {
                  onValueChange(option)
                }}
              >
                {option.label}
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  )
}
