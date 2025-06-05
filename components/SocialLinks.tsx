import Link from "next/link";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";

const WantedlyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.453 14.555c-.171-.111-.658-.764-2.006-3.982a9.192 9.192 0 0 0-.237-.526l-.274-.664-2.362-5.702H8.85l2.362 5.702 2.362 5.706 2.181 5.267a.196.196 0 0 0 .362 0l2.373-5.682a.1.1 0 0 0-.037-.119zm-8.85 0c-.171-.111-.658-.764-2.006-3.982a8.971 8.971 0 0 0-.236-.525l-.276-.665-2.36-5.702H0l2.362 5.702 2.362 5.706 2.181 5.267a.196.196 0 0 0 .362 0l2.374-5.682a.098.098 0 0 0-.038-.119ZM24 6.375a2.851 2.851 0 0 1-2.851 2.852 2.851 2.851 0 0 1-2.852-2.852 2.851 2.851 0 0 1 2.852-2.851A2.851 2.851 0 0 1 24 6.375Z" />
  </svg>
);

export default function SocialLinks() {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        component={Link}
        href="https://x.com/eityans"
        target="_blank"
        rel="noopener noreferrer"
        size="small"
        sx={{ color: "text.primary" }}
      >
        <XIcon />
      </IconButton>
      <IconButton
        component={Link}
        href="https://github.com/eityans"
        target="_blank"
        rel="noopener noreferrer"
        size="small"
        sx={{ color: "text.primary" }}
      >
        <GitHubIcon />
      </IconButton>
      <IconButton
        component={Link}
        href="https://www.wantedly.com/id/eityans"
        target="_blank"
        rel="noopener noreferrer"
        size="small"
        sx={{ color: "text.primary" }}
      >
        <WantedlyIcon />
      </IconButton>
      <IconButton
        component={Link}
        href="/rss"
        target="_blank"
        rel="noopener noreferrer"
        size="small"
        sx={{ color: "text.primary" }}
      >
        <RssFeedIcon />
      </IconButton>
    </Stack>
  );
}
