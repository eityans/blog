import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { OgpData } from "../../lib/ogp";

type Props = {
  ogp: OgpData;
};

export const OgpCard: React.FC<Props> = ({ ogp }) => {
  return (
    <a href={ogp.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
      <Card sx={{ display: "flex", my: 2, border: "1px solid #e0e0e0", boxShadow: "none" }}>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
          <CardContent sx={{ py: 1.5, px: 2 }}>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                lineHeight: 1.4,
                mb: 0.5,
              }}
            >
              {ogp.title}
            </Typography>
            {ogp.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  lineHeight: 1.4,
                  mb: 0.5,
                }}
              >
                {ogp.description}
              </Typography>
            )}
            <Typography variant="caption" color="text.disabled" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {ogp.siteName}
            </Typography>
          </CardContent>
        </Box>
        {ogp.image && (
          <CardMedia
            component="img"
            sx={{ width: 120, minHeight: 100, objectFit: "cover", flexShrink: 0 }}
            image={ogp.image}
            alt={ogp.title}
          />
        )}
      </Card>
    </a>
  );
};
