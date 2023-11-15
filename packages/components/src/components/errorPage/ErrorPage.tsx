import { HeadingText, SlimLayout, SmallText } from 'components'
import React, { ReactNode } from 'react'

type Props = {
  title: string
  description: string
  children?: ReactNode
}

export const ErrorPage = ({ title, description, children }: Props) => {
  return (
    <SlimLayout>
      <div className="flex flex-col items-start gap-y-10">
        <div className="flex flex-col gap-y-2">
          <HeadingText>{title}</HeadingText>

          <SmallText>{description}</SmallText>
        </div>

        {children}
      </div>
    </SlimLayout>
  )
}
