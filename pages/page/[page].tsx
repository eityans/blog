import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import { getPaginatedPostData, getAllPosts, Post, MAX_PAGE_ENTRY } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import { ContentBody } from "../../components/ContentBody";

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getPaginatedPostData(Number(params.page));

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

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPosts = (await getAllPosts()).length;
  const totalPages = Math.ceil(totalPosts / MAX_PAGE_ENTRY); //後で定数化
  const paths = [];

  for (let page = 1; page <= totalPages; page++) {
    paths.push({ params: { page: page.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
};
