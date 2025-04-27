import fs from 'node:fs'
import path from 'node:path'

const workspace = process.cwd()
const blogsPath = path.join(workspace, 'src', 'app', 'blogs')
const distPath = path.join(workspace, 'dist', 'static')

export const copyMdFiles = () => {
  const files = fs.readdirSync(blogsPath)

  for (const file of files) {
    const src = path.join(blogsPath, file)
    const dest = path.join(distPath, file)

    if (file.endsWith('.md')) {
      fs.copyFileSync(src, dest)
      console.log(`${file} copied`)
    }
  }
}

// server bundle configuration
export const serverConfig = {
  bundle: true,
  platform: 'node',
  format: 'esm',
  packages: 'external',
  logLevel: 'error',
  sourcemap: 'external',
  entryPoints: {
    main: path.join(workspace, 'src', 'main.tsx'),
  },
  tsconfig: path.join(workspace, 'tsconfig.json'),
  outdir: path.join(workspace, 'dist'),
}

// client bundle configuration
export const clientConfig = {
  bundle: true,
  platform: 'browser',
  format: 'esm',
  sourcemap: 'external',
  logLevel: 'error',
  tsconfig: path.join(workspace, 'tsconfig.json'),
  entryPoints: {
    index: path.join(workspace, 'src', 'index.tsx'),
    style: path.join(workspace, 'src', 'index.css'),
  },
  outdir: path.join(workspace, 'dist', 'static'),
}
