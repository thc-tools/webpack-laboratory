let handleCss = require("../../lib/blocks/css");

let config;
describe("The CSS block", () => {
    describe("when called with no conf", () => {
        beforeEach(() => {
            config = handleCss()({}, {})();
        });
        it("should have setup loader", () => {
            expect(config.module.rules.length).toBeGreaterThan(0);
        });
        it("should have setup plugins", () => {
            expect(config.plugins.length).toBeGreaterThan(0);
        });
    });
});
