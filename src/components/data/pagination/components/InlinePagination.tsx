import React from "react";
import { Box } from "@mui/material";
import clsx from "clsx";

// Inline Navigation Component
export const InlineNavigation: React.FC<{
  navigation: string;
  currentPage: number;
  totalPages: number;
  noDataFound: boolean;
  onPageChange: (page: number) => void;
  children: React.ReactNode;
  isLoading?: boolean;
  showNavigation?: boolean;
}> = ({
  navigation,
  currentPage,
  totalPages,
  noDataFound,
  onPageChange,
  children,
  isLoading = false,
  showNavigation = true,
}) => {
  if (navigation !== "Inline" || noDataFound || !showNavigation) return <>{children}</>;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        component="div"
        className="app-datanavigator"
        aria-disabled={currentPage <= 1 || isLoading}
        aria-label="Previous page navigation"
      >
        <ul className="pager">
          <li className={clsx("previous", { disabled: currentPage <= 1 || isLoading })}>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                if (currentPage > 1 && !isLoading) {
                  onPageChange(currentPage - 1);
                }
              }}
              aria-disabled={currentPage <= 1 || isLoading}
              style={{ cursor: currentPage <= 1 || isLoading ? "not-allowed" : "pointer" }}
            >
              <i className="wi wi-chevron-left" aria-hidden="true"></i>
              <span className="sr-only">
                Go to Previous page {currentPage <= 1 || isLoading ? ", Disabled" : ""}
              </span>
            </a>
          </li>
        </ul>
      </Box>

      <Box sx={{ opacity: isLoading ? 0.6 : 1, transition: "opacity 0.2s" }}>{children}</Box>

      <Box
        component="div"
        className="app-datanavigator"
        aria-disabled={currentPage >= totalPages || isLoading}
        aria-label="Next page navigation"
      >
        <ul className="pager">
          <li className={clsx("next", { disabled: currentPage >= totalPages || isLoading })}>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                if (currentPage < totalPages && !isLoading) {
                  onPageChange(currentPage + 1);
                }
              }}
              aria-disabled={currentPage >= totalPages || isLoading}
              style={{ cursor: currentPage >= totalPages || isLoading ? "not-allowed" : "pointer" }}
            >
              <i className="wi wi-chevron-right" aria-hidden="true"></i>
              <span className="sr-only">
                Go to Next page {currentPage >= totalPages || isLoading ? ", Disabled" : ""}
              </span>
            </a>
          </li>
        </ul>
      </Box>

      {/* Hidden page info for accessibility */}
      <Box component="div" aria-live="polite" aria-atomic="true" className="sr-only">
        Page {currentPage} of {totalPages}
      </Box>
    </Box>
  );
};
