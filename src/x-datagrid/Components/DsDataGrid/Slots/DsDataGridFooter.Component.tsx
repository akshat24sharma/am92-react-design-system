import React, { type FC, useMemo } from "react";

import type { CSSObject, SelectChangeEvent } from "@mui/material";

import { DsBox, DsPagination, DsSelect, DsStack, DsTypography } from "../../../../Components";

import { IDsDataGridFooterProps } from "../DsDataGrid.Types";

const SELECT_STYLES = {
  "& .MuiInputBase-root": {
    padding:
      "var(--ds-spacing-gelid) var(--ds-spacing-glacial)",
    borderRadius: "var(--ds-radius-glacial)",
  },
  "& .MuiSelect-select": {
    padding: "0",
  },
  "& .MuiSelect-icon": {
    right: "var(--ds-spacing-glacial)",
    fontSize: "var(--ds-typo-fontSizeCool)",
  },
} as CSSObject;

export const DsDataGridFooter: FC<IDsDataGridFooterProps> = (inProps) => {
  const {
    rowCount,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [],
    labelRowsPerPage,
    labelDisplayedRows,
    paginationProps,
    ...footerContainerProps
  } = inProps;

  const totalRowCount = rowCount ?? 10;
  const currentPage = page ?? 0;
  const itemsPerPage = pageSize ?? 10;

  const pageCount = Math.ceil(totalRowCount / itemsPerPage);
  const startIndex = currentPage * itemsPerPage + 1;
  const endIndex = Math.min((currentPage + 1) * itemsPerPage, totalRowCount);

  const displayedRowsText = useMemo(() => {
    if (typeof labelDisplayedRows === "function") {
      return labelDisplayedRows({
        from: startIndex,
        to: endIndex,
        rowCount: totalRowCount,
        page: currentPage + 1, // Convert to 1-indexed for display
      });
    }
    return `${startIndex}-${endIndex} of ${totalRowCount} entries`;
  }, [labelDisplayedRows, startIndex, endIndex, totalRowCount, currentPage]);

  const handlePageSizeChange = (event: SelectChangeEvent<unknown>) => {
    onPageSizeChange?.(event, null);
  };

  const formatOption = (option: number | { value: number; label: string }) => {
    const value = typeof option === "number" ? option : option.value;
    const label = typeof option === "number" ? String(option) : option.label;
    return { value: String(value), label };
  };

  return (
    <DsBox
      {...footerContainerProps}
      sx={{
        backgroundColor: "var(--ds-colour-surfaceBackground)",
        borderBottom: "1px solid var(--ds-colour-strokeDefault)",
        display: "flex",
        flexDirection: "column",
        padding: "var(--ds-spacing-cool)",
        width: "100%",
        ...footerContainerProps?.sx,
      }}
    >
      {/* Main Pagination Content */}
      <DsStack
        direction="row"
        spacing={3}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Rows Display Info - Left */}
        <DsTypography
          variant="bodyRegularMedium"
          color="var(--ds-colour-typoSecondary)"
        >
          {displayedRowsText}
        </DsTypography>

        {/* Page Navigation - Center */}
        <DsPagination
          count={pageCount}
          page={currentPage + 1} // DsPagination uses 1-indexed pages
          onChange={(_event, newPage) => {
            // Convert back to 0-indexed for internal state
            onPageChange?.(
              _event as React.MouseEvent<HTMLButtonElement>,
              newPage - 1,
            );
          }}
          shape="rounded"
          color="primary"
          sx={{
            ...paginationProps?.sx,
          }}
          {...paginationProps}
        />

        {/* Rows per page selector - Right */}
        <DsStack direction="row" spacing={3} sx={{ alignItems: "center" }}>
          <DsTypography
            variant="bodyRegularMedium"
            color="var(--ds-colour-typoSecondary)"
          >
            {labelRowsPerPage}
          </DsTypography>
          <DsSelect
            disabled={paginationProps?.disabled}
            sx={SELECT_STYLES}
            value={String(itemsPerPage)}
            onChange={handlePageSizeChange}
            options={pageSizeOptions.map(formatOption)}
          />
        </DsStack>
      </DsStack>
    </DsBox>
  );
};

export default DsDataGridFooter;
