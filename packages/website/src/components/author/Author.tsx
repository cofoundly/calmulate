import { SmallText } from 'components'
import Image from 'next/image'
import React, { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  image: string
  name: string
  title: string
} & ComponentPropsWithoutRef<'div'>

export const Author = ({ className = '', image, name, title }: Props) => {
  return (
    <div className={twMerge('mt-4 flex items-center gap-x-4', className)}>
      <Image className="rounded-full" src={image} alt={name} width={40} height={40} />

      <div className="flex flex-col">
        <SmallText>
          <b>{name}</b>
        </SmallText>

        <SmallText>{title}</SmallText>
      </div>
    </div>
  )
}
