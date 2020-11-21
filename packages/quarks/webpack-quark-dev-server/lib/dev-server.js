const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware");
const evalSourceMapMiddleware = require("react-dev-utils/evalSourceMapMiddleware");
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware");
const openBrowser = require("react-dev-utils/openBrowser");
const clearConsole = require("react-dev-utils/clearConsole");
const { choosePort, createCompiler, prepareUrls } = require("react-dev-utils/WebpackDevServerUtils");

const chalk = require("chalk");

const { envDefaults } = require("@thc/webpack-chemistry");

// Environment settings
const parsedEnv = envDefaults(process.env);
const {
    OUTPUT_DIR,
    DEV_SERVER_PROTOCOL,
    DEV_SERVER_HOST,
    DEV_SERVER_PORT,
    OUTPUT_PUBLIC_PATH,
    npm_package_name,
} = parsedEnv;
const isInteractive = process.stdout.isTTY;

const defaultServerConfig = {
    disableHostCheck: true,
    publicPath: OUTPUT_PUBLIC_PATH, // see https://webpack.js.org/configuration/dev-server/#devserver-publicpath-
    // Enable hot reloading server. It will provide WDS_SOCKET_PATH endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    // Use 'ws' instead of 'sockjs-node' on server since we're using native
    // websockets in `webpackHotDevClient`.
    transportMode: "ws",
    // Prevent a WS client from getting injected as we're already including
    // `webpackHotDevClient`.
    injectClient: false,
    // Enable custom sockjs pathname for websocket connection to hot reloading server.
    // Enable custom sockjs hostname, pathname and port for websocket connection
    // to hot reloading server.
    clientLogLevel: "none",
    sockHost: DEV_SERVER_HOST,
    sockPath: "/sockjs-node",
    sockPort: DEV_SERVER_PORT,
    // Enable gzip compression of generated files.
    compress: true,
    watchContentBase: true,
    quiet: true,
    overlay: false,
    https: DEV_SERVER_PROTOCOL === "https",
    historyApiFallback: true,
    contentBase: OUTPUT_DIR,
    // By default, proxy all request different from built files, to the API
    proxy: {},
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
    before(app, server) {
        // This lets us fetch source contents from webpack for the error overlay
        app.use(evalSourceMapMiddleware(server));
        // This lets us open files from the runtime error overlay.
        app.use(errorOverlayMiddleware());
        // This service worker file is effectively a 'no-op' that will reset any
        // previous service worker registered for the same host:port combination.
        // We do this in development to avoid hitting the production cache if
        // it used the same host and port.
        // https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432
        // app.use(noopServiceWorkerMiddleware());
    },
    after(app) {
        // Redirect to `PUBLIC_URL` or `homepage` from `package.json` if url not match
        // app.use(redirectServedPath(OUTPUT_PUBLIC_PATH));

        // This service worker file is effectively a 'no-op' that will reset any
        // previous service worker registered for the same host:port combination.
        // We do this in development to avoid hitting the production cache if
        // it used the same host and port.
        // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
        app.use(noopServiceWorkerMiddleware(OUTPUT_PUBLIC_PATH));
    },
};

module.exports = (webpackConfig, serverConfig = {}) => {
    // We attempt to use the default port but if it is busy, we offer the user to
    // run on a different port. `detect()` Promise resolves to the next free port.
    choosePort(DEV_SERVER_HOST, +DEV_SERVER_PORT)
        .then((port) => {
            if (port === null) {
                // We have not found a port.
                return;
            }

            const urls = prepareUrls(DEV_SERVER_PROTOCOL, DEV_SERVER_HOST, port);
            const devSocket = {
                warnings: (warnings) => devServer.sockWrite(devServer.sockets, "warnings", warnings),
                errors: (errors) => devServer.sockWrite(devServer.sockets, "errors", errors),
            };
            // Create a webpack compiler that is configured with custom messages.
            const compiler = createCompiler({
                appName: npm_package_name,
                useYarn: false,
                useTypeScript: false,
                tscCompileOnError: false,
                webpack,
                config: webpackConfig,
                urls,
            });

            const devServer = new WebpackDevServer(compiler, { ...defaultServerConfig, ...serverConfig });
            // Launch WebpackDevServer.
            devServer.listen(port, DEV_SERVER_HOST, (err) => {
                if (err) {
                    return console.log(err);
                }
                if (isInteractive) {
                    clearConsole();
                }
                console.log(chalk.cyan("Starting the development server at %s:%s...\n"), DEV_SERVER_HOST, port);
                openBrowser(urls.localUrlForBrowser);
            });

            ["SIGINT", "SIGTERM"].forEach((sig) => {
                process.on(sig, () => {
                    devServer.close();
                    process.exit();
                });
            });
        })
        .catch((err) => {
            if (err && err.message) {
                console.log(err.message);
            }
            process.exit(1);
        });
};
