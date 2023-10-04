import { type BuildOptions } from './types/config'
import type webpack from 'webpack'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolves } from './buildResolves'
import { buildDevServer } from './buildDevServer'

export function buildWebpackConfig (options: BuildOptions): webpack.Configuration {
  const { mode, paths, isDev } = options
  return {
    mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.output,
      clean: true
    },
    plugins: buildPlugins(options),
    module: {
      // лоадеры, предназначенные для обработки файлов, не javascript: ts, png, css, jpg  и прочее
      rules: buildLoaders(options)
    },
    resolve: buildResolves(options),
    // при ошибке webpack будет писать, в каком именно файле она возникла
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined
  }
}
