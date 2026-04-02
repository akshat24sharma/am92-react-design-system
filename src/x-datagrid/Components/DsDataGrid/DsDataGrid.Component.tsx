import type { FC } from "react";
import { DataGrid } from "@mui/x-data-grid";

import type {
  IDsDataGridProps,
  IDsDataGridSlotProps,
} from "./DsDataGrid.Types";
import { DsDataGridDefaultProps } from "./DsDataGrid.Types";
import { useDsDataGridPagination } from "../../Hooks";


export const DsDataGrid: FC<IDsDataGridProps> = ({
  slots,
  slotProps,
  ...props
}) => {
  const {
    paginationModel,
    handlePaginationModelChange,
    handlePageChange,
    handlePageSizeChange,
    rowCount,
  } = useDsDataGridPagination(props);

  return (
    <DataGrid
      {...DsDataGridDefaultProps}
      {...props}
      slots={{
        ...DsDataGridDefaultProps.slots,
        ...slots,
      }}
      slotProps={
        {
          ...DsDataGridDefaultProps.slotProps,
          ...slotProps,
          footer: {
            rowCount,
            page: paginationModel.page,
            pageSize: paginationModel.pageSize,
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
            ...DsDataGridDefaultProps.slotProps?.footer,
            ...slotProps?.footer,
          },
        } as IDsDataGridSlotProps
      }
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationModelChange}
      sx={{
        ...props.sx,
      }}
    />
  );
};

export default DsDataGrid;
