'use client'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Button, ErrorPage } from 'components'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useLink } from 'utils'

import { routes } from '@/routes'

import { app } from '../../../config'

export default function NotFound() {
  const router = useRouter()
  const link = useLink()

  return (
    <ErrorPage title="Page not found" description="Sorry, we couldn’t find the page you’re looking for.">
      <div className="mt-8 flex gap-8">
        <Button
          onClick={() => {
            router.push(routes.home)
          }}
        >
          Go back home
        </Button>

        <Button
          variant="light"
          icon={<ArrowRightIcon />}
          iconPosition="right"
          onClick={() => {
            link(`mailto:${app.emails.support}`, '_blank')
          }}
        >
          Contact support
        </Button>
      </div>
    </ErrorPage>
  )
}
