import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeHtmlFields {
    body: EntryFieldTypes.Text;
    description?: EntryFieldTypes.Symbol;
}

export type TypeHtmlSkeleton = EntrySkeletonType<TypeHtmlFields, "html">;
export type TypeHtml<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeHtmlSkeleton, Modifiers, Locales>;
export type TypeHtmlWithoutLinkResolutionResponse = TypeHtml<"WITHOUT_LINK_RESOLUTION">;
export type TypeHtmlWithoutUnresolvableLinksResponse = TypeHtml<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypeHtmlWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypeHtml<"WITH_ALL_LOCALES", Locales>;
export type TypeHtmlWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypeHtml<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypeHtmlWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypeHtml<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
