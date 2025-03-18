import type { Entry, EntryFields } from "contentful";

export interface TypePostFields {
    title: EntryFields.Symbol;
    content?: EntryFields.RichText;
    id?: EntryFields.Integer;
    slug: EntryFields.Symbol;
    createdAt?: EntryFields.Date;
    updatedAt?: EntryFields.Date;
    publishedAt?: EntryFields.Date;
    firstPublishedAt?: EntryFields.Date;
}

export type TypePost = Entry<TypePostFields>;
