import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { BlankState, Button } from 'components'
import React from 'react'
import { useLink } from 'utils'

export const ProductsNotFound = () => {
  const link = useLink()

  return (
    <main className="flex h-full">
      <BlankState
        Icon={ExclamationCircleIcon}
        title="No products found"
        description="Create them in your Stripe dashboard."
      >
        <Button onClick={() => link('https://dashboard.stripe.com/test/dashboard', '_blank')}>
          Go to Stripe dashboard
        </Button>
      </BlankState>
    </main>
  )
}
