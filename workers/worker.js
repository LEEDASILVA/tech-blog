import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

import App from './dist/static/index.js'

const handleRequest = async request => {
  const url = new URL(request.url)
  const { pipe } = renderToPipeableStream(
    <StaticRouter location={url.pathname} context={{}}>
      <App />
    </StaticRouter>,
    {
      bootstrapModules: [`/static/index.js`], // Reference the bundled JS
      onShellReady() {
        const headers = {
          'Content-Type': 'text/html',
        }
        return new Response(pipe(), { headers })
      },
    },
  )

  return pipe
}

const handleStaticAssets = request => {
  const url = new URL(request.url)
  if (url.pathname.startsWith('/static/')) {
    const assetPath = url.pathname.replace('/static', './dist/static')
    return fetch(assetPath)
  }
  return null
}

addEventListener('fetch', event => {
  event.respondWith(
    handleStaticAssets(event.request) || handleRequest(event.request),
  )
})
