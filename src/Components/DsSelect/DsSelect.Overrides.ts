import { DsSelectDefaultProps } from './DsSelect.Types'
export const DsSelectOverrides = {
  MuiSelect: {
    defaultProps: DsSelectDefaultProps,
    styleOverrides: {
      icon: {
        color: 'var(--ds-colour-iconDefault)',
        '.MuiInputBase-root.Mui-readOnly &': {
          color: 'var(--ds-colour-iconDisabled)'
        }
      }
    }
  }
}
