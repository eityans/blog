import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import { getPaginatedPostData, getAllPosts, Post, MAX_PAGE_ENTRY } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import { ContentBody } from "../../components/ContentBody";
import { Indicator } from "../../components/post/pagenation/indicator";

type Props = {
  posts: Post[];
  totalPages: number;
  currentPage: number;
};

export default function Home({ posts, totalPages, currentPage }: Props) {
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
      <Indicator
        totalPages={totalPages}
        currentPage={currentPage}
        prevDisabled={currentPage === 1}
        nextDisabled={currentPage === totalPages}
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentPage = Number(params.page);
  const posts = await getPaginatedPostData(currentPage);
  const totalPosts = (await getAllPosts()).length;
  const totalPages = Math.ceil(totalPosts / MAX_PAGE_ENTRY);

  // postsが無ければ404にリダイレクトする
  if (!posts) {
    return {
      notFound: true,
    };
  }
  return {
    props: { posts: posts, totalPages, currentPage },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPosts = (await getAllPosts()).length;
  const totalPages = Math.ceil(totalPosts / MAX_PAGE_ENTRY);
  const paths = [];

  for (let page = 1; page <= totalPages; page++) {
    paths.push({ params: { page: page.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
};
