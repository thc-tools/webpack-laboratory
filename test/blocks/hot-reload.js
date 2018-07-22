let handleHot = require("../../lib/blocks/hot-reload");

let config;
describe("The hot reload block", () => {
    describe("when called with no conf", () => {
        beforeEach(() => {
            config = handleHot()({}, {})();
        });
        it("should not have setup plugins", () => {
            expect(config.plugins.length).toBe(0);
        });
    });
    describe("when called with HOT_RELOAD:'true'", () => {
        beforeEach(() => {
            config = handleHot()({ HOT_RELOAD: "true" }, {})();
        });
        it("should have setup plugins", () => {
            expect(config.plugins.length).toBe(2);
        });
    });
});
