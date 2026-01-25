import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import { getPaginatedPostData, getAllPosts, MAX_PAGE_ENTRY } from "../../lib/posts";
import { PostList, PostListProps } from "../../components/post/PostList";
import { extractCardUrls } from "../../lib/richTextUtils";
import { fetchOgpBatch } from "../../lib/ogp";

export default function Home({ posts, totalPages, currentPage, ogpMap }: PostListProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <PostList posts={posts} totalPages={totalPages} currentPage={currentPage} ogpMap={ogpMap} />
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

  const allUrls = posts.flatMap((post) => extractCardUrls(post.content));
  const ogpMapData = await fetchOgpBatch(allUrls);
  const ogpMap = Object.fromEntries(ogpMapData);

  return {
    props: { posts, totalPages, currentPage, ogpMap },
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
