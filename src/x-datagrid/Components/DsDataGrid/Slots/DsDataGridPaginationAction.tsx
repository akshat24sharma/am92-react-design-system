import { useCallback, type ChangeEvent, type FC, type MouseEvent } from 'react'
import {
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid'

import type { DsTablePaginationProps } from '../../../../Components'
import { DsPagination } from '../../../../Components'

export const DsDataGridPaginationAction: FC<
  Pick<DsTablePaginationProps, 'page' | 'onPageChange'>
> = ({
  page,
  onPageChange,
  ...paginationProps
}) => {
  const apiRef = useGridApiContext()
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  const handleChange = useCallback(
    (event: ChangeEvent<unknown>, newPage: number) => {
      onPageChange(event as MouseEvent<HTMLButtonElement>, newPage - 1)
    },
    [onPageChange]
  )

  return (
    <DsPagination
      {...paginationProps}
      count={pageCount}
      page={(page ?? 0) + 1}
      onChange={handleChange}
      color='primary'
      shape='rounded'
    />
  )
}

export default DsDataGridPaginationAction
