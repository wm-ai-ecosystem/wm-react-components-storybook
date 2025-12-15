import React, { useRef, useEffect } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { BasicPaginationProps } from "./props";

export const BasicPagination: React.FC<BasicPaginationProps> = ({
  pageCount,
  currentPage,
  dataSize,
  maxResults,
  boundarylinks = false,
  directionlinks = true,
  navigationsize,
  navigationClass,
  maxsize = 5,
  onPageChange,
}) => {
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use requestAnimationFrame for immediate visual feedback without delay
    const rafId = requestAnimationFrame(() => {
      if (paginationRef.current) {
        const allLis = paginationRef.current.querySelectorAll(".MuiPagination-ul > li");

        allLis.forEach(li => {
          li.classList.remove("active");
          const anchor = li.querySelector("a");
          if (anchor?.classList.contains("Mui-selected")) {
            li.classList.add("active");
          }
        });
      }
    });

    return () => cancelAnimationFrame(rafId);
  }, [currentPage]);

  return (
    <Box
      ref={paginationRef}
      component="div"
      className={clsx("pagination", "basic", navigationClass)}
      role="navigation"
      aria-label={`Showing Page ${currentPage} of ${pageCount} pages`}
    >
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={onPageChange}
        showFirstButton={boundarylinks}
        showLastButton={boundarylinks}
        hidePrevButton={!directionlinks}
        hideNextButton={!directionlinks}
        size={navigationsize === "small" ? "small" : "medium"}
        siblingCount={Math.floor(maxsize / 2)}
        renderItem={item => (
          <PaginationItem
            {...item}
            sx={{
              cursor: "pointer",
            }}
            component="a"
            aria-current={item.selected ? "true" : undefined}
            aria-disabled={item.disabled ? "true" : undefined}
          />
        )}
      />
    </Box>
  );
};
