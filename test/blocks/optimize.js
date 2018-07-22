let optimize = require("../../lib/blocks/optimize");

let config;
describe("The optimize block", () => {
    describe("when called with NODE_ENV: production", () => {
        beforeEach(() => {
            config = optimize()({ NODE_ENV: "production" }, {})();
        });
        it("should have setup minimize", () => {
            expect(config.optimization.minimize).toBeDefined();
        });
        it("should have setup mode", () => {
            expect(config.mode).toBeDefined();
        });
        it("should have setup bail", () => {
            expect(config.bail).toBeDefined();
        });
        it("should have setup optimization.splitChunks.chunks", () => {
            expect(config.optimization.splitChunks.chunks).toBeDefined();
        });
        it("should have setup optimization.minimizer", () => {
            expect(config.optimization.minimizer).toBeDefined();
        });
    });
});
