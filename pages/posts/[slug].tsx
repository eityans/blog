import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPosts, getPostData, Post as PostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ post }: { post: PostData }) {
  console.log(post.content);
  //<>{node.data.target.fields.body}</>,
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.createdOn} />
        </div>

        {documentToReactComponents(post.content, {
          renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => <img src={"https:" + node.data.target.fields.file.url} width={600} />,
            [INLINES.HYPERLINK]: (node) => {
              if (node.data.uri.indexOf("twitter.com") !== -1) {
                const tweetID = node.data.uri.match(/\d+$/)[0];
                return <TwitterTweetEmbed tweetId={tweetID} />;
              }
              return <></>;
            },
          },
        })}
      </article>
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
      params: { slug: post.slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
