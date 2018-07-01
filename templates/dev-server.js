const devServer = require('@thc/webpack-react/lib/dev-server');
const webpackConf = require('./webpack.config.js');

const customConfig = {};

devServer(webpackConf(process.env), customConfig);