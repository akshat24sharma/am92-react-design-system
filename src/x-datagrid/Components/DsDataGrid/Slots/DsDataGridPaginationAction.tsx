import type { ChangeEvent, FC, MouseEvent } from 'react'
import {
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid'

import type { DsTablePaginationProps } from '../../../../Components'
import { DsPagination } from '../../../../Components'

export const DsDataGridFooter: FC<
  Pick<DsTablePaginationProps, 'page' | 'onPageChange' | 'className'>
> = ({
  page,
  onPageChange,
  className,
  ...paginationProps
}) => {
  const apiRef = useGridApiContext()
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <DsPagination
      {...paginationProps}
      count={pageCount}
      className={className}
      page={(page ?? 0) + 1}
      onChange={(event: ChangeEvent<unknown>, newPage: number) => {
        onPageChange(event as MouseEvent<HTMLButtonElement>, newPage - 1)
      }}
      color='primary'
      shape='rounded'
    />
  )
}

export default DsDataGridFooter
