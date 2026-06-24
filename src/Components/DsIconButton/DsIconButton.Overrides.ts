import COLOR_STYLES from '../../Constants/COLOR_STYLES'
import FONT_SIZE_STYLES from '../../Constants/FONT_SIZE_STYLES'
import { DsIconButtonDefaultProps } from './DsIconButton.Types'

export const DsIconButtonOverrides = {
  MuiIconButton: {
    defaultProps: DsIconButtonDefaultProps,
    styleOverrides: {
      root: {
        padding: 'var(--ds-spacing-zero)',
        fontSize: 'var(--ds-typo-fontSizeMild)'
      },
      ...COLOR_STYLES,
      ...FONT_SIZE_STYLES
    }
  }
}
