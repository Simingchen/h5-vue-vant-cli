const path = require('path')
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
// const CompressionPlugin = require('compression-webpack-plugin');//引入gzip压缩插件
const getDateTimes = new Date()
  .toLocaleString()
  .match(/\d+/g)
  .map((val) => {
    return val.length === 1 ? '0' + val : val
  })
  .join('')

// cdn开关
const OPEN_CDN = false
const assetsPath = 'static'
const resolve = (dir) => path.join(__dirname, dir)
// posix兼容方式处理路径
const posixJoin = (_path) => path.posix.join(assetsPath, _path)
const NODE_ENV = process.env.NODE_ENV
const hashName = NODE_ENV === 'production' ? getDateTimes : '[hash:8]'
console.log('ENV: ', NODE_ENV)

module.exports = {
  // 项目部署的基础路径, 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里, 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 `/my-app/`
  publicPath: NODE_ENV === 'production' ? '/' : '/',
  // 将构建好的文件输出到哪里
  outputDir: 'dist',
  //指定生成的index.html的输出路径，相对于outputDir。也可以是一个绝对路径。
  indexPath: 'index.html',
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: assetsPath,
  //是否在保存的时候检查
  lintOnSave: true,
  // 生产环境是否生成 SourceMap
  productionSourceMap: NODE_ENV !== 'production',
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require('os').cpus().length > 1,
  // 开发环境下 API 请求代理
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 10082,
    https: false,
    hotOnly: false,
    proxy: {
      '/apis': {
        target: 'https://app.imitu3.com/',
        pathRewrite: {
          // 重写接口
          '^/apis': '/',
        },
        ws: true,
        changeOrigin: true,
      },
    },
  },
  configureWebpack: (config) => {
    // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    config.resolve.extensions = ['.js', '.json', '.vue', '.css', '.scss', '.less']
    config.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      vant: 'vant',
    }

    if (NODE_ENV === 'production') {
      // 为生产环境修改配置...
      //防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
      // 开启cdn状态：externals不进入webpack打包
      if (OPEN_CDN) {
        config.externals = {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          vuex: 'Vuex',
          axios: 'axios',
        }
      }
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true)
    // 添加别名
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js').set('@', resolve('src')).set('@assets', resolve('src/assets')).set('@img', resolve('src/assets/img')).set('@css', resolve('src/style')).set('@views', resolve('src/views')).set('@components', resolve('src/components')).set('@utils', resolve('src/utils'))

    // 删除预加载
    config.plugins.delete('preload').delete('prefetch')
    if (NODE_ENV === 'production') {
      // 压缩代码
      config.optimization.minimize(true)
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'initial', //在做代码分割时，只对异步代码生效，写成all的话，同步异步代码都会分割
        minSize: 30000, //引入的包大于30KB才做代码分割
        minChunks: 1, //当一个包至少被用了多少次的时候才进行代码分割
        maxAsyncRequests: 5, //同时加载的模块数最多是5个
        maxInitialRequests: 5, //入口文件做代码分割最多能分成3个js文件
        automaticNameDelimiter: '~', //文件生成时的连接符
        name: true, //让cacheGroups里设置的名字有效
        cacheGroups: {
          vue: {
            name: 'vue-main',
            minChunks: 1,
            test: /[\\/]node_modules[\\/]_?(vue-router|vuex|axios|vue)(.*)/,
            reuseExistingChunk: true, //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
            enforce: true,
            priority: 100, //值越大,优先级越高.模块先打包到优先级高的组里
          },
          echarts: {
            name: 'echarts',
            minChunks: 1,
            test: /[\\/]node_modules[\\/]_?echarts(.*)/,
            reuseExistingChunk: true,
            enforce: true,
            priority: 80,
          },
          element: {
            name: 'element-ui',
            minChunks: 1,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
            reuseExistingChunk: true,
            enforce: true,
            priority: 70,
          },
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
        },
      })
      // 生产环境js增加版本号
      config.when(NODE_ENV, (config) => {
        config.output.set('filename', posixJoin(`js/[name].${hashName}.js`)).set('chunkFilename', posixJoin(`js/[name].${hashName}.js`))
      })
    }
    // 修改图片输出路径
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|ico)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10,
        // 以下配置项用于配置file-loader,将图片打包到dist/img文件夹下, 不配置则打包到dist文件夹下
        outputPath: assetsPath,
        // 配置打包后图片文件名
        name: `images/[name].${hashName}.[ext]`,
      })
      .end()
  },
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: {
      filename: posixJoin('css/[name].' + hashName + '.css'),
      chunkFilename: posixJoin('css/[name].' + hashName + '.css'),
    },
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    requireModuleExtension: true,
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 40,
            propList: ['*'],
          }),
        ],
      },
    },
  },
  // transpileDependencies: ['vuex-persist'],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: ['./src/style/variable.less'],
    },
  },
}
