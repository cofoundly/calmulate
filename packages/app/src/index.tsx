import '@/styles/index.css'

import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // @ts-expect-error @types/react is incorrect
  <StrictMode>
    <App />
  </StrictMode>,
)
