let handleHot = require("../lib/hot-reload");

let config;
describe("The hot reload block", () => {
    describe("when called with no conf", () => {
        beforeEach(() => {
            config = handleHot()({}, {})();
        });
        it("should have setup plugins", () => {
            expect(config.plugins.length).toBe(2);
        });
    });
    describe("when called with hot: false", () => {
        beforeEach(() => {
            config = handleHot({ hot: false })({}, {})();
        });
        it("should not have setup plugins", () => {
            expect(config.plugins.length).toBe(0);
        });
    });
});
