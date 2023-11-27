import { mockICalData } from '../fixtures/mockICalData'

export const fetchICalCalendarData = async (url: string) => {
  console.log(url)

  // in development, we can't fetch the calendar data from the server because of CORS
  // TODO: SS temporarily disabled for demo
  // if (import.meta.env.DEV) {
  // set a timeout to simulate a slow network
  await new Promise(resolve => setTimeout(resolve, 1000))

  return mockICalData
  // }

  // const response = await fetch(url)
  // const data = await response.text()

  // return data
}
