import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import { getPaginatedPostData, getAllPosts, Post, MAX_PAGE_ENTRY } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import { PostList, PostListProps } from "../../components/post/PostList";

export default function Home({ posts, totalPages, currentPage }: PostListProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>ゆるくやっていきます</p>
      </section>

      <PostList posts={posts} totalPages={totalPages} currentPage={currentPage} />
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
