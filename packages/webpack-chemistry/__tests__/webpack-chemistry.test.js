
'use strict';

//const webpackAtomCssAssets = require('..');

describe('@thc/webpack-atom-css-assets', () => {
    it('needs tests', () => { });
});

// let { envDefaults, ensureConfig } = require("../lib/utils");
// let path = require("path");
// let config;
// describe("The envDefaults function", () => {
//     describe("when called without NODE_ENV", () => {
//         it("should throw an error", () => {
//             expect(() => envDefaults({})).toThrowError();
//         });
//     });
//     describe("when called with wrong NODE_ENV value", () => {
//         it("should throw an error", () => {
//             expect(() => envDefaults({ NODE_ENV: "fake" })).toThrowError();
//         });
//     });
//     describe("when called with only NODE_ENV", () => {
//         beforeEach(() => {
//             config = envDefaults({ NODE_ENV: "development" });
//         });
//         it("should define ANALYZE, HOT_RELOAD, OUTPUT_DIR and OUTPUT_PUBLIC_PATH", () => {
//             expect(config.ANALYZE).toBeDefined();
//             expect(config.HOT_RELOAD).toBeDefined();
//             expect(config.OUTPUT_DIR).toBeDefined();
//             expect(config.OUTPUT_PUBLIC_PATH).toBeDefined();
//         });
//         it("should create defaults value", () => {
//             expect(config.ANALYZE).toBe("false");
//             expect(config.HOT_RELOAD).toBe("false");
//             expect(config.OUTPUT_DIR).toBe(path.resolve(process.cwd(), "./dist"));
//             expect(config.OUTPUT_PUBLIC_PATH).toBe("/");
//         });
//     });
// });
