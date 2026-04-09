import type React from "react";
import type { DataGridProps } from "@mui/x-data-grid";
import DsDataGridFooter from "./Slots/DsDataGridFooter.Component";
import { SelectChangeEvent, TableFooterProps, SxProps } from "@mui/material";
import { DsPaginationProps } from "../../../Components";

// Re-export MUI X DataGrid primitives so consumers can import everything from DsDataGrid.
export type * from "@mui/x-data-grid";
export { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";

/**
 * Custom slot props interface for DataGrid.
 * Extends DataGrid slotProps except footer, which uses custom footer props.
 */
export interface IDsDataGridSlotProps extends Omit<
  DataGridProps["slotProps"],
  "footer"
> {
  /**
   * Props to pass to the custom footer component.
   */
  footer?: Partial<IDsDataGridFooterProps>;
}

/**
 * Custom DataGrid component props.
 * Extends MUI DataGrid props with custom slots and slotProps.
 */
export interface IDsDataGridProps extends Omit<DataGridProps, "slotProps"> {
  /**
   * Props to pass to custom slot components.
   */
  slotProps?: IDsDataGridSlotProps;
}

/**
 * Props for the custom DataGrid footer component.
 * Extends MUI TableFooter props with pagination controls.
 */
export interface IDsDataGridFooterProps extends TableFooterProps {
  /**
   * Callback fired when the page is changed.
   */
  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  /**
   * Callback fired when the number of rows per page is changed.
   */
  onPageSizeChange?: (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode,
  ) => void;
  /**
   * Customizable list of rows per page options.
   */
  pageSizeOptions?: readonly (number | { value: number; label: string })[];
  /**
   * Text to display for the rows per page label.
   */
  labelRowsPerPage?: string;
  /**
   * Text to display for displaying which rows of how many are currently visible.
   */
  labelDisplayedRows?: (paginationInfo: {
    from: number;
    to: number;
    rowCount: number;
    page: number;
  }) => string;

  /**
   * Additional props to pass to the Design System Pagination component.
   */
  paginationProps?: DsPaginationProps;

  /**
   * Sx prop for styling.
   */
  sx?: SxProps<any>;

  /**
   * Set the number of rows in one page.
   */
  pageSize?: number;
  /**
   * The zero-based index of the current page.
   * @default 0
   */
  page?: number;

  /**
   * The total number of rows in the dataset.
   */
  rowCount?: DataGridProps["rowCount"];
}

/**
 * Default props for DsDataGrid footer component.
 * Provides sensible defaults for pagination controls.
 */
export const DsDataGridFooterDefaultProps: Partial<IDsDataGridFooterProps> = {
  pageSizeOptions: [5, 10, 25, 50, 100],
  labelRowsPerPage: "Rows per page",
  labelDisplayedRows: ({ from, to, rowCount }) =>
    `${from}-${to} of ${rowCount} entries`,
};

/**
 * Default props for DsDataGrid component.
 * Configures the custom footer slot by default.
 */
export const DsDataGridDefaultProps: Partial<IDsDataGridProps> = {
  // Enable dynamic row heights for flexible content
  getRowHeight: () => "auto",
  slots: {
    footer: DsDataGridFooter,
  },
  slotProps: {
    footer: DsDataGridFooterDefaultProps,
  },
};
