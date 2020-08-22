declare module "parsertypes" {
    export interface I18nOptions {
        directory?: string;
        defaultLocale: string;
    }
    export type I18nString = { [key: string]: string };
    export type I18nFile = Map<string, I18nString>;
    export type I18nLocales = Map<string, I18nFile>;    
}
