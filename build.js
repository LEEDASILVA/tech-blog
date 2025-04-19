import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import esbuild from 'esbuild'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, 'public')

function getContentType(ext) {
  switch (ext) {
    case '.html':
      return 'text/html'
    case '.js':
      return 'application/javascript'
    case '.css':
      return 'text/css'
    case '.json':
      return 'application/json'
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.svg':
      return 'image/svg+xml'
    default:
      return 'application/octet-stream'
  }
}

const startDevServer = async () => {
  const ctx = await esbuild.context({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    sourcemap: true,
    outfile: 'public/dist/bundle.js',
    loader: { '.ts': 'ts', '.tsx': 'tsx', '.js': 'jsx', '.css': 'css' },
    define: {
      'process.env.NODE_ENV': '"development"',
    },
    platform: 'browser',
    tsconfig: 'tsconfig.json',
  })

  await ctx.watch()
  const port = 3000

  const server = http.createServer((req, res) => {
    let reqPath = req.url?.split('?')[0] || '/'
    if (reqPath === '/') reqPath = '/index.html'

    const filePath = path.join(publicDir, reqPath)
    const ext = path.extname(filePath)

    fs.readFile(filePath, (err, data) => {
      if (err) {
        // fallback to index.html for SPA routes
        fs.readFile(
          path.join(publicDir, 'index.html'),
          (fallbackErr, fallbackData) => {
            if (fallbackErr) {
              res.writeHead(404)
              res.end('404 Not Found')
            } else {
              res.writeHead(200, { 'Content-Type': 'text/html' })
              res.end(fallbackData)
            }
          },
        )
      } else {
        const contentType = getContentType(ext)
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(data)
      }
    })
  })

  server.listen(port, () => {
    console.log(`✅ Dev server running at http://localhost:${port}`)
  })
}

const buildForProduction = () => {
  esbuild
    .build({
      entryPoints: ['src/index.tsx'],
      bundle: true,
      minify: true,
      sourcemap: true,
      outfile: 'public/dist/bundle.js',
      loader: { '.ts': 'ts', '.tsx': 'tsx', '.js': 'jsx', '.css': 'css' },
      define: {
        'process.env.NODE_ENV': '"production"',
      },
      platform: 'browser',
      tsconfig: 'tsconfig.json',
    })
    .then(() => {
      console.log('✅ Production build complete')
    })
    .catch(error => {
      console.error('❌ Build failed:', error)
      process.exit(1)
    })
}

// --- CLI args logic ---
const args = process.argv.slice(2)

if (args.includes('--dev')) {
  startDevServer()
} else {
  buildForProduction()
}
