import { createClient } from "./contentful";
import { EntryCollection } from "contentful";

const client = createClient();

export interface Post {
  slug: string;
  title: string;
  content: any;
  createdOn: string;
}

interface ContentfulPost {
  fields: { slug: string; title: string; content: any };
  sys: { createdAt: string; updatedAt: string };
}

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await client.getEntries<Post>({ content_type: "post", order: "-sys.createdAt" }).catch((error) => {
      return error;
    });

    return convertPostData(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const MAX_PAGE_ENTRY = 5;
export const getPaginatedPostData = async (page: number): Promise<Post[]> => {
  try {
    const response = await client
      .getEntries<Post>({
        content_type: "post",
        order: "-sys.createdAt",
        limit: MAX_PAGE_ENTRY,
        skip: MAX_PAGE_ENTRY * (page - 1),
      })
      .catch((error) => {
        return error;
      });

    return convertPostData(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPostData = async (slug): Promise<Post> => {
  try {
    const posts = await client.getEntries<Post>({ content_type: "post", "fields.slug": slug }).catch((error) => {
      return error;
    });

    return convertPostData(posts)[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const convertPostData = (posts: EntryCollection<Post>): Post[] => {
  return posts.items.map((item: ContentfulPost) => {
    return {
      slug: item.fields.slug,
      title: item.fields.title,
      content: item.fields.content,
      createdOn: item.sys.createdAt,
    };
  });
};
