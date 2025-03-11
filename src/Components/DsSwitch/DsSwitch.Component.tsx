import React, { FC } from 'react'
import { DsSwitchDefaultProps, DsSwitchProps } from './DsSwitch.Types'
import { DsToggleButtonGroup } from '../DsToggleButtonGroup'
import { DsToggleButton } from '../DsToggleButton'
import { DsTypography } from '../DsTypography'

export const DsSwitch: FC<DsSwitchProps> = (inProps) => {
  const props = {...DsSwitchDefaultProps, ...inProps}

  const handleChange = (event: React.SyntheticEvent, value: NonNullable<any>) => {
    const { name, onChange } = props
    onChange(name, value)
  }

    const {
      positiveLabel,
      positiveValue,
      negativeLabel,
      negativeValue,
      ...restProps
    } = props

    return (
      <DsToggleButtonGroup
        {...restProps}
        ds-variant="switch"
        exclusive
        size="small"
        onChange={handleChange}
      >
        <DsToggleButton value={positiveValue}>
          <DsTypography variant="supportBoldTextButton">
            {positiveLabel}
          </DsTypography>
        </DsToggleButton>
        <DsToggleButton value={negativeValue}>
          <DsTypography variant="supportBoldTextButton">
            {negativeLabel}
          </DsTypography>
        </DsToggleButton>
      </DsToggleButtonGroup>
    )
}
