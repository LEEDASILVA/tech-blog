import path from 'node:path'
import express, { type Request, type Response } from 'express'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './app/App.tsx'

const app = express()
const port = 3000
const workspace = process.cwd()

// serve static files like js bundles and css files
app.use('/static', express.static(path.join(workspace, 'dist', 'static')))

// server files from the /public folder
app.use(express.static(path.join(workspace, 'public')))

// fallback to render the SSR react app
app.use((request: Request, response: Response) => {
  // react ssr rendering as a stream
  const { pipe } = renderToPipeableStream(
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Code Grimoire</title>
        <link rel="icon" href="favicon.png" type="image/png" />
        <link rel="stylesheet" href="/static/style.css" />
      </head>
      <body>
        <base href="/" />
        <div id="root">
          <StaticRouter location={request.url}>
            <App />
          </StaticRouter>
        </div>
      </body>
    </html>,
    {
      bootstrapModules: [`/static/index.js`], // load script as modules
      onShellReady() {
        response.setHeader('content-type', 'text/html')
        pipe(response)
      },
    },
  )
})

app.listen(port, () => {
  console.log(`[localhost] listening on port ${port}`)
})
