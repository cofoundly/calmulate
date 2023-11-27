import { date } from '@/date'

const timeIncrement = (day: date.Dayjs, hours: number, minutes = 0) => day.add(hours, 'hour').add(minutes, 'minute')

const monday = date().startOf('isoWeek')
const tuesday = monday.add(1, 'day')
const wednesday = tuesday.add(1, 'day')
const thursday = wednesday.add(1, 'day')
const friday = thursday.add(1, 'day')

export const mockICalData = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN

// Monday: High-Stress Day
BEGIN:VEVENT
UID:uid1@example.com
DTSTAMP:${timeIncrement(monday, 8).toISOString()}
DTSTART:${timeIncrement(monday, 8).toISOString()}
DTEND:${timeIncrement(monday, 9, 30).toISOString()}
SUMMARY:Project Planning Meeting
DESCRIPTION:In-depth planning session for the new project.
LOCATION:Conference Room
END:VEVENT
BEGIN:VEVENT
UID:uid2@example.com
DTSTAMP:${timeIncrement(monday, 9, 30).toISOString()}
DTSTART:${timeIncrement(monday, 9, 30).toISOString()}
DTEND:${timeIncrement(monday, 11).toISOString()}
SUMMARY:Client Strategy Call
DESCRIPTION:Strategy discussion with key client.
LOCATION:Conference Call
END:VEVENT
BEGIN:VEVENT
UID:uid3@example.com
DTSTAMP:${timeIncrement(monday, 11).toISOString()}
DTSTART:${timeIncrement(monday, 11).toISOString()}
DTEND:${timeIncrement(monday, 12, 30).toISOString()}
SUMMARY:Marketing Sync
DESCRIPTION:Weekly marketing team meeting.
LOCATION:Office
END:VEVENT
BEGIN:VEVENT
UID:uid4@example.com
DTSTAMP:${timeIncrement(monday, 12, 30).toISOString()}
DTSTART:${timeIncrement(monday, 12, 30).toISOString()}
DTEND:${timeIncrement(monday, 14).toISOString()}
SUMMARY:Lunch Meeting with Stakeholders
DESCRIPTION:Lunch meeting to discuss stakeholder requirements.
LOCATION:Restaurant
END:VEVENT
BEGIN:VEVENT
UID:uid5@example.com
DTSTAMP:${timeIncrement(monday, 14).toISOString()}
DTSTART:${timeIncrement(monday, 14).toISOString()}
DTEND:${timeIncrement(monday, 15, 30).toISOString()}
SUMMARY:Product Development Review
DESCRIPTION:Bi-weekly product development status review.
LOCATION:Conference Room
END:VEVENT
BEGIN:VEVENT
UID:uid6@example.com
DTSTAMP:${timeIncrement(monday, 15, 30).toISOString()}
DTSTART:${timeIncrement(monday, 15, 30).toISOString()}
DTEND:${timeIncrement(monday, 17).toISOString()}
SUMMARY:Team Building Activity
DESCRIPTION:Team building exercise to boost team morale.
LOCATION:Office
END:VEVENT
// End of Monday's Events

// Tuesday: High-Productivity Day
BEGIN:VEVENT
UID:uid7@example.com
DTSTAMP:${timeIncrement(tuesday, 8).toISOString()}
DTSTART:${timeIncrement(tuesday, 8).toISOString()}
DTEND:${timeIncrement(tuesday, 9).toISOString()}
SUMMARY:Morning Briefing
DESCRIPTION:Quick team briefing to set the day's priorities.
LOCATION:Office
END:VEVENT
BEGIN:VEVENT
UID:uid8@example.com
DTSTAMP:${timeIncrement(tuesday, 9, 15).toISOString()}
DTSTART:${timeIncrement(tuesday, 9, 15).toISOString()}
DTEND:${timeIncrement(tuesday, 11, 15).toISOString()}
SUMMARY:Focused Work Block
DESCRIPTION:Time reserved for focused individual work.
LOCATION:Desk
END:VEVENT
BEGIN:VEVENT
UID:uid9@example.com
DTSTAMP:${timeIncrement(tuesday, 11, 15).toISOString()}
DTSTART:${timeIncrement(tuesday, 11, 15).toISOString()}
DTEND:${timeIncrement(tuesday, 12).toISOString()}
SUMMARY:Team Collaboration Session
DESCRIPTION:Collaborative work session on current projects.
LOCATION:Conference Room
END:VEVENT
BEGIN:VEVENT
UID:uid10@example.com
DTSTAMP:${timeIncrement(tuesday, 12).toISOString()}
DTSTART:${timeIncrement(tuesday, 12).toISOString()}
DTEND:${timeIncrement(tuesday, 13).toISOString()}
SUMMARY:Lunch Break
DESCRIPTION:Time off for lunch and relaxation.
LOCATION:Outside
END:VEVENT
BEGIN:VEVENT
UID:uid11@example.com
DTSTAMP:${timeIncrement(tuesday, 13, 30).toISOString()}
DTSTART:${timeIncrement(tuesday, 13, 30).toISOString()}
DTEND:${timeIncrement(tuesday, 15, 30).toISOString()}
SUMMARY:Focused Work Block
DESCRIPTION:Dedicated time for deep work and project advancement.
LOCATION:Desk
END:VEVENT
BEGIN:VEVENT
UID:uid12@example.com
DTSTAMP:${timeIncrement(tuesday, 16).toISOString()}
DTSTART:${timeIncrement(tuesday, 16).toISOString()}
DTEND:${timeIncrement(tuesday, 17).toISOString()}
SUMMARY:End-of-Day Review
DESCRIPTION:Review of the day's progress and preparation for tomorrow.
LOCATION:Office
END:VEVENT
// End of Tuesday's Events

