/*
 * @Author: AlexZ33 775136985@qq.com
 * @Date: 2022-10-27 23:42:30
 * @LastEditors: AlexZ33 775136985@qq.com
 * @FilePath: /webgl-col/config/webpack.demo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const  path = require("path")

const isProd = process.env.NODE_ENV === 'production';

const webpackConfig = {
    mode: process.env.NODE_ENV,
    entry:  path.resolve(process.cwd(), './demos/entry.js'),
    output: {
        path: path.resolve(process.cwd(), './demos/webgin-engine/'),
        publicPath: '',
        filename: '[name].[hash:7].js',
        chunkFilename: isProd ? '[name].[hash:7].js' : '[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'packages': path.resolve(__dirname, '../src/packages'),
          },
          modules: ['node_modules']
    },
    devServer: {
        host: '0.0.0.0',
        port: 8082,
        publicPath: '/',
        hot: true,
        open: true
      },
      performance: {
        hints: false
      },
      stats: {
        children: false
      },
      rules: [
        {
          enforce: 'pre',
          test: /\.(vue|jsx?)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        {
          test: /\.(jsx?|babel|es6)$/,
          include: process.cwd(),
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        },
        {
          test: /\.(scss|css)$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                minimize: true, // css压缩
                plugins: [require("autoprefixer")("last 100 versions")]
              }
            }
          ]
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: 'vue-loader',
              options: {
                compilerOptions: {
                  preserveWhitespace: false
                }
              }
            },
            {
              loader: path.resolve(__dirname, './md-loader/index.js')
            }
          ]
        },
        {
          test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
          loader: 'url-loader',
          // todo: 这种写法有待调整
          query: {
            limit: 10000,
            name: path.posix.join('static', '[name].[hash:7].[ext]')
          }
        }
      ]
    },
  
}