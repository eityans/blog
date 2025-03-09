import * as React from "react";
import Link from "next/link";
import Stack from "@mui/material/Stack";

type Props = {
  totalPages: number;
  currentPage: number;
  prevDisabled: boolean;
  nextDisabled: boolean;
};

export const Indicator: React.FC<Props> = ({ totalPages, currentPage, prevDisabled, nextDisabled }) => {
  const prevPageUrl = currentPage === 2 ? "/" : `/page/${currentPage - 1}`;
  const nextPageUrl = `/page/${currentPage + 1}`;

  return (
    <Stack direction="row" spacing={2} useFlexGap sx={{ width: "100%" }}>
      <>
        {prevDisabled && <span>前のページ</span>}
        {!prevDisabled && <Link href={prevPageUrl}>前のページ</Link>}
      </>

      <>
        ページ {currentPage} / {totalPages}
      </>

      <>
        {nextDisabled && <span>次のページ</span>}
        {!nextDisabled && <Link href={nextPageUrl}>次のページ</Link>}
      </>
    </Stack>
  );
};
