// eslint-disable-next-line no-undef
const TerserPlugin = require('terser-webpack-plugin')
// eslint-disable-next-line no-undef
module.exports = {
  publicPath: './',
  outputDir: '../color-manager/vue',
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/zh': {
        target: 'http://zhongguose.com',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/zh': ''
        }
      },
      '/hunt': {
        target: 'https://colorhunt.co',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/hunt': ''
        }
      },
      '/colormind': {
        target: 'http://colormind.io',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/colormind': ''
        }
      },
      '/picker': {
        target: 'http://webcolourdata.com',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/picker': ''
        }
      }
    }
  },
  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      ]
    }
  }

}
