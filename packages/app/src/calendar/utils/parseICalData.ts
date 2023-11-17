import ical from 'ical'

export const parseICalData = (iCalData: string) => {
  const data = ical.parseICS(iCalData)
  const events = Object.values(data)

  return events
}
