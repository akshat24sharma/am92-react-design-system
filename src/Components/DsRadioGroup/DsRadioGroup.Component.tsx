import { FC } from 'react'
import { DsRadioGroupProps } from './DsRadioGroup.Types'
import RadioGroup from '@mui/material/RadioGroup'

export const DsRadioGroup: FC<DsRadioGroupProps> = props => {
  return (
    <RadioGroup
      {...props}
      sx={{
        '> *:nth-last-child(n+2)': {
          marginBottom: 'var(--ds-spacing-glacial)'
        },
        ...props.sx
      }}
    />
  )
}
