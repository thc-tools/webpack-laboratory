let handleEntries = require("../lib/entry");

let config;
describe("The entry block", () => {
    describe("when called with simple conf", () => {
        beforeEach(() => {
            config = handleEntries({
                entries: {
                    main: "./src/app.js",
                    polyfill: ["@babel/polyfill", /*Needed for Opera Mini*/ "whatwg-fetch"]
                }
            })({}, {})();
        });
        it("should have setup polyfill entry", () => {
            expect(config.entry.polyfill).toBeDefined();
        });
        it("should have setup main entry", () => {
            expect(config.entry.main).toBeDefined();
        });
    });
});
