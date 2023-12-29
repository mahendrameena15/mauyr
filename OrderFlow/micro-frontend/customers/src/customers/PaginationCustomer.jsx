import { Button } from "@material-tailwind/react";
import { useCallback, useState } from "react";

function Button2({ content, onClick, active, disabled }) {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
      ${active ? "bg-[#F8FAFC] text-[#147D73]" : "text-[#667085]"}
     
      `}
      onClick={onClick}
      disabled={disabled}
      style={{ width: "2.25rem", height: "2.25rem" }}
    >
      {content}
    </button>
  );
}

function PaginationNav1({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  onPageChange,
}) {
  const renderPageLinks = useCallback(() => {
    if (pageCount === 0) return null;
    const visiblePageButtonCount = 6;
    let numberOfButtons =
      pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount;
    const pageIndices = [pageIndex];
    numberOfButtons--;
    [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
      const pageNumberBefore = pageIndices[0] - 1;
      const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
      if (
        pageNumberBefore >= 1 &&
        (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount)
      ) {
        pageIndices.unshift(pageNumberBefore);
      } else {
        pageIndices.push(pageNumberAfter);
      }
    });
    return pageIndices.map((pageIndexToMap) => (
      <li key={pageIndexToMap}>
        <Button2
          content={pageIndexToMap}
          onClick={() => {
            onPageChange(pageIndexToMap);
            gotoPage(pageIndexToMap); // Adjusted for 1-based indexing
          }}
          active={pageIndex === pageIndexToMap}
        />
      </li>
    ));
  }, [pageCount, pageIndex]);
  return (
    <>
      <Button
        variant="outlined"
        size="sm"
        onClick={() => {
          if (pageIndex > 1) {
            onPageChange(pageIndex - 1);
            gotoPage(pageIndex - 1);
          }
        }}
        disabled={!canPreviousPage}
      >
        Previous
      </Button>

      <ul className="flex gap-2">{renderPageLinks()}</ul>

      <Button
        variant="outlined"
        size="sm"
        onClick={() => {
          onPageChange(pageIndex + 1);
          gotoPage(pageIndex + 1);
        }}
        disabled={!canNextPage}
      >
        Next
      </Button>
    </>
  );
}

function PaginationCustomer({ totalPages, pageIndex, setPageIndex }) {
  const pageCount = totalPages;

  return (
    <PaginationNav1
      gotoPage={setPageIndex}
      canPreviousPage={pageIndex > 0}
      canNextPage={pageIndex < pageCount}
      pageCount={pageCount}
      pageIndex={pageIndex}
      onPageChange={(newPageIndex) => {
        setPageIndex(newPageIndex);
      }}
    />
  );
}

export { PaginationCustomer };
