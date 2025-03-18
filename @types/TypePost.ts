import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypePostFields {
    title: EntryFieldTypes.Symbol;
    content?: EntryFieldTypes.RichText;
    id?: EntryFieldTypes.Integer;
    slug: EntryFieldTypes.Symbol;
    createdAt?: EntryFieldTypes.Date;
    updatedAt?: EntryFieldTypes.Date;
    publishedAt?: EntryFieldTypes.Date;
    firstPublishedAt?: EntryFieldTypes.Date;
}

export type TypePostSkeleton = EntrySkeletonType<TypePostFields, "post">;
export type TypePost<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePostSkeleton, Modifiers, Locales>;
export type TypePostWithoutLinkResolutionResponse = TypePost<"WITHOUT_LINK_RESOLUTION">;
export type TypePostWithoutUnresolvableLinksResponse = TypePost<"WITHOUT_UNRESOLVABLE_LINKS">;
export type TypePostWithAllLocalesResponse<Locales extends LocaleCode = LocaleCode> = TypePost<"WITH_ALL_LOCALES", Locales>;
export type TypePostWithAllLocalesAndWithoutLinkResolutionResponse<Locales extends LocaleCode = LocaleCode> = TypePost<"WITHOUT_LINK_RESOLUTION" | "WITH_ALL_LOCALES", Locales>;
export type TypePostWithAllLocalesAndWithoutUnresolvableLinksResponse<Locales extends LocaleCode = LocaleCode> = TypePost<"WITHOUT_UNRESOLVABLE_LINKS" | "WITH_ALL_LOCALES", Locales>;
