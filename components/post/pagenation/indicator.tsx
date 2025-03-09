import * as React from "react";
import Link from "next/link";

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
    <ol>
      <li>
        {prevDisabled && <span>Previous page</span>}
        {!prevDisabled && <Link href={prevPageUrl}>Previous page</Link>}
      </li>
      <li>
        Page {currentPage} of {totalPages}
      </li>
      <li>
        {nextDisabled && <span>Next page</span>}
        {!nextDisabled && <Link href={nextPageUrl}>Next page</Link>}
      </li>
    </ol>
  );
};
