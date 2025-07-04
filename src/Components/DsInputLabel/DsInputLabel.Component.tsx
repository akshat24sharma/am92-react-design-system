import React, { FC, PureComponent } from 'react'
import InputLabel from '@mui/material/InputLabel'
import { DsInputLabelProps } from './DsInputLabel.Types'
import { DsTypography } from '../DsTypography'

export const DsInputLabel: FC<DsInputLabelProps> = (props) => {
    const { label, labelSupportText, success, error, ...inputLabelProps } = props

    if (!label && !labelSupportText) {
      return null
    }

    return (
      <InputLabel error={error} {...inputLabelProps}>
        <DsTypography
          component="span"
          variant="bodyRegularMedium"
          sx={{ float: 'left' }}
        >
          {label}
        </DsTypography>
        <DsTypography
          component="span"
          variant="bodyRegularSmall"
          sx={{
            color: 'text.secondary',
            float: 'right',
            width: '100%'
          }}
        >
          {labelSupportText}
        </DsTypography>
      </InputLabel>
    )
}
