import { FC } from 'react'
import Chip from '@mui/material/Chip'
import { DsChipProps } from './DsChip.Types'

export const DsChip: FC<DsChipProps> = props => {
  return <Chip {...props} variant="chip" />
}
