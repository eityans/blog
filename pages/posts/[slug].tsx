import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS, Text } from "@contentful/rich-text-types";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPosts, getPostData, Post as PostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";


export default function Post({ post }: { post: PostData }) {
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
            [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
              // Contentfulでhtmlエントリーで記述したhtmlを表示させる
              if (node.data.target.sys.contentType.sys.id === "html") {
                return <div dangerouslySetInnerHTML={{__html: node.data.target.fields.body}}></div>
              }
              return <div>{children}</div>;
            },
            [INLINES.HYPERLINK]: (node, children) => {
              if (node.data.uri.indexOf("twitter.com") !== -1) {
                const tweetID = node.data.uri.match(/\d+$/)[0];
                return <TwitterTweetEmbed tweetId={tweetID} />;
              }
              return <a href={node.data.uri}>{(node.content[0] as Text).value}</a>
            },
            // コードブロックをdivで括る
            [BLOCKS.PARAGRAPH]: (node, children) => {
              if (
                node.content.length === 1 &&
                (node.content[0] as Text).marks.find((x) => x.type === "code")
              ) {
                return <div>{children}</div>;
              }
              return <p>{children}</p>;
            },
          },
          // コードブロック
          renderMark: {
            [MARKS.CODE]: text => (
              <SyntaxHighlighter language="javascript" style={okaidia} showLineNumbers>
                {text}
              </SyntaxHighlighter>
            ),
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
