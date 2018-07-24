let handleScss = require("../../lib/blocks/scss");

let config;
describe("The SCSS block", () => {
    describe("when called with no conf", () => {
        beforeEach(() => {
            config = handleScss()({}, {})();
        });
        it("should have setup loader", () => {
            expect(config.module.rules.length).toBeGreaterThan(0);
        });
        it("should have setup plugins", () => {
            expect(config.plugins.length).toBeGreaterThan(0);
        });
    });
});
