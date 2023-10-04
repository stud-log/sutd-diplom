import { type BuildOptions } from './types/config'
import type webpack from 'webpack'

export function buildResolves (options: BuildOptions): webpack.ResolveOptions {
  return {
    // задаем расширения, которые в импорте могут не указываться
    extensions: ['.tsx', '.ts', '.js'],
    // настройка абсолютных импортов
    preferAbsolute: true,
    modules: [options.paths.src, 'node_modules'],
    alias: {
      process: "process/browser"
    },
    mainFiles: ['index']
  }
}
