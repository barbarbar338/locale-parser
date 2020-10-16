import { expect } from "chai";
import { I18n } from "../src/index";
let parser: I18n;
describe("I18n toJSON Test", () => {
    before(() => {
        parser = new I18n({
            defaultLocale: "en",
            directory: "./testLocales/",
        });
    });
    it("toJSON Without Args", () => {
        const obj = parser.toJSON();
        expect(obj)
            .to.have.property("tr")
            .with.has.property("info")
            .with.has.property("withArgs")
            .with.to.equal("5+5 %{result}'a eşittir");
        expect(obj)
            .to.have.property("en")
            .with.has.property("info")
            .with.has.property("withArgs")
            .with.to.equal("5+5 equals %{result}");
    });
    it("toJSON With Args", () => {
        const obj = parser.toJSON({ result: "10" });
        expect(obj)
            .to.have.property("tr")
            .with.has.property("info")
            .with.has.property("withArgs")
            .with.to.equal("5+5 10'a eşittir");
        expect(obj)
            .to.have.property("en")
            .with.has.property("info")
            .with.has.property("withArgs")
            .with.to.equal("5+5 equals 10");
    });
});
