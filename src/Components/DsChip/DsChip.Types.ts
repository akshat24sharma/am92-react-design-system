import { ChipProps } from '@mui/material'

export interface DsChipProps extends Omit<ChipProps, 'onDelete'> {
  type?: 'status' | 'nudge'
}

export const DsChipDefaultProps: DsChipProps = {
  type: 'status'
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    filled: false
    outlined: false
    chip: true
    tag: true
  }
}
