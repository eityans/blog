import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
// import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import { getAllPosts, getPaginatedPostData, Post } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";
import { ContentBody } from "../components/ContentBody";
import { Indicator } from "../components/post/pagenation/indicator";

export default function Home({ posts }: { posts: Post[] }) {
  // publishだがindexには動線を表示させない記事。直接記事ページには行ける。
  const EXPECT_SLUGS = ["test"];
  //console.log(posts);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>ゆるくやっていきます</p>
        <Link href={`/posts`}>記事一覧</Link>
      </section>

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
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPaginatedPostData(1);

  // postsが無ければ404にリダイレクトする
  if (!posts) {
    return {
      notFound: true,
    };
  }
  return {
    props: { posts: posts },
  };
};
