"use strict";

const confWebpack = require("../templates/webpack.config");
let config;
describe("webpack-atom-js-react-css", () => {
    describe("for development purposes", () => {
        beforeEach(() => {
            config = confWebpack({ NODE_ENV: "development" });
        });
        it("should create a config", () => {
            expect(config).toBeDefined();
            // console.log("config: %j", config);
        });
    });
    describe("for production purposes", () => {
        beforeEach(() => {
            config = confWebpack({ NODE_ENV: "production" });
        });
        it("should create a config", () => {
            expect(config).toBeDefined();
            // console.log("config: %j", config);
        });
    });
});
