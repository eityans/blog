import * as React from "react";
import { Post } from "../lib/posts";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS, Text } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { Quote } from "../components/Quote";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";

type Props = {
  post: Post;
};

export const ContentBody: React.FC<Props> = (props) => {
  const post = props.post;
  return (
    <article>
      <Link href={`/posts/${post.slug}`}>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
      </Link>
      <div className={utilStyles.lightText}>
        <Date dateString={post.createdOn} />
      </div>

      {documentToReactComponents(post.content, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node) => {
            //TODO: アスペクト比を画像に合わせられるようにしたい
            return (
              <Image
                src={"https:" + node.data.target.fields.file.url}
                layout={"responsive"}
                alt={node.data.target.fields.title}
                width={800}
                height={450}
              />
            );
          },
          [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
            // Contentfulでhtmlエントリーで記述したhtmlを表示させる
            if (node.data.target.sys.contentType.sys.id === "html") {
              return <div dangerouslySetInnerHTML={{ __html: node.data.target.fields.body }}></div>;
            }
            return <div>{children}</div>;
          },
          [INLINES.HYPERLINK]: (node, _children) => {
            if (node.data.uri.indexOf("twitter.com") !== -1) {
              const tweetID = node.data.uri.match(/\d+$/)[0];
              return <TwitterTweetEmbed tweetId={tweetID} />;
            }
            return <Link href={node.data.uri}>{(node.content[0] as Text).value}</Link>;
          },
          // コードブロックをdivで括る
          [BLOCKS.PARAGRAPH]: (node, children) => {
            if (node.content.length === 1 && (node.content[0] as Text).marks.find((x) => x.type === "code")) {
              return <div>{children}</div>;
            }
            return <p>{children}</p>;
          },
          // 引用
          [BLOCKS.QUOTE]: (_node, children) => {
            return <Quote>{children}</Quote>;
          },
        },
        // コードブロック
        renderMark: {
          [MARKS.CODE]: (text) => (
            <SyntaxHighlighter language="javascript" style={okaidia} showLineNumbers>
              {text}
            </SyntaxHighlighter>
          ),
        },
      })}
    </article>
  );
};
