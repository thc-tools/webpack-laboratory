let handleTs = require("../../lib/blocks/typescript");

let config;
describe("The Typescript block", () => {
    describe("when called with no conf", () => {
        beforeEach(() => {
            config = handleTs()({}, {})();
        });
        it("should have setup loaders", () => {
            expect(config.module.rules.length).toBeGreaterThan(0);
        });
        it("should have setup extensions", () => {
            expect(config.resolve.extensions.length).toBeGreaterThan(0);
        });
        it("should have setup plugins", () => {
            expect(config.plugins.length).toBeGreaterThan(0);
        });
    });
});
