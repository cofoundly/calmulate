import React, { ReactNode } from 'react'

import { HeadingText } from '../headingText/HeadingText'
import { SmallText } from '../smallText/SmallText'

type Props = {
  Icon: any
  title: string
  description: string
  children: ReactNode
}

export const BlankState = ({ Icon, title, description, children }: Props) => {
  return (
    <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center gap-y-6">
      <Icon className="text-theme-content-subtle dark:text-dark-theme-content-subtle h-16 w-16" />

      <div className="text-center">
        <HeadingText>{title}</HeadingText>

        <SmallText className="mt-2">{description}</SmallText>
      </div>

      {children}
    </div>
  )
}