// Wednesday: Well-Balanced Day
BEGIN:VEVENT
UID:uid13@example.com
DTSTAMP:${timeIncrement(wednesday, 7, 30).toISOString()}
DTSTART:${timeIncrement(wednesday, 7, 30).toISOString()}
DTEND:${timeIncrement(wednesday, 8, 15).toISOString()}
SUMMARY:Morning Exercise
DESCRIPTION:Time allocated for a morning workout to start the day.
LOCATION:Gym
END:VEVENT
BEGIN:VEVENT
UID:uid14@example.com
DTSTAMP:${timeIncrement(wednesday, 9).toISOString()}
DTSTART:${timeIncrement(wednesday, 9).toISOString()}
DTEND:${timeIncrement(wednesday, 10).toISOString()}
SUMMARY:Client Meeting
DESCRIPTION:Meeting to discuss project progress with the client.
LOCATION:Conference Call
END:VEVENT
BEGIN:VEVENT
UID:uid15@example.com
DTSTAMP:${timeIncrement(wednesday, 10, 30).toISOString()}
DTSTART:${timeIncrement(wednesday, 10, 30).toISOString()}
DTEND:${timeIncrement(wednesday, 12).toISOString()}
SUMMARY:Focused Work Block
DESCRIPTION:Concentrated time for individual tasks and project work.
LOCATION:Desk
END:VEVENT
BEGIN:VEVENT
UID:uid4@example.com
DTSTAMP:${timeIncrement(wednesday, 12).toISOString()}
DTSTART:${timeIncrement(wednesday, 12).toISOString()}
DTEND:${timeIncrement(wednesday, 13).toISOString()}
SUMMARY:Lunch and Personal Time
DESCRIPTION:Break for lunch and personal errands or relaxation.
LOCATION:Home
END:VEVENT
BEGIN:VEVENT
UID:uid16@example.com
DTSTAMP:${timeIncrement(wednesday, 14).toISOString()}
DTSTART:${timeIncrement(wednesday, 14).toISOString()}
DTEND:${timeIncrement(wednesday, 15).toISOString()}
SUMMARY:Team Brainstorming Session
DESCRIPTION:Creative session for team brainstorming and idea generation.
LOCATION:Office
END:VEVENT
BEGIN:VEVENT
UID:uid17@example.com
DTSTAMP:${timeIncrement(wednesday, 15, 30).toISOString()}
DTSTART:${timeIncrement(wednesday, 15, 30).toISOString()}
DTEND:${timeIncrement(wednesday, 17).toISOString()}
SUMMARY:Personal Project Time
DESCRIPTION:Dedicated time for personal or professional development projects.
LOCATION:Desk
END:VEVENT
// End of Wednesday's Events

