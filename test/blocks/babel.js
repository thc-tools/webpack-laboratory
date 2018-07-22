let handleJs = require("../../lib/blocks/babel");

let config;
describe("The Babel block", () => {
    describe("when called with no conf", () => {
        beforeEach(() => {
            config = handleJs()({}, {})();
        });
        it("should have setup loaders", () => {
            expect(config.module.rules.length).toBeGreaterThan(0);
        });
        it("should have setup extensions", () => {
            expect(config.resolve.extensions.length).toBeGreaterThan(0);
        });
    });
});
