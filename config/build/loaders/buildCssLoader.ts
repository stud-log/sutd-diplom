import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const buildCssLoaders = (isDev: boolean) => ({
  test: /\.s[ac]ss$/i,
  use: [
    // создает отдельные css файлы для каждого js
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    // Translates CSS into CommonJS
    {
      loader: 'css-loader',
      options: {
        modules: {
          auto: (resourcePath: string) => resourcePath.includes('.module.'),
          localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
        }
      }
    },
    // Compiles Sass to CSS
    'sass-loader'
  ]
})