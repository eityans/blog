import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
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
        <blockquote  className="twitter-tweet"><p lang="ja" dir="ltr">スマイルプリキュア</p>&mdash; 橋下徹 (@hashimoto_lo) <a href="https://twitter.com/hashimoto_lo/status/340640143058825216?ref_src=twsrc%5Etfw">June 1, 2013</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        {documentToReactComponents(post.content, {
          renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => <img src={"https:" + node.data.target.fields.file.url} width={600} />,
            ["embedded-entry-block"]: (node) => (
              <>
                <TwitterTweetEmbed
                  tweetId={'340640143058825216'}
                />
                <b>aaaa</b><br/><br/><br/><p>sss</p>
              </>),
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
