import { useThemeProps } from '@mui/system'
import { DateFieldProps } from '@mui/x-date-pickers'
import React, { FunctionComponent } from 'react'
import { DsTextField, DsTextFieldProps } from '../../../Components'

export interface IDatePickerTextFieldProps
  extends Omit<
    DsTextFieldProps,
    'margin' | 'onInvalid' | 'onKeyDown' | 'onBlur' | 'onKeyUp' | 'ref'
  > {
  setOpen?: (open: boolean) => void
  InputProps?: DateFieldProps['InputProps']
  ref?: DateFieldProps['ref']
  focused?: boolean
  ownerState?: any
}

const DatePickerTextField = React.forwardRef<HTMLDivElement, IDatePickerTextFieldProps>(
  (props, ref) => {
    const mergedProps = useThemeProps({
      props: props,
      name: 'MuiPickersInput'
    })

    const { setOpen, InputProps, focused, ownerState, ...other } = mergedProps
    const { readOnly } = InputProps || {}

    return <DsTextField readOnly={readOnly} {...other} />
  }
)

export default DatePickerTextField