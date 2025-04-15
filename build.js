import esbuild from 'esbuild'
import path from 'path'

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
    .catch(() => process.exit(1))
}

const buildForDevelopment = () => {
  esbuild
    .build({
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
      watch: {
        onRebuild(error, result) {
          if (error) console.error('Watch build failed:', error)
          else console.log('Watch build succeeded:', result)
        },
      },
    })
    .catch(() => process.exit(1))
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
  const { hosts, port } = await ctx.serve({
    servedir: 'public',
    host: 'localhost',
    port: 3000,
  })
  await ctx.watch()
  console.log(`Server running at http://${hosts[0] || 'localhost'}:${port}`)
}

// Check for command line arguments
const args = process.argv.slice(2)

if (args.includes('--dev')) {
  startDevServer()
} else if (args.includes('--watch')) {
  buildForDevelopment()
} else {
  buildForProduction()
}
