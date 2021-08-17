const path = require("path");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
// compression-webpack-plugin
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");
// 壓縮文件類型
const productionGzipExtensions = ["js", "css"];
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 效能測試用再打開
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "",
  devServer: {
    open: true, // dev-server 在服务器启动后打开浏览器
    host: "localhost", // 設置主機地址
    port: 8081, // 設置默認埠號
    https: false,
    //以上的ip和埠號是我們本機的;下面為需要跨域的
    proxy: {
      //配置跨域
      "/api": {
        // target: 'https://userapi.ge345.com/', // tpe aws測試站
        // target: 'http://liveh5.n9963.com/', // 總部
        // target: 'http://liveapi.n9963.com/', // 新客戶測試站:6686-tg_user
        target: "https://user168api.ge345.com/", // tpe測試站
        ws: true, // 如果要代理 websockets
        changOrigin: true, // 允許跨域
        pathRewrite: {
          "^/api": "", // 如果不希望传递 "/api"，则需要重写路径
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        _api: resolve("src/api"),
        _util: resolve("src/libs/utils"),
      },
    },
    plugins: [
      // new BundleAnalyzerPlugin(), // 效能測試用再打開
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp(".(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8,
      }),
      new PreloadWebpackPlugin({
        rel: "preload",
        as: "style",
      }),
    ],
  },
};
