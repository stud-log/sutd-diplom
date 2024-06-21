import { type BuildOptions } from './types/config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';
import million from "million/compiler";
import { InjectManifest } from 'workbox-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';

export function buildPlugins ({ paths, isDev, analyzer }: BuildOptions): webpack.WebpackPluginInstance[] {
  return [
    million.webpack({ auto: true }),
    new HtmlWebpackPlugin({
      template: paths.html
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev)
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new Dotenv({
      path: paths.env
    }),
    
    new InjectManifest({
      swSrc: path.join(__dirname, '..', '..', 'src/service-worker.js'),
      swDest: 'service-worker.js',
    }),
    new WebpackPwaManifest({
      name: 'Stud.log',
      short_name: 'Stud.log',
      description: 'Stud.log',
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: path.join(__dirname, '..', '..', 'public/android-chrome-192x192.png'),
          sizes: [ 192, 512 ],
        },
      ],
    }),
  ];
}
