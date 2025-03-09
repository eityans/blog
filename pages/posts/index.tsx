import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Date from "../../components/date";
import Layout, { siteTitle } from "../../components/layout";
import { getAllPosts, Post } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

export default function Home({ posts }: { posts: Post[] }) {
  // publishだがindexには動線を表示させない記事。直接記事ページには行ける。
  const EXPECT_SLUGS = ["test"];
  //console.log(posts);

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {posts &&
            posts.map((post) => {
              if (EXPECT_SLUGS.includes(post.slug)) {
                return <></>;
              }
              return (
                <li className={utilStyles.listItem} key={post.slug}>
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={post.createdOn} />
                  </small>
                </li>
              );
            })}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();

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
