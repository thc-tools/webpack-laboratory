let { envDefaults, ensureConfig } = require("../lib/utils");
let config;
describe("The envDefaults function", () => {
    describe("when called without NODE_ENV", () => {
        it("should throw an error", () => {
            expect(() => envDefaults({})).toThrowError();
        });
    });
    describe("when called with wrong NODE_ENV value", () => {
        it("should throw an error", () => {
            expect(() => envDefaults({ NODE_ENV: "fake" })).toThrowError();
        });
    });
    describe("when called without OUTPUT_DIR value", () => {
        it("should throw an error", () => {
            expect(() => envDefaults({ NODE_ENV: "development" })).toThrowError();
        });
    });
    describe("when called with only NODE_ENV and OUTPUT_DIR", () => {
        beforeEach(() => {
            config = envDefaults({ NODE_ENV: "development", OUTPUT_DIR: "dist" });
        });
        it("should define ANALYZE, HOT_RELOAD and OUTPUT_PUBLIC_PATH", () => {
            expect(config.ANALYZE).toBeDefined();
            expect(config.HOT_RELOAD).toBeDefined();
            expect(config.OUTPUT_PUBLIC_PATH).toBeDefined();
        });
        it("should create defaults value", () => {
            expect(config.ANALYZE).toBe("false");
            expect(config.HOT_RELOAD).toBe("false");
            expect(config.OUTPUT_PUBLIC_PATH).toBe("/");
        });
    });
});
