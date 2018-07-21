let handleEntries = require("../../lib/blocks/entry");

let config;
describe("The entry block", () => {
    describe("when called with no conf", () => {
        beforeEach(() => {
            config = handleEntries()({}, {})();
        });
        it("should have setup polyfill entry", () => {
            expect(config.entry.polyfill).toBeDefined();
        });
        it("should have setup main entry", () => {
            expect(config.entry.main).toBeDefined();
        });
    });
});
