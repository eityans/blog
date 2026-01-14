import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/layout";
import { Post as PostData, getAllPosts, getPostData } from "../../lib/posts";
import { ContentBody } from "../../components/ContentBody";
import { extractCardUrls, extractPlainText } from "../../lib/richTextUtils";
import { fetchOgpBatch, OgpData } from "../../lib/ogp";

type Props = {
  post: PostData;
  ogpMap: Record<string, OgpData>;
  description: string;
};

export default function Post({ post, ogpMap, description }: Props) {
  return (
    <Layout>
      <Head>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta name="description" content={description} />
        <title>{post.title}</title>
      </Head>
      <ContentBody post={post} ogpMap={ogpMap} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.slug);
  const urls = extractCardUrls(postData.content);
  const ogpMapData = await fetchOgpBatch(urls);
  const ogpMap = Object.fromEntries(ogpMapData);
  const description = extractPlainText(postData.content);

  return {
    props: {
      post: postData,
      ogpMap,
      description,
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
