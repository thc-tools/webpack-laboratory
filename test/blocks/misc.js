let miscHandle = require("../../lib/blocks/misc");

let config;
describe("The misc block", () => {
    describe("when called with no conf", () => {
        beforeEach(() => {
            config = miscHandle()({}, {})();
        });
        it("should have setup watch options", () => {
            expect(config.watchOptions.ignored).toBeDefined();
        });
        it("should have setup stats", () => {
            expect(config.stats).toBeDefined();
        });
    });
});
