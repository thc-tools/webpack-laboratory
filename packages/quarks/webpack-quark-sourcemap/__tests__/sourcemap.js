let sourcemap = require("../lib/sourcemap");

let config;
describe("The sourcemap block", () => {
    describe("when called with no args", () => {
        beforeEach(() => {
            config = sourcemap()({}, {})();
        });
        it("should have setup loader for sourcemap", () => {
            expect(config.module.rules.length).toBeGreaterThan(0);
        });
    });
});
