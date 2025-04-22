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
            return (
              <Image
                src={"https:" + node.data.target.fields.file.url}
                alt={node.data.target.fields.title}
                width={600}
                height={450}
                style={{ height: "auto" }}
              />
            );
          },
          [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
            if (node.data.target.sys.contentType.sys.id === "post") {
              console.log(node.data.target.fields);
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
          // 基本<p>でくくる</p>
          [BLOCKS.PARAGRAPH]: (node, children) => {
            if (
              (node.content.length === 1 && (node.content[0] as Text).marks.find((x) => x.type === "code")) ||
              (node.content.length === 3 && node.content[1].nodeType === "hyperlink")
            ) {
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
