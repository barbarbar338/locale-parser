import { expect } from "chai";
import { I18n } from "../src/index";
let parser: I18n;
describe("I18n Parse / Get Test", () => {
    before(() => {
        parser = new I18n({
            defaultLocale: "en",
            directory: "./testLocales/"
        });
    });
    it("Get Strings From Keys", () => {
        expect(parser.get("en", "info", "noArgs")).to.equal("This is a string with no arguments or constants");
        expect(parser.get("tr", "info", "noArgs")).to.equal("Bu herhangi bir constant veya argüman barındırmayan bir string");
        expect(parser.get("lol", "info", "noArgs")).to.equal("This is a string with no arguments or constants");
    });
    it("Get Strings With Constants From Keys", () => {
        expect(parser.get("en", "info", "introduce")).to.equal("Hey, It's barbarbar338! Send e-mails to demirci.baris38@gmail.com");
        expect(parser.get("tr", "info", "introduce")).to.equal("Selam, ben barbarbar338! demirci.baris38@gmail.com'a e-posta atın!");
        expect(parser.get("lol", "info", "introduce")).to.equal("Hey, It's barbarbar338! Send e-mails to demirci.baris38@gmail.com");
    });
    it("Get String With Arguments From Keys", () => {
        expect(parser.get("en", "info", "withArgs", { result: "10" })).to.equal("5+5 equals 10");
        expect(parser.get("tr", "info", "withArgs", { result: "10" })).to.equal("5+5 10'a eşittir");
        expect(parser.get("lol", "info", "withArgs", { result: "10" })).to.equal("5+5 equals 10");
    });
    it("Get String With Arguments And Constants From Keys", () => {
        expect(parser.get("en", "info", "withArgsAndConstants", { result: "10" })).to.equal("barbarbar338 says: 5+5 equals 10");
        expect(parser.get("tr", "info", "withArgsAndConstants", { result: "10" })).to.equal("barbarbar338 diyor ki: 5+5 10'a eşittir");
        expect(parser.get("lol", "info", "withArgsAndConstants", { result: "10" })).to.equal("barbarbar338 says: 5+5 equals 10");
    });
});
