import { type BuildPaths, type BuildEnv } from './config/build/types/config'
import type webpack from 'webpack'
import path from 'path'
import {buildWebpackConfig} from './config/build/buildWebpackConfig'
export default (env: BuildEnv) => {

  const mode = env.mode ?? 'development'
  const isDev = mode === 'development'
  const PORT = env.port ?? 3000


  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    env: path.resolve(__dirname, isDev ? '.env.development' : '.env.production')
  }
  

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
    analyzer: env.analyzer
  })

  return config
}
