import COLOR_STYLES from '../../Constants/COLOR_STYLES'
import FONT_SIZE_STYLES from '../../Constants/FONT_SIZE_STYLES'
import { DsIconDefaultProps } from './DsIcon.Types'

export const DsIconOverrides = {
  MuiIcon: {
    defaultProps: DsIconDefaultProps,
    styleOverrides: {
      root: {
        height: 'auto',
        width: 'auto',
        lineHeight: '1'
      },
      ...COLOR_STYLES,
      ...FONT_SIZE_STYLES
    }
  }
}
