let sourcemap = require("../../lib/blocks/sourcemap");
let { envDefaults } = require("../../lib/utils");

let config;
describe("The sourcemap block", () => {
    describe("when called with NODE_ENV development", () => {
        beforeEach(() => {
            config = sourcemap()({ NODE_ENV: "development" }, {})();
        });
        it("should have setup loader for sourcemap", () => {
            expect(config.module.rules.length).toBeGreaterThan(0);
        });
    });
});
