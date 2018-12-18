let utility = require("../lib/utility");

let config;
describe("The sourcemap block", () => {
    describe("when called with default env", () => {
        beforeEach(() => {
            config = utility()({}, {})();
        });
        it("should have setup plugins", () => {
            expect(config.plugins.length).toBe(2);
        });
    });
});
