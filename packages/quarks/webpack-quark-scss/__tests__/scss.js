let handleScss = require("../lib/scss");

let config;
describe("The SCSS block", () => {
    describe("when called with extractCss:true", () => {
        beforeEach(() => {
            config = handleScss({ extractCss: true })({}, {})();
        });
        it("should have setup loader", () => {
            expect(config.module.rules.length).toBe(1);
        });
        it("should have setup plugins", () => {
            expect(config.plugins.length).toBe(1);
        });
    });
});
