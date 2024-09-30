import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import TerserPlugin from 'terser-webpack-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getEntryFiles = directory => {
  const files = fs.readdirSync(path.join(__dirname, directory))
  const entryPoints = {}

  files.filter(file => {
    if (file.endsWith('.js')) {
      entryPoints[`${file.replace('.js', '')}`] = path.join(__dirname, directory, file)
    }
  })

  return entryPoints
}
const webpackConfig = (directories, devMode) => {
  return {
    mode: devMode ? 'development' : 'production',
    entry: getEntryFiles(directories.src),
    output: {
      path: path.join(__dirname, directories.dest),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: { comments: false },
            compress: { drop_console: true }
          },
          extractComments: false
        })
      ]
    }
  }
}

export default webpackConfig