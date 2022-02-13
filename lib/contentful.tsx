import * as contentful from "contentful";

const config =
  process.env.NODE_ENV === "development"
    ? {
        space: process.env.NEXT_PUBLIC_CTF_SPACE_ID,
        accessToken: process.env.CTF_PREVIEW_ACCESS_TOKEN,
        host: "preview.contentful.com",
      }
    : {
        space: process.env.NEXT_PUBLIC_CTF_SPACE_ID,
        accessToken: process.env.NEXT_PUBLIC_CTF_CDA_ACCESS_TOKEN,
      };

export const createClient = () => {
  return contentful.createClient(config);
};
