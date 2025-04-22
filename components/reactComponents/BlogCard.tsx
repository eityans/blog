import * as React from "react";
import { Block, Inline } from "@contentful/rich-text-types/dist/types/types";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type Props = {
  node: Block | Inline;
};

// Contentfulでpostエントリーからブログカードを作る

export const BlogCard: React.FC<Props> = ({ node }) => {
  const fields = node.data.target.fields;
  const truncate = (str: string, length: number): string => {
    if (str.length <= length) {
      return str;
    }
    return str.substring(0, length) + "…";
  };

  return (
    <Link href={`/posts/${fields.slug}`} style={{ textDecoration: "none" }}>
      <Card>
        <CardContent sx={{ height: "100%" }}>
          <Typography variant="h6" component="div">
            {fields.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {truncate(
              fields.content.content
                .map((element) => {
                  return element.content[0]?.value || "";
                })
                .join(),
              200
            )}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
