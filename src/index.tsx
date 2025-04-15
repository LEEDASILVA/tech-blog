import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Type assertion here because TypeScript needs to know that the element exists
const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
