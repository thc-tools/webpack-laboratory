const devServer = require("@thc/webpack-atom-js-react-css/lib/dev-server");
const webpackConf = require("./webpack.config.js");

const customConfig = {};

devServer(webpackConf(process.env), customConfig);
