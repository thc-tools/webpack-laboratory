"use strict";

const path = require("path");

const isTrue = (value, defaultValue) => {
    return value !== undefined ? value === "true" : defaultValue;
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

    const isDev = env.NODE_ENV === "development";

    env.OUTPUT_DIR = env.OUTPUT_DIR || "./dist";
    env.OUTPUT_DIR = path.resolve(process.cwd(), env.OUTPUT_DIR);

    env.HOT_RELOAD = isTrue(env.HOT_RELOAD, isDev);
    env.ANALYZE = isTrue(env.ANALYZE, false);
    env.OUTPUT_PUBLIC_PATH = env.OUTPUT_PUBLIC_PATH || "/";

    if (env.HOT_RELOAD) {
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

module.exports = envDefaults;
