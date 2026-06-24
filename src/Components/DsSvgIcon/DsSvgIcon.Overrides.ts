import COLOR_STYLES from '../../Constants/COLOR_STYLES'
import FONT_SIZE_STYLES from '../../Constants/FONT_SIZE_STYLES'
import { DsSvgIconDefaultProps } from './DsSvgIcon.Types'

export const DsSvgIconOverrides = {
  MuiSvgIcon: {
    defaultProps: DsSvgIconDefaultProps,
    styleOverrides: {
      ...COLOR_STYLES,
      ...FONT_SIZE_STYLES
    }
  }
}
