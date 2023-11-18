import React from 'react'

import { Header } from '@/components/header/Header'

import { WeeklyCalendar } from './components/weeklyCalendar/WeeklyCalendar'

export const Dashboard = () => {
  return (
    <>
      <Header className="lg:hidden" />

      <WeeklyCalendar />
    </>
  )
}
