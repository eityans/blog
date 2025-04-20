import * as React from "react";
import { Block, Inline, Text } from "@contentful/rich-text-types/dist/types/types";
import Link from "next/link";
import { TwitterTweetEmbed } from "react-twitter-embed";

type Props = {
  node: Block | Inline;
};

// リンク

export const HyperLink: React.FC<Props> = ({ node }) => {
  if (node.data.uri.indexOf("twitter.com") !== -1) {
    const tweetID = node.data.uri.match(/\d+$/)[0];
    return <TwitterTweetEmbed tweetId={tweetID} />;
  }
  return <Link href={node.data.uri}>{(node.content[0] as Text).value}</Link>;
};
