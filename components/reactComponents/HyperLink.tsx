import * as React from "react";
import { Block, Inline, Text } from "@contentful/rich-text-types/dist/types/types";
import Link from "next/link";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { OgpCard } from "./OgpCard";
import { OgpData } from "../../lib/ogp";

type Props = {
  node: Block | Inline;
  ogpMap?: Record<string, OgpData>;
};

export const HyperLink: React.FC<Props> = ({ node, ogpMap = {} }) => {
  const uri = node.data.uri;
  const textContent = (node.content[0] as Text).value;

  if (uri.indexOf("twitter.com") !== -1 || uri.indexOf("x.com") !== -1) {
    const tweetID = uri.match(/\d+$/)?.[0];
    if (tweetID) {
      return <TwitterTweetEmbed tweetId={tweetID} />;
    }
  }

  if (textContent === uri && ogpMap[uri]) {
    return <OgpCard ogp={ogpMap[uri]} />;
  }

  return <Link href={uri}>{textContent}</Link>;
};
