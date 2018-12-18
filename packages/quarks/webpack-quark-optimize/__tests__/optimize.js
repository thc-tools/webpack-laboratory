let optimize = require("../lib/optimize");

let config;
describe("The optimize block", () => {
    describe("when called with minimize: true", () => {
        beforeEach(() => {
            config = optimize({ minimize: true })({}, {})();
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
