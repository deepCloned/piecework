const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'https://rob.megameta.cn/shop-front',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }))
}
