import { expect } from "chai";
import { I18n } from "../src/index";
let parser: I18n;
describe("I18n Constants Test", () => {
    before(() => {
        parser = new I18n({
            defaultLocale: "en",
            directory: "./testLocales/",
        });
    });
    it("Get Constants", () => {
        const constants = parser.getConstant();
        expect(constants)
            .to.have.property("owner.name")
            .to.equal("barbarbar338");
        expect(constants)
            .to.have.property("owner.mail")
            .to.equal("demirci.baris38@gmail.com");
        expect(constants)
            .to.have.property("contact")
            .to.equal("https://barbarbar338.fly.dev/discord");
    });
    it("Get Specified Constant", () => {
        expect(parser.getConstant("owner.name")).to.equal("barbarbar338");
        expect(parser.getConstant("owner.mail")).to.equal(
            "demirci.baris38@gmail.com",
        );
        expect(parser.getConstant("contact")).to.equal(
            "https://barbarbar338.fly.dev/discord",
        );
    });
});
