import { expect } from "chai";
import { I18n } from "../src/index";
let parser: I18n;
describe("I18n Locales Test", () => {
    before(() => {
        parser = new I18n({
            defaultLocale: "en",
            directory: "./testLocales/",
        });
    });
    it("Get Locales", () => {
        const locales = parser.getLocales();
        expect(locales).to.lengthOf(2);
        expect(locales).to.include("tr").include("en").not.include("lol");
    });
});
