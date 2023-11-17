import { Alert, AnchorText, Button, CheckIcon, NumberedList, TextInput } from 'components'
import React, { ReactNode, useCallback, useState } from 'react'
import { validateUrl } from 'utils'

import { useCalendarEvents } from '@/calendar/hooks/useCalendarEvents'
import { useCalendarUrl } from '@/calendar/hooks/useCalendarUrl'
import { PageSection } from '@/components/pageSection/PageSection'

const STEPS: ReactNode[] = [
  <>
    On your computer,{' '}
    <AnchorText href="https://calendar.google.com/" target="_blank" rel="noopener noreferer">
      open Google Calendar
    </AnchorText>
    .
  </>,
  <>
    In the top right, click the ⚙️ (Settings) icon and then <b>Settings</b>.
  </>,
  'On the left panel, under “Settings for my calendars,” click the name of the calendar you want to use.',
  <>
    Click <b>Integrate calendar</b>.
  </>,
  'In the "Secret address in iCal format" section, copy the link.',
  'Paste the link into the input below.',
]

export const ICalIntegrationSection = () => {
  const [calendarUrl, setCalendarUrl] = useCalendarUrl()
  const [url, setUrl] = useState(calendarUrl)

  const { isFetching, isFetched } = useCalendarEvents()

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // if the calendarUrl is already set and the user is changing the url, reset the calendarUrl
      if (calendarUrl && calendarUrl !== event.target.value) {
        setCalendarUrl('')
      }

      setUrl(event.target.value)
    },
    [calendarUrl, setCalendarUrl],
  )

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      setCalendarUrl(url)
    },
    [url, setCalendarUrl],
  )

  return (
    <PageSection
      className="pt-0 lg:pt-0"
      title="Calendar Sync"
      description="Sync your calendar with Calmulate for personalized productivity and mindfulness suggestions tailored to your daily schedule."
      fullWidth={false}
    >
      <Alert variant="info">
        <b>Privacy-First</b>: We value your privacy and security. Your calendar data remains exclusively on your device,
        ensuring your information is always private and protected.
      </Alert>

      <NumberedList items={STEPS} />

      <form className="space-y-6" onSubmit={onSubmit}>
        <TextInput
          type="url"
          label="Calendar URL"
          placeholder="Paste your calendar URL here"
          value={url}
          disabled={isFetching}
          onChange={onChange}
        />

        <Button
          type="submit"
          icon={isFetched && <CheckIcon className="h-auto text-inherit" />}
          loading={isFetching}
          disabled={!validateUrl(url) || isFetching || isFetched}
        >
          {isFetched ? 'Calendar Synced!' : isFetching ? 'Syncing Calendar...' : 'Sync Calendar'}
        </Button>
      </form>
    </PageSection>
  )
}
