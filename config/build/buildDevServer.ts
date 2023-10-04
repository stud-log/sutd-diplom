import { type BuildOptions } from './types/config'
import { type Configuration as DevServerConfiguration } from 'webpack-dev-server'

export function buildDevServer (options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    // автоматически открывать приложение в браузере
    open: true,
    // убирает ошибку cannot /GET при обновлении страницы не на main роуте
    historyApiFallback: true,
    // обовление сборки без перезагрузки страницы
    hot: true
  }
}
