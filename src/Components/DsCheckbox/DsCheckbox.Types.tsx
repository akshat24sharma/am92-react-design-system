import { CheckboxProps } from '@mui/material'
import { DsRemixIcon } from '../DsRemixIcon'

export interface DsCheckboxProps extends CheckboxProps {}

export const DsCheckboxDefaultProps: DsCheckboxProps = {
  color: 'secondary',
  icon: (
    <DsRemixIcon
      className="ri-checkbox-blank-line"
      color="inherit"
      fontSize="inherit"
    />
  ),
  checkedIcon: (
    <DsRemixIcon
      className="ri-checkbox-fill"
      color="inherit"
      fontSize="inherit"
    />
  ),
  indeterminateIcon: (
    <DsRemixIcon
      className="ri-checkbox-indeterminate-fill"
      color="inherit"
      fontSize="inherit"
    />
  ),
  size: 'small'
}
