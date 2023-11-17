import dayjs from 'dayjs'

const startOfWeek = dayjs().startOf('week')
const event1Created = startOfWeek.add(8, 'hour')
const event1Start = event1Created.add(1, 'hour')
const event1End = event1Start.add(1, 'hour')
const event2Created = startOfWeek.add(1, 'day').add(7, 'hour')
const event2Start = event2Created.add(1, 'hour')
const event2End = event2Start.add(1, 'hour')

export const mockICalData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
BEGIN:VEVENT
UID:uid1@example.com
DTSTAMP:${event1Created.toISOString()}
DTSTART:${event1Start.toISOString()}
DTEND:${event1End.toISOString()}
SUMMARY:Team Meeting
DESCRIPTION:Weekly team meeting to discuss project updates.
LOCATION:Conference Room
END:VEVENT
BEGIN:VEVENT
UID:uid2@example.com
DTSTAMP:${event2Created.toISOString()}
DTSTART:${event2Start.toISOString()}
DTEND:${event2End.toISOString()}
SUMMARY:Client Call
DESCRIPTION:Call with client to review project requirements.
END:VEVENT
END:VCALENDAR`
