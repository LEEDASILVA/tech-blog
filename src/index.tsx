import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './app/App.tsx'

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
