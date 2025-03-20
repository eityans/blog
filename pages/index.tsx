import { GetStaticProps } from "next";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { getAllPosts, getPaginatedPostData, MAX_PAGE_ENTRY } from "../lib/posts";
import { PostList, PostListProps } from "../components/post/PostList";

export default function Home({ posts, totalPages, currentPage }: PostListProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <PostList posts={posts} totalPages={totalPages} currentPage={currentPage} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const currentPage = 1;
  const posts = await getPaginatedPostData(currentPage);
  const totalPosts = (await getAllPosts()).length;
  const totalPages = Math.ceil(totalPosts / MAX_PAGE_ENTRY);

  // postsが無ければ404にリダイレクトする
  if (!posts) {
    return { notFound: true };
  }
  return { props: { posts: posts, totalPages, currentPage } };
};
