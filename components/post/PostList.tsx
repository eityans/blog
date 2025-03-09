import * as React from "react";
import { Post } from "../../lib/posts";
import { ContentBody } from "../ContentBody";
import utilStyles from "../../styles/utils.module.css";
import { Indicator } from "./pagenation/indicator";

export type PostListProps = {
  posts: Post[];
  totalPages: number;
  currentPage: number;
};

export const PostList: React.FC<PostListProps> = ({ posts, totalPages, currentPage }) => {
  // publishだがindexには動線を表示させない記事。直接記事ページには行ける。
  const EXPECT_SLUGS = ["test"];

  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <ul className={utilStyles.list}>
        {posts &&
          posts.map((post) => {
            if (EXPECT_SLUGS.includes(post.slug)) {
              return <></>;
            }
            return (
              <li className={utilStyles.listItem} key={post.slug}>
                <ContentBody post={post} />
              </li>
            );
          })}
      </ul>

      <Indicator
        totalPages={totalPages}
        currentPage={currentPage}
        prevDisabled={currentPage === 1}
        nextDisabled={currentPage === totalPages}
      />
    </section>
  );
};
