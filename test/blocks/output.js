let output = require("../../lib/blocks/output");
let { envDefaults } = require("../../lib/utils");

let config;
describe("The output block", () => {
    describe("when called with default env", () => {
        beforeEach(() => {
            config = output()(envDefaults({ NODE_ENV: "development" }), {})();
        });
        it("should have setup filename", () => {
            expect(config.output.filename).toBeDefined();
        });
        it("should have setup path", () => {
            expect(config.output.path).toBeDefined();
        });
        it("should have setup publicPath", () => {
            expect(config.output.publicPath).toBeDefined();
        });
        it("should have setup chunkFilename", () => {
            expect(config.output.chunkFilename).toBeDefined();
        });
    });
});
