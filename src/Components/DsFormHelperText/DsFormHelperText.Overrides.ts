import { CSSInterpolation } from '@mui/system'
import { DsHelperTextDefaultProps } from '../DsHelperText'

export const DsFormHelperTextOverrides = {
  MuiFormHelperText: {
    defaultProps: DsHelperTextDefaultProps,
    styleOverrides: {
      root: {
        textTransform: 'none',
        margin: 'var(--ds-spacing-zero)',
        marginTop: 'var(--ds-spacing-glacial)',
        paddingLeft: 'var(--ds-spacing-deepFreeze)',
        paddingTop: 'var(--ds-spacing-deepFreeze)',
        paddingBottom: 'var(--ds-spacing-deepFreeze)',
        minHeight: 'var(--ds-rules-formHelperTextMinHeight)'
      } as CSSInterpolation
    }
  }
}
