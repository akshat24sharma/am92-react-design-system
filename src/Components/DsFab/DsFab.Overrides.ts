import STATE_STYLES from '../../Theme/STATE_STYLES'
import { DsFabDefaultProps, DsFabProps } from './DsFab.Types'
import { CSSInterpolation } from '@mui/system'

export const DsFabOverrides = {
  MuiFab: {
    defaultProps: DsFabDefaultProps,
    styleOverrides: {
      root: {
        boxShadow: 'var(--ds-elevation-8)',
        textTransform: 'none',
        minHeight: 'auto',
        height: 'auto',
        width: 'auto',
        borderRadius: 'var(--ds-radius-pleasant)',
        '.MuiTypography-root': {
          fontWeight: 'var(--ds-typo-bodyBoldMedium-fontWeight)',
          fontSize: 'var(--ds-typo-bodyBoldMedium-fontSize)',
          lineHeight: 'var(--ds-typo-bodyBoldMedium-lineHeight)',
          letterSpacing: 'var(--ds-typo-bodyBoldMedium-letterSpacing)'
        }
      } as CSSInterpolation,
      sizeLarge: {
        padding: 'var(--ds-spacing-cool)',
        '> .MuiSvgIcon-root': {
          fontSize: 'var(--ds-typo-fontSizePleasant)'
        }
      } as CSSInterpolation,
      sizeMedium: {
        padding: 'var(--ds-spacing-bitterCold)',
        '> .MuiSvgIcon-root': {
          fontSize: 'var(--ds-typo-fontSizeMild)'
        }
      } as CSSInterpolation,
      sizeSmall: {
        padding: 'var(--ds-spacing-frostbite)',
        '> .MuiSvgIcon-root': {
          fontSize: 'var(--ds-typo-fontSizeCool)'
        }
      } as CSSInterpolation,
      secondary: {
        ...STATE_STYLES.ACTION_SECONDARY_STATE_SECONDARY
      } as CSSInterpolation,
      default: {
        backgroundColor: 'var(--ds-colour-surfacePrimary)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--ds-colour-strokeDefault)',
        '&:hover': {
          backgroundColor: 'var(--ds-colour-stateUnselectedHover)'
        }
      } as CSSInterpolation,
      extended: {
        '.MuiTypography-root': {
          marginLeft: 'var(--ds-spacing-glacial)',
          marginRight: 'var(--ds-spacing-glacial)'
        }
      }
    }
  }
}
