import { GetServerSideProps } from "next";
import RSS from "rss";
import { getAllPosts } from "../lib/posts";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = new RSS({
    title: "eityansメモ",
    description: "まったりやっていきます",
    feed_url: `https://www.eityans.com/rss`,
    site_url: "https://www.eityans.com/",
    language: "ja",
  });

  const posts = await getAllPosts();

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: "",
      url: `https://www.eityans.com/posts/${post.slug}`,
      date: new Date(post.createdOn),
    });
  });

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");

  res.write(feed.xml());
  res.end();

  return { props: {} };
};

export default function RSSPage() {
  return null;
}
