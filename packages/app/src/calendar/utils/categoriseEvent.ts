import { CalendarEvent, CalendarEventCategories, CalendarEventCategory } from '../models'

const matchesCategory = (event: CalendarEvent, keywords: string[]) => {
  const eventText = (event.summary + ' ' + event.description).toLowerCase()

  return keywords.some(keyword => {
    // using word boundaries to ensure that we don't match substrings
    const regex = new RegExp(`\\b${keyword}\\b`, 'i')

    return regex.test(eventText)
  })
}

export const categoriseEvent = (
  event: CalendarEvent,
  categories: CalendarEventCategories,
): CalendarEventCategory['id'] => {
  const matchedCategory = Object.values(categories).find(category => matchesCategory(event, category.keywords))

  if (!matchedCategory) {
    return 'unspecified'
  }

  return matchedCategory.id
}