// Thursday: Mixed Day
BEGIN:VEVENT
UID:uid18@example.com
DTSTAMP:${timeIncrement(thursday, 8).toISOString()}
DTSTART:${timeIncrement(thursday, 8).toISOString()}
DTEND:${timeIncrement(thursday, 9).toISOString()}
SUMMARY:Urgent Team Meeting
DESCRIPTION:Emergency meeting to address urgent project issues.
LOCATION:Office
END:VEVENT
BEGIN:VEVENT
UID:uid19@example.com
DTSTAMP:${timeIncrement(thursday, 9, 15).toISOString()}
DTSTART:${timeIncrement(thursday, 9, 15).toISOString()}
DTEND:${timeIncrement(thursday, 10, 15).toISOString()}
SUMMARY:Focused Work Block
DESCRIPTION:Time reserved for focused task completion.
LOCATION:Desk
END:VEVENT
BEGIN:VEVENT
UID:uid20@example.com
DTSTAMP:${timeIncrement(thursday, 10, 30).toISOString()}
DTSTART:${timeIncrement(thursday, 10, 30).toISOString()}
DTEND:${timeIncrement(thursday, 11, 30).toISOString()}
SUMMARY:Client Presentation Preparation
DESCRIPTION:Preparing for an important client presentation.
LOCATION:Office
END:VEVENT
BEGIN:VEVENT
UID:uid21@example.com
DTSTAMP:${timeIncrement(thursday, 12).toISOString()}
DTSTART:${timeIncrement(thursday, 12).toISOString()}
DTEND:${timeIncrement(thursday, 13).toISOString()}
SUMMARY:Lunch Break
DESCRIPTION:Break for lunch - time to relax and recharge.
LOCATION:Cafeteria
END:VEVENT
BEGIN:VEVENT
UID:uid22@example.com
DTSTAMP:${timeIncrement(thursday, 13, 30).toISOString()}
DTSTART:${timeIncrement(thursday, 13, 30).toISOString()}
DTEND:${timeIncrement(thursday, 14, 30).toISOString()}
SUMMARY:Client Presentation
DESCRIPTION:Presentation to a key client on project progress.
LOCATION:Conference Room
END:VEVENT
BEGIN:VEVENT
UID:uid23@example.com
DTSTAMP:${timeIncrement(thursday, 15).toISOString()}
DTSTART:${timeIncrement(thursday, 15).toISOString()}
DTEND:${timeIncrement(thursday, 16).toISOString()}
SUMMARY:Personal Development Time
DESCRIPTION:Time allocated for personal growth events or learning.
LOCATION:Desk
END:VEVENT
BEGIN:VEVENT
UID:uid24@example.com
DTSTAMP:${timeIncrement(thursday, 16, 30).toISOString()}
DTSTART:${timeIncrement(thursday, 16, 30).toISOString()}
DTEND:${timeIncrement(thursday, 17, 30).toISOString()}
SUMMARY:Networking Event
DESCRIPTION:Attending a professional networking event.
LOCATION:Offsite
END:VEVENT
// End of Thursday's Events

// Friday: Light Day
BEGIN:VEVENT
UID:uid25@example.com
DTSTAMP:${timeIncrement(friday, 8).toISOString()}
DTSTART:${timeIncrement(friday, 8).toISOString()}
DTEND:${timeIncrement(friday, 9).toISOString()}
SUMMARY:Weekly Review
DESCRIPTION:Review of the week's achievements and setting up next week's goals.
LOCATION:Office
END:VEVENT
BEGIN:VEVENT
UID:uid26@example.com
DTSTAMP:${timeIncrement(friday, 9, 30).toISOString()}
DTSTART:${timeIncrement(friday, 9, 30).toISOString()}
DTEND:${timeIncrement(friday, 10, 30).toISOString()}
SUMMARY:Casual Team Catch-Up
DESCRIPTION:Informal team meeting to catch up and discuss non-work topics.
LOCATION:Office Lounge
END:VEVENT
BEGIN:VEVENT
UID:uid27@example.com
DTSTAMP:${timeIncrement(friday, 11).toISOString()}
DTSTART:${timeIncrement(friday, 11).toISOString()}
DTEND:${timeIncrement(friday, 12).toISOString()}
SUMMARY:Extended Lunch Break
DESCRIPTION:Extended lunch break to relax and socialize.
LOCATION:Cafeteria
END:VEVENT
BEGIN:VEVENT
UID:uid28@example.com
DTSTAMP:${timeIncrement(friday, 13).toISOString()}
DTSTART:${timeIncrement(friday, 13).toISOString()}
DTEND:${timeIncrement(friday, 14).toISOString()}
SUMMARY:Creative Thinking Session
DESCRIPTION:Time allocated for creative thinking or personal projects.
LOCATION:Desk
END:VEVENT
BEGIN:VEVENT
UID:uid29@example.com
DTSTAMP:${timeIncrement(friday, 14, 30).toISOString()}
DTSTART:${timeIncrement(friday, 14, 30).toISOString()}
DTEND:${timeIncrement(friday, 15, 30).toISOString()}
SUMMARY:Early Wrap-Up
DESCRIPTION:Wrapping up the week's work a bit early.
LOCATION:Office
END:VEVENT
BEGIN:VEVENT
UID:uid30@example.com
DTSTAMP:${timeIncrement(friday, 16).toISOString()}
DTSTART:${timeIncrement(friday, 16).toISOString()}
DTEND:${timeIncrement(friday, 17).toISOString()}
SUMMARY:Personal Time
DESCRIPTION:Time off to pursue personal interests or relax.
LOCATION:Home
END:VEVENT
// End of Friday's Events

END:VCALENDAR
`
