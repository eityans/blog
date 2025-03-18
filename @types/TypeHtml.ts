import type { Entry, EntryFields } from "contentful";

export interface TypeHtmlFields {
    body: EntryFields.Text;
    description?: EntryFields.Symbol;
}

export type TypeHtml = Entry<TypeHtmlFields>;
