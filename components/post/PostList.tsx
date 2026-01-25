import * as React from "react";
import { Post } from "../../lib/posts";
import { ContentBody } from "../ContentBody";
import { Indicator } from "./pagenation/indicator";
import { OgpData } from "../../lib/ogp";

export type PostListProps = { posts: Post[]; totalPages: number; currentPage: number; ogpMap?: Record<string, OgpData> };

export const PostList: React.FC<PostListProps> = ({ posts, totalPages, currentPage, ogpMap = {} }) => {
  // publishだがindexには動線を表示させない記事。直接記事ページには行ける。
  const EXPECT_SLUGS = ["test"];

  return (
    <>
      {posts &&
        posts.map((post) => {
          if (!post.slug || EXPECT_SLUGS.includes(post.slug)) {
            return null;
          }
          return <ContentBody post={post} key={post.slug} ogpMap={ogpMap} />;
        })}

      <Indicator
        totalPages={totalPages}
        currentPage={currentPage}
        prevDisabled={currentPage === 1}
        nextDisabled={currentPage === totalPages}
      />
    </>
  );
};
