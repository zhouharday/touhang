// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8888,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
<<<<<<< HEAD
<<<<<<< HEAD
            '/api':{
                // target:'http://192.168.0.191:9092',//平台
                target:'http://192.168.0.198:9091',
                // target: 'http://18f46963j4.iok.la',
                // target:'http://192.168.0.131:9092',// 文军凡IP
                // target:'http://192.168.0.133:9092',// 蔡永亮 IP
                // target:'http://100.64.33.181:9091',
                // target:'http://zhqwjmw.eicp.net',
                changeOrigin:true,
=======
            '/api': {
                target:'http://192.168.0.198:9091',
                // target:'http://192.168.0.147:9091',
                // target: 'http://18f46963j4.iok.la',
                changeOrigin: true,
>>>>>>> 8124bd4f94ded35fd1d506bee5293a60c0e96ad1
=======
            '/api':{
                target:'http://192.168.0.191:9091',//平台
                // target:'http://192.168.0.198:9092',//平台
                // target: 'http://18f46963j4.iok.la',
                // target:'http://192.168.0.131:9092',// 文军凡IP
                // target:'http://192.168.0.133:9092',// 蔡永亮 IP
                // target:'http://100.64.33.181:9091',
                // target:'http://zhqwjmw.eicp.net',
                changeOrigin:true,
>>>>>>> 0dabc773e3f961daffb052a33a3c47adb1c410b2
                secure: false,
                pathRewrite:{
                    '^/api/':''
                }
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
