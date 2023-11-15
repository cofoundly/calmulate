import React, { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

type MockRouterProps = {
  children: ReactNode
}

export const MockRouter = ({ children }: MockRouterProps) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={children} />
      </Routes>
    </MemoryRouter>
  )
}
