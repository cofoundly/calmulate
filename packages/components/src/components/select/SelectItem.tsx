import React, { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'li'>

export const SelectItem = ({ ...props }: Props) => {
  return <li {...props} />
}
