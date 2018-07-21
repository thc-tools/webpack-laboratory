const path = require("path");

const ensureConfig = config => {
    let builtConf = config || {};
    builtConf.output = builtConf.output || {};
    builtConf.entry = builtConf.entry || {};
    builtConf.watchOptions = builtConf.watchOptions || {};
    builtConf.optimization = builtConf.optimization || {};
    builtConf.optimization.splitChunks = builtConf.optimization.splitChunks || {};
    builtConf.optimization.minimizer = builtConf.optimization.minimizer || [];
    builtConf.resolve = builtConf.resolve || {};
    builtConf.resolve.extensions = builtConf.resolve.extensions || [];
    builtConf.module = builtConf.module || {};
    builtConf.module.rules = builtConf.module.rules || [];
    builtConf.plugins = builtConf.plugins || [];

    return builtConf;
};

const safeMerge = (defaults, config) => {
    return { ...(defaults || {}), ...(config || {}) };
};

const deduplicate = function deduplicate() {
    return Array.from(new Set(Array.from(arguments).reduce((acc, elt) => acc.concat(elt || []), [])));
};

const envDefaults = processEnv => {
    const env = { ...(processEnv || process.env) };

    if (env.NODE_ENV !== "development" && env.NODE_ENV !== "production") {
        throw new Error(
            "Using `@thc/webpack-react` requires that you specify `NODE_ENV`" +
                'environment variables. Valid values are "development" and "production". Instead, received: ' +
                JSON.stringify(env) +
                "."
        );
    }

    env.OUTPUT_DIR = env.OUTPUT_DIR || "./dist";

    env.OUTPUT_DIR = path.resolve(process.cwd(), env.OUTPUT_DIR);
    env.HOT_RELOAD = env.HOT_RELOAD || "false";
    env.ANALYZE = env.ANALYZE || "false";
    env.OUTPUT_PUBLIC_PATH = env.OUTPUT_PUBLIC_PATH || "/";

    if (env.HOT_RELOAD === "true") {
        env.DEV_SERVER_PROTOCOL = env.DEV_SERVER_PROTOCOL || "http";
        env.DEV_SERVER_HOST = env.DEV_SERVER_HOST || "localhost";
        env.DEV_SERVER_PORT = env.DEV_SERVER_PORT || "3000";
        env.DEV_SERVER_SUBDOMAIN = env.DEV_SERVER_SUBDOMAIN || "";
        env.OUTPUT_PUBLIC_PATH = `${env.DEV_SERVER_PROTOCOL}://${env.DEV_SERVER_HOST}:${env.DEV_SERVER_PORT}/${
            env.DEV_SERVER_SUBDOMAIN
        }`;
    }

    return env;
};

const createConfigurator = function createConfigurator(env, argv) {
    return config =>
        Array.from(arguments)
            .slice(2)
            .filter(Boolean)
            .map(confFunc => confFunc(env, argv))
            .reduce((conf, blockFunc) => blockFunc(conf), config || {});
};

module.exports = {
    envDefaults,
    ensureConfig,
    createConfigurator,
    safeMerge,
    deduplicate
};
