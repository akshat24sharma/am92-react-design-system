import { FC } from 'react'
import Radio from '@mui/material/Radio'
import { DsRadioDefaultProps, DsRadioProps } from './DsRadio.Types'
import { DsFormControlLabel } from '../DsFormControlLabel'
import { DsRemixIcon } from '../DsRemixIcon'

export const DsRadio: FC<DsRadioProps> = (inProps) => {
  const props = { ...inProps, ...DsRadioDefaultProps }

    const { disabled, RadioProps, ...restProps } = props
    return (
      <DsFormControlLabel
        {...restProps}
        disabled={disabled}
        control={
          <Radio
            icon={
              <DsRemixIcon
                className="ri-checkbox-blank-circle-line"
                sx={{ fontSize: 'var(--ds-typo-fontSizeBitterCold)' }}
              />
            }
            checkedIcon={
              <DsRemixIcon
                className="ri-radio-button-line"
                sx={{ fontSize: 'var(--ds-typo-fontSizeBitterCold)' }}
              />
            }
            color="secondary"
            {...RadioProps}
            disabled={disabled}
          />
        }
      />
    )
}
