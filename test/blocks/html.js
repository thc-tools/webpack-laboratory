let htmlHandle = require("../../lib/blocks/html");

let config;
describe("The html block", () => {
    describe("when called with no conf", () => {
        beforeEach(() => {
            config = htmlHandle()({}, {})();
        });
        it("should have setup plugins", () => {
            expect(config.plugins.length).toBeGreaterThan(0);
        });
    });
});
