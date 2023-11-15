import React, { ComponentPropsWithoutRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Button } from '../button/Button'
import { Dialog } from '../dialog/Dialog'
import { Icon } from '../icon/Icon'
import { LabelText } from '../labelText/LabelText'
import { TextInput } from '../textInput/TextInput'
import { IconName, icons } from './icons'

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  label?: string
  selected?: IconName
  onChange?: (icon: IconName) => void
}

export const IconPicker = ({
  className = '',
  label = 'Select an icon',
  selected = 'StarIcon',
  onChange,
  ...props
}: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <div className={twMerge('flex flex-col items-start gap-y-2', className)} {...props}>
      <LabelText>{label}</LabelText>

      <Button
        className="h-12 w-12 rounded-full p-0"
        name={selected}
        variant="secondaryNeutral"
        onClick={() => {
          setDialogOpen(true)
        }}
      >
        <Icon className="h-5 w-5" name={selected} />
      </Button>

      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
        }}
      >
        <Dialog.Header title={label} />

        <TextInput
          placeholder="Search icons..."
          value={search}
          autoFocus
          onChange={event => setSearch(event.target.value)}
        />

        <div className="flex h-[180px] flex-wrap gap-4 overflow-y-auto">
          {icons
            .filter(name => (search ? name.toLowerCase().includes(search.toLowerCase()) : name))
            .map(name => (
              <Button
                key={name}
                className="h-12 w-12 p-0"
                variant={selected === name ? 'primary' : 'lightNeutral'}
                onClick={() => {
                  if (onChange) {
                    onChange(name)
                  }

                  setDialogOpen(false)
                }}
              >
                <Icon className="h-5 w-5" name={name} />
              </Button>
            ))}
        </div>
      </Dialog>
    </div>
  )
}
