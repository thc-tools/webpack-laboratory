let handleCss = require("../lib/css");

let config;
describe("The CSS block", () => {
    describe("when called with extractCss:true", () => {
        beforeEach(() => {
            config = handleCss({ extractCss: true })({}, {})();
        });
        it("should have setup loader", () => {
            expect(config.module.rules.length).toBe(1);
        });
        it("should have setup plugins", () => {
            expect(config.plugins.length).toBe(1);
        });
    });
});
