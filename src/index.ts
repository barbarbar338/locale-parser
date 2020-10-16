import yaml from "yaml";
import fs from "fs";
import path from "path";
import {
    I18nOptions,
    I18nLocales,
    I18nFile,
    I18nString,
    I18nToJSON,
    I18nConstants,
    I18nArgs,
} from "parsertypes";

export class I18n {
    private locales: I18nLocales;
    private directory: string;
    private defaultLocale: string;
    private constants?: I18nConstants;
    constructor(options: I18nOptions) {
        this.directory = path.resolve(
            options.directory ? options.directory : "./locales",
        );
        this.defaultLocale = options.defaultLocale;
        this.locales = new Map<string, I18nFile>();
        const localeArray = fs
            .readdirSync(this.directory)
            .filter((file) =>
                fs.statSync(path.join(this.directory, file)).isDirectory(),
            );
        localeArray.forEach((locale) => {
            const localeMap = new Map<string, I18nString>();
            const fileArray = fs
                .readdirSync(path.join(this.directory, locale))
                .filter(
                    (file) =>
                        !fs
                            .statSync(path.join(this.directory, locale, file))
                            .isDirectory(),
                )
                .filter((file) => file.endsWith(".yaml"));
            fileArray.forEach((section) => {
                const filePath = path.join(this.directory, locale, section);
                const file = fs.readFileSync(filePath, "utf8");
                const fileObject = yaml.parse(file);
                localeMap.set(section.replace(".yaml", ""), fileObject);
            });
            this.locales.set(locale, localeMap);
        });
        if (fs.existsSync(path.join(this.directory, "constants.yaml"))) {
            const filePath = path.join(this.directory, "constants.yaml");
            const file = fs.readFileSync(filePath, "utf8");
            const fileObject = yaml.parse(file);
            this.constants = fileObject;
        }
    }
    private resolveString(
        locale: string,
        section: string,
        key: string,
    ): string | string[] {
        const localeMap =
            this.locales.get(locale) || this.locales.get(this.defaultLocale);
        if (!localeMap) return `Locale '${locale}' not found.`;
        const sectionMap = localeMap.get(section);
        if (!sectionMap)
            return `Section '${section}' not found in locale '${locale}'`;
        const stringFromKey = sectionMap[key];
        if (!stringFromKey)
            return `Key '${key}' not found in section ${section} in locale '${locale}'`;
        return stringFromKey;
    }
    private replace(
        content: string | string[],
        args?: I18nArgs,
    ): string | string[] {
        if (args) {
            for (const arg in args) {
                const regToken = new RegExp(`%{${arg}}`, "gm");
                if (Array.isArray(content)) {
                    content = content.map((str) =>
                        str.replace(regToken, args[arg]),
                    );
                } else {
                    content = content.replace(regToken, args[arg]);
                }
            }
        }
        const allConstants = this.constants;
        if (allConstants) {
            for (const constant in allConstants) {
                const regToken = new RegExp(`%{${constant}}`, "gm");
                if (Array.isArray(content)) {
                    content = content.map((str) =>
                        str.replace(regToken, allConstants[constant]),
                    );
                } else {
                    content = content.replace(regToken, allConstants[constant]);
                }
            }
        }
        return content;
    }
    public getLocales(): string[] {
        return Array.from(this.locales.keys());
    }
    public getConstant(constant?: string): string | I18nConstants | undefined {
        if (constant)
            return this.constants ? this.constants[constant] : undefined;
        else return this.constants;
    }
    public toJSON(args?: I18nArgs): I18nToJSON {
        const payload: I18nToJSON = { constants: this.constants };
        const localeIterator = this.getLocales();
        localeIterator.forEach((locale) => {
            const localeObj: I18nToJSON = {};
            const file = this.locales.get(locale) as I18nFile;
            const sectionIterator = Array.from(file.keys());
            sectionIterator.forEach((section) => {
                const stringObject = file.get(section) as I18nString;
                for (const str in stringObject) {
                    stringObject[str] = this.replace(stringObject[str], args);
                }
                localeObj[section] = stringObject;
            });
            payload[locale] = localeObj;
        });
        return payload;
    }
    public get(
        locale: string,
        section: string,
        key: string,
        args?: I18nArgs,
    ): string | string[] {
        const resolvedString = this.resolveString(locale, section, key);
        const replacedString = this.replace(resolvedString, args);
        return replacedString;
    }
}
