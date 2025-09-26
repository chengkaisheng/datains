'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

const CopyWebpackPlugin = require('copy-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
// 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

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

const port = process.env.port || process.env.npm_config_port || 9528 // dev port
module.exports = {
  productionSourceMap: false,
  // 使用mock-server
  devServer: {
    port: port,
    proxy: {
      '^(?!/login)': {
        // target: 'http://192.168.3.16:8081', // 张子航
        target: 'http://192.168.3.67:80', // 张子航
        // target: 'http://183.194.64.166:40147', // 线上
        ws: false
      }
    },
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js')
  },

  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    name: name,
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, 'static'),
          to: path.join(__dirname, 'dist/static')
        }
      ])
    ]
  },
  chainWebpack: config => {
    config.module.rules.delete('svg') // 删除默认配置中处理svg,
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    if (process.env.NODE_ENV === 'production') {
      /* config.plugin('compressionPlugin').use(new CompressionPlugin({
        test: /\.(js|css|less)$/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        minRatio: 0.8,
        deleteOriginalAssets: true // 删除源文件
      })) */
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/style/index.scss"`
      }
    }
  }

}
