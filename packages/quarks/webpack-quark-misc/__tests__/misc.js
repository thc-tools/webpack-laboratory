let miscHandle = require("../lib/misc");

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
        it("should have setup plugins", () => {
            expect(config.plugins.length).toBe(2);
        });
    });
});
