let handleAsset = require("../lib/assets");

let config;
describe("The asset block", () => {
    describe("when called with no conf", () => {
        beforeEach(() => {
            config = handleAsset()()();
        });
        it("should have setup loaders", () => {
            expect(config.module.rules.length).toBeGreaterThan(0);
        });
    });
});
