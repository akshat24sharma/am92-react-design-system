import { forwardRef } from 'react'
import Badge from '@mui/material/Badge'
import { DsBadgeProps } from './DsBadge.Types'
import { useThemeProps } from '@mui/system'

export const DsBadge = forwardRef<HTMLDivElement, DsBadgeProps>((inProps, ref) => {

  const props = useThemeProps({
    props: inProps,
    name: 'MuiBadge'
  })

  return <Badge ref={ref} {...props} />
})
