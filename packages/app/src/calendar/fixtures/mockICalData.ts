import { date } from '@/date'

const today = date().startOf('day')
const event1Created = today.add(8, 'hour')
const event1Start = event1Created
const event1End = event1Start.add(1, 'hour')
const event2Created = event1End
const event2Start = event2Created
const event2End = event2Start.add(1, 'hour')
const tomorrow = today.add(1, 'day')
const event3Created = tomorrow.add(8, 'hour')
const event3Start = event3Created
const event3End = event3Start.add(1, 'hour')
const event4Created = event3End
const event4Start = event4Created
const event4End = event4Start.add(1, 'hour')

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
BEGIN:VEVENT
UID:uid3@example.com
DTSTAMP:${event3Created.toISOString()}
DTSTART:${event3Start.toISOString()}
DTEND:${event3End.toISOString()}
SUMMARY:Team Meeting
DESCRIPTION:Weekly team meeting to discuss project updates.
LOCATION:Conference Room
END:VEVENT
BEGIN:VEVENT
UID:uid4@example.com
DTSTAMP:${event4Created.toISOString()}
DTSTART:${event4Start.toISOString()}
DTEND:${event4End.toISOString()}
SUMMARY:Client Call
DESCRIPTION:Call with client to review project requirements.
END:VEVENT
END:VCALENDAR`
