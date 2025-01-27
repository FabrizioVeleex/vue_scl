const path = require('path')

module.exports = {
  publicPath: '/app/v1/scl',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: []
  }
}