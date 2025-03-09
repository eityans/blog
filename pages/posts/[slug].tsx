import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/layout";
import { Post as PostData, getAllPosts, getPostData } from "../../lib/posts";
import { ContentBody } from "../../components/ContentBody";

export default function Post({ post }: { post: PostData }) {
  return (
    <Layout>
      <Head>
        <meta property="og:type" content="article" />
        <meta name="og:title" content={post.title} />
        {/* 本文から何文字か抽出できると良いかも。もしくは、Contentfulのpostモデルに専用のカラムを追加しても良いかも */}
        <meta name="description" content="" />
        <title>{post.title}</title>
      </Head>
      <ContentBody post={post}/>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.slug);

  return {
    props: {
      post: postData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => {
    return {
      params: { slug: String(post.slug) },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
