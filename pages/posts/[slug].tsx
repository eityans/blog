import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS, Text } from "@contentful/rich-text-types";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from 'next/image';
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Quote } from "../../components/Quote";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { Post as PostData, getAllPosts, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";


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
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.createdOn} />
        </div>

        {documentToReactComponents(post.content, {
          renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
              //TODO: アスペクト比を画像に合わせられるようにしたい
              return <Image src={"https:" + node.data.target.fields.file.url} layout={"responsive"} alt={node.data.target.fields.title} width={800} height={450}/>

            },
            [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
              // Contentfulでhtmlエントリーで記述したhtmlを表示させる
              if (node.data.target.sys.contentType.sys.id === "html") {
                return <div dangerouslySetInnerHTML={{__html: node.data.target.fields.body}}></div>
              }
              return <div>{children}</div>;
            },
            [INLINES.HYPERLINK]: (node, _children) => {
              if (node.data.uri.indexOf("twitter.com") !== -1) {
                const tweetID = node.data.uri.match(/\d+$/)[0];
                return <TwitterTweetEmbed tweetId={tweetID} />;
              }
              return <Link href={node.data.uri}>{(node.content[0] as Text).value}</Link>
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
            // 引用
            [BLOCKS.QUOTE]: (_node, children) => {
              return <Quote >{children}</Quote>
            }
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
