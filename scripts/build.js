import { build } from 'esbuild'
import { copyMdFiles, clientConfig, serverConfig } from './config.js'

const bundle = async () => {
  copyMdFiles()
  await build({
    ...serverConfig,
    minify: true,
  })

  await build({
    ...clientConfig,
    minify: true,
  })
}

bundle()
