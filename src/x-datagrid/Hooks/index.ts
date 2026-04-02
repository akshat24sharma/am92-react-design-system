import type React from "react";
import { useCallback, useState } from "react";
import type { SelectChangeEvent } from "@mui/material";
import type { GridPaginationModel } from "@mui/x-data-grid";
import { IDsDataGridProps } from "../Components";

/**
 *
 * Supports both controlled and uncontrolled pagination modes:
 * - **Controlled**: Parent provides `paginationModel` and `onPaginationModelChange`.
 * - **Uncontrolled**: Internal state manages pagination; parent is optionally notified.
 *
 */
export const useDsDataGridPagination = (props: IDsDataGridProps) => {
  const onPaginationModelChange = props.onPaginationModelChange;

  // Consider external pagination callback only when a valid function is passed.
  const hasOnPaginationModelChangeHandler =
    typeof onPaginationModelChange === "function";

  // Controlled mode requires both model and change handler from parent.
  const isPaginationModelControlled =
    props.paginationModel !== undefined && hasOnPaginationModelChangeHandler;

  const [internalPaginationModel, setInternalPaginationModel] = useState({
    page: props.initialState?.pagination?.paginationModel?.page || 0,
    pageSize: props.initialState?.pagination?.paginationModel?.pageSize || 10,
  });

  // Resolve the active pagination model — prefer controlled, fallback to internal.
  const paginationModel = props.paginationModel ?? internalPaginationModel;

  /**
   * Handles pagination model changes for both controlled and uncontrolled usage.
   * Updates internal state only in uncontrolled mode and always notifies parent if callback exists.
   */
  const handlePaginationModelChange = useCallback(
    (newPaginationModel: GridPaginationModel) => {
      // Update local state only in uncontrolled mode.
      if (!isPaginationModelControlled) {
        setInternalPaginationModel(newPaginationModel);
      }

      // Always notify parent when a callback is provided.
      if (hasOnPaginationModelChangeHandler) {
        onPaginationModelChange(newPaginationModel, undefined as never);
      }
    },
    [
      hasOnPaginationModelChangeHandler,
      isPaginationModelControlled,
      onPaginationModelChange,
    ],
  );

  /**
   * Handles page navigation changes from the pagination controls.
   * Updates the pagination model with the new page number.
   *
   * @param _event - The click event (unused)
   * @param newPage - The new page number (0-indexed)
   */
  const handlePageChange = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      const newModel = { ...paginationModel, page: newPage };
      handlePaginationModelChange(newModel);
    },
    [paginationModel, handlePaginationModelChange],
  );

  /**
   * Handles page size (rows per page) changes from the pagination controls.
   * Resets to page 0 when page size changes to avoid out-of-bounds pages.
   *
   * @param event - The select change event containing the new page size
   */
  const handlePageSizeChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const newPageSize = Number(event.target.value);
      const newModel = { page: 0, pageSize: newPageSize };
      handlePaginationModelChange(newModel);
    },
    [handlePaginationModelChange],
  );

  // Total row count — prefer explicit rowCount, fallback to rows array length.
  const rowCount = props.rowCount ?? props.rows?.length ?? 0;
  
  return {
    /** Resolved pagination model (controlled or internal). */
    paginationModel,
    /** Unified pagination model change handler. */
    handlePaginationModelChange,
    /** Footer page navigation handler. */
    handlePageChange,
    /** Footer page size change handler. */
    handlePageSizeChange,
    /** Computed total row count. */
    rowCount,
  };
};
