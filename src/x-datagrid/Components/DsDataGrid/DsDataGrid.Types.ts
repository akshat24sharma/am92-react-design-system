import type { DataGridProps } from "@mui/x-data-grid";
import DsDataGridPaginationAction from "./Slots/DsDataGridPaginationAction";

// Re-export MUI X DataGrid primitives so consumers can import everything from DsDataGrid.
export type * from "@mui/x-data-grid";
export { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";

/**
 * Custom DataGrid component props.
 */
export type IDsDataGridProps = DataGridProps;

/**
 * Default props for DsDataGrid component.
 * Uses the built-in basePagination slot to inject DsPagination as ActionsComponent.
 */
export const DsDataGridDefaultProps: Partial<IDsDataGridProps> = {
  // Enable dynamic row heights for flexible content
  getRowHeight: () => "auto",
  showColumnVerticalBorder: true,
  pagination: true,
  pageSizeOptions: [10, 20, 50, 100],
  initialState: {
    pagination: {
      paginationModel: { page: 0, pageSize: 10 },
    },
  },
  slotProps: {
    basePagination: {
      material: {
        labelRowsPerPage: "Rows per page",
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} out of ${count} entries`,
        ActionsComponent: DsDataGridPaginationAction,
      },
    },
  },
};
