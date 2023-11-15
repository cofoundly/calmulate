import { CheckIcon, ParagraphText, SmallText, TitleText } from 'components'
import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type FeatureTextProps = {
  title: string
  description: ReactNode
  features?: string[]
  children?: ReactNode
  footer?: string
}

type Props = ComponentPropsWithoutRef<'div'> & FeatureTextProps

export const FeatureText = ({ className = '', title, description, features, footer, children, ...props }: Props) => {
  return (
    <div
      className={twMerge(
        'mx-auto flex flex-col justify-center gap-y-6 max-w-xl w-full text-center lg:text-left',
        className,
      )}
      {...props}
    >
      <TitleText>{title}</TitleText>

      <ParagraphText>{description}</ParagraphText>

      {features?.length && (
        <ul className="flex flex-col items-start gap-y-2 text-left">
          {features?.map(feature => (
            <li key={feature} className="flex items-center gap-x-2">
              <div>
                <CheckIcon />
              </div>

              <ParagraphText>{feature}</ParagraphText>
            </li>
          ))}
        </ul>
      )}

      {children}

      {footer && <SmallText>{footer}</SmallText>}
    </div>
  )
}
