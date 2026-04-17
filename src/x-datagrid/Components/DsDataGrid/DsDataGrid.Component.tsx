import type { FC } from "react";
import { DataGrid } from "@mui/x-data-grid";

import type { IDsDataGridProps } from "./DsDataGrid.Types";
import { DsDataGridDefaultProps } from "./DsDataGrid.Types";

export const DsDataGrid: FC<IDsDataGridProps> = ({
  slots,
  slotProps,
  ...props
}) => {

  return (
    <DataGrid
      {...DsDataGridDefaultProps}
      {...props}
      slots={{
        ...DsDataGridDefaultProps.slots,
        ...slots,
      }}
      slotProps={{
        ...DsDataGridDefaultProps.slotProps,
        ...slotProps,
        basePagination: {
          ...DsDataGridDefaultProps.slotProps?.basePagination,
          ...slotProps?.basePagination,
          material: {
            ...DsDataGridDefaultProps.slotProps?.basePagination?.material,
            ...slotProps?.basePagination?.material,
          },
        },
      }}
      sx={{
        ...props.sx,
      }}
    />
  );
};

export default DsDataGrid;
