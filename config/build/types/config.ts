export type BuildMode = 'development' | 'production'

export interface BuildPaths {
  entry: string
  output: string
  html: string
  src: string
  env: string
}

export interface BuildOptions {
  mode: BuildMode
  paths: BuildPaths
  isDev: boolean
  port: number
  analyzer: boolean
}

export interface BuildEnv {
  mode: BuildMode
  port: number
  analyzer: boolean
}
