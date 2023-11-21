import { CheckIcon } from '@heroicons/react/24/solid'
import { colors } from 'colors'
import { app } from 'config'
import React, { ComponentPropsWithoutRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button, ButtonProps } from '../button/Button'
import { Dialog } from '../dialog/Dialog'
import { LabelText } from '../labelText/LabelText'

export type ColorName = typeof colors[number]

type ColorProps = { name: ColorName; selected: boolean } & ButtonProps

const Color = ({ className = '', name, selected, children, ...props }: ColorProps) => (
  <Button
    className={twMerge(
      `h-12 w-12 rounded-full p-0 bg-${name}-500 dark:bg-${name}-500 hover:bg-${name}-500 dark:hover:bg-${name}-500 border-4 border-transparent dark:border-${name}-700 hover:border-${name}-400 dark:hover:border-${name}-700`,
      selected ? `border-${name}-400 dark:border-${name}-700` : '',
      className,
    )}
    name={`${name}-color`}
    {...props}
  >
    {children}
  </Button>
)

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  label?: string
  selected?: ColorName
  onChange?: (color: ColorName) => void
}

export const ColorPicker = ({
  className = '',
  label = 'Select a color',
  selected = app.colors.theme as ColorName,
  onChange,
  ...props
}: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className={twMerge('flex flex-col items-start gap-y-2', className)} {...props}>
      <LabelText>{label}</LabelText>

      <Color
        name={selected}
        selected
        onClick={() => {
          setDialogOpen(true)
        }}
      />

      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
        }}
      >
        <Dialog.Header title={label} />

        <div className="flex h-[180px] flex-wrap gap-4 overflow-y-auto">
          {colors.map(name => (
            <Color
              key={name}
              name={name}
              selected={selected === name}
              onClick={() => {
                if (onChange) {
                  onChange(name)
                }

                setDialogOpen(false)
              }}
            >
              {selected === name && <CheckIcon className="h-5 w-5" />}
            </Color>
          ))}
        </div>
      </Dialog>
    </div>
  )
}
