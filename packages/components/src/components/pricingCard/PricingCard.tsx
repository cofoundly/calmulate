import { Badge, Button, Card, CheckIcon, HeadingText, SmallText, TitleText } from 'components'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { PricingCardProduct } from 'types'
import { formatCurrency } from 'utils'

type PricingCardProps = {
  onClick: () => void
} & PricingCardProduct

export const PricingCard = ({
  title,
  description,
  currency,
  price,
  priceInfo,
  features,
  buttonText = 'Buy plan',
  highlight,
  loading,
  onClick,
}: PricingCardProps) => {
  return (
    <Card
      className={twMerge(
        highlight ? 'ring-theme-brand dark:ring-theme-brand ring' : '',
        'mx-auto flex h-full max-w-lg flex-col gap-y-4',
      )}
    >
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-2">
        <HeadingText className={highlight ? 'text-theme-brand dark:text-theme-brand' : ''}>{title}</HeadingText>

        {highlight && <Badge>Most popular</Badge>}
      </div>

      {description && <SmallText>{description}</SmallText>}

      <div className="flex items-end">
        <TitleText>{currency && typeof price === 'number' ? formatCurrency(price, currency) : price}</TitleText>

        {priceInfo && <SmallText className="mb-1 ml-2">{priceInfo}</SmallText>}
      </div>

      <Button variant={highlight ? 'primary' : 'secondary'} disabled={loading} loading={loading} onClick={onClick}>
        {buttonText}
      </Button>

      <ul className="flex flex-col gap-y-2">
        {features.map(feature => (
          <li key={feature} className="flex items-center gap-x-2">
            <div>
              <CheckIcon />
            </div>

            <SmallText>{feature}</SmallText>
          </li>
        ))}
      </ul>
    </Card>
  )
}
