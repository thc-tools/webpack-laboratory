let utility = require("../../lib/blocks/utility");
let { envDefaults } = require("../../lib/utils");

let config;
describe("The sourcemap block", () => {
    describe("when called with default env", () => {
        beforeEach(() => {
            config = utility()(envDefaults({ NODE_ENV: "development" }), {})();
        });
        it("should have setup plugins", () => {
            expect(config.plugins.length).toBe(2);
        });
    });
});
