import * as React from "react";
import { Post } from "../lib/posts";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS, Text } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Quote } from "./reactComponents/Quote";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";
import { HyperLink } from "./reactComponents/HyperLink";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BlogCard } from "./reactComponents/BlogCard";

type Props = { post: Post };

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
            // Contentfulでpostエントリーからブログカードを作る
            if (node.data.target.sys.contentType.sys.id === "post") {
              return <BlogCard node={node} />;
            }
            // Contentfulでhtmlエントリーで記述したhtmlを表示させる
            if (node.data.target.sys.contentType.sys.id === "html") {
              return <div dangerouslySetInnerHTML={{ __html: node.data.target.fields.body }}></div>;
            }
            return <div>{children}</div>;
          },
          [INLINES.HYPERLINK]: (node, _children) => {
            return <HyperLink node={node} />;
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
            <SyntaxHighlighter language="javascript" showLineNumbers>
              {text}
            </SyntaxHighlighter>
          ),
        },
      })}
    </article>
  );
};
