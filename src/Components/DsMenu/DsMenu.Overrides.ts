import { DsMenuDefaultProps } from './DsMenu.Types'

export const DsMenuOverrides = {
  MuiMenu: {
    defaultProps: DsMenuDefaultProps,
    styleOverrides: {
      paper: { 
        borderRadius: 'var(--ds-radius-glacial)',
        background: 'var(--ds-colour-surfacePrimary)',
      },
      list: { boxShadow: 'var(--ds-elevation-4)' }
    }
  }
}
