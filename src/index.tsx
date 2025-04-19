import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ResponsiveProvider } from './context/ResponsiveContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { App } from './App.tsx'
import Blog from './components/Blog.tsx'
import Nav from './components/design/Nav.tsx'

// type assertion here because ts needs to know that the element exists
const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <ResponsiveProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<div />} />
            <Route path="/contact" element={<div />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ResponsiveProvider>
  </React.StrictMode>,
)
