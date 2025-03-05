import React, { FC } from 'react'
import Switch from '@mui/material/Switch'
import { DsToggleDefaultProps, DsToggleProps } from './DsToggle.Types'
import { useThemeProps } from '@mui/system'

export const DsToggle: FC<DsToggleProps> = (inProps) => {

  const props = useThemeProps({
    props: inProps,
    name: 'DsToggle'
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = props
    const { name, checked } = event.target
    if (typeof onChange === 'function') {
      onChange(name, checked)
    }
  }

    const { value, onChange, ...restProps } = props

    return (
      <Switch
        {...restProps}
        color="secondary"
        checked={value}
        onChange={handleChange}
      />
    )
}
