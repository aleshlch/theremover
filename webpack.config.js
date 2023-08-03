const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
        assetModuleFilename: 'assets/[hash][ext][query]'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "./dist"),
        },
    },
    module: {
        rules: [
          {
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          },
          {
            test: /\.(s(a|c)ss)$/,
            use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
         },
         {
            test: /\.(otf|svg)$/,
            use: {
              loader: 'url-loader',
            },
            type: 'asset/resource'
      },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'src/index.html',
          filename: 'index.html'
        }),
        new MiniCssExtractPlugin(),
        new Dotenv()
      ]
}