import { icons } from './config/vite/pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import million from 'million/compiler';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  return {
    base: '/',
    plugins: [
      react(),
      svgr(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 3000000
        },
        manifest: {
          name: 'Studlog',
          short_name: 'Studlog',
          description: 'Your life - your studlog.',
          theme_color: '#2962FF',
          icons
        }
      })
    ].concat(!isDev ? [million.vite({ auto: true }),] : []),
    define: {
      __IS_DEV__: JSON.stringify(isDev)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        process: 'process/browser',
      },
      extensions: [ '.ts', '.tsx', '.js' ],
    },
    css: {
      modules: {
        generateScopedName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
        auto: (resourcePath: string) => resourcePath.includes('.module.'),
      },
    },
    server: {
      port: 4000,
      open: true,
      historyApiFallback: true,
    },
    build: {
      outDir: 'build',
    },
  };
});
