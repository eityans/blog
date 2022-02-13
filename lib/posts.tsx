import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { createClient } from "./contentful";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

// export async function getPostData(id) {
//   const fullPath = path.join(postsDirectory, `${id}.md`)
//   const fileContents = fs.readFileSync(fullPath, 'utf8')

//   // Use gray-matter to parse the post metadata section
//   const matterResult = matter(fileContents)

//   // Use remark to convert markdown into HTML string
//   const processedContent = await remark()
//     .use(html)
//     .process(matterResult.content)
//   const contentHtml = processedContent.toString()

//   // Combine the data with the id and contentHtml
//   return {
//     id,
//     contentHtml,
//     ...(matterResult.data as { date: string; title: string })
//   }
// }

const client = createClient();

export interface Post {
  slug: string;
  title: string;
  content: any;
  createdOn: string;
}

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await client
      .getEntries<Post>({
        content_type: "post",
        order: "-sys.createdAt",
      })
      .catch((error) => {
        return error;
      });
    const posts = response.items.map((item) => {
      return {
        slug: item.fields.slug,
        title: item.fields.title,
        content: item.fields.content,
        createdOn: item.sys.createdAt,
      };
    });
    return posts;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPostData = async (slug): Promise<Post> => {
  try {
    const posts = await client
      .getEntries({
        content_type: "post",
        "fields.slug": slug,
      })
      .catch((error) => {
        return error;
      });
    const item = posts.items[0];
    return {
      slug: item.fields.slug,
      title: item.fields.title,
      content: item.fields.content,
      createdOn: item.sys.createdAt,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
