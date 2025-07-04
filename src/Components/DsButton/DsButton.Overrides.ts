import { DsButtonDefaultProps, DsButtonProps } from './DsButton.Types'
import STATE_STYLES from '../../Theme/STATE_STYLES'
import { CSSObject } from '@mui/system'

export const DsButtonOverrides = {
  MuiButton: {
    defaultProps: DsButtonDefaultProps,
    styleOverrides: {
      root: {
        borderRadius: 'var(--ds-radius-glacial)',
        textTransform: 'none',
        '&.Mui-disabled': {
          cursor: 'not-allowed',
          pointerEvents: 'all'
        },
        variants: [
          {
            props: { variant: 'flushed' } as Partial<DsButtonProps>,
            style: {
              borderRadius: 'var(--ds-radius-zero)'
            } as CSSObject
          },
          {
            props: {
              variant: 'flushed',
              color: 'primary'
            } as Partial<DsButtonProps>,
            style: {
              color: 'var(--ds-colour-typoOnSurface)',
              backgroundColor: 'var(--ds-colour-actionPrimary)',
              '&:disabled': {
                color: 'var(--ds-colour-typoOnSurface)',
                backgroundColor: 'var(--ds-colour-stateUnselectedDefault)'
              },
              ...STATE_STYLES.ACTION_PRIMARY_STATE_PRIMARY
            } as CSSObject
          }
        ],
      } as CSSObject,
      contained: {
        "&.MuiButton-contained.MuiButton-colorPrimary": {
          color: 'var(--ds-colour-typoOnSurface)',
          backgroundColor: 'var(--ds-colour-actionPrimary)',
          '&:disabled': {
            color: 'var(--ds-colour-typoOnSurface)',
            backgroundColor: 'var(--ds-colour-stateUnselectedDefault)'
          },
          ...STATE_STYLES.ACTION_PRIMARY_STATE_PRIMARY
        } as CSSObject,
        "&.MuiButton-contained.MuiButton-colorSecondary": {
          backgroundColor: 'var(--ds-colour-surfaceSecondary)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--ds-colour-strokeDefault)',
          color: 'var(--ds-colour-typoActionPrimary)',
          '&:disabled': {
            backgroundColor: 'var(--ds-colour-stateUnselectedDefault)',
            color: 'var(--ds-colour-typoOnSurface)'
          },
          ...STATE_STYLES.SURFACE_SECONDARY_STATE_PRIMARY
        } as CSSObject
      } as CSSObject,

      sizeLarge: {
        padding: 'var(--ds-spacing-bitterCold)',
        fontWeight: 'var(--ds-typo-bodyBoldLarge-fontWeight)',
        fontSize: 'var(--ds-typo-bodyBoldLarge-fontSize)',
        lineHeight: 'var(--ds-typo-bodyBoldLarge-lineHeight)',
        letterSpacing: 'var(--ds-typo-bodyBoldLarge-letterSpacing)'
      } as CSSObject,
      sizeMedium: {
        padding: 'var(--ds-spacing-frostbite) var(--ds-spacing-bitterCold)',
        fontWeight: 'var(--ds-typo-bodyBoldMedium-fontWeight)',
        fontSize: 'var(--ds-typo-bodyBoldMedium-fontSize)',
        lineHeight: 'var(--ds-typo-bodyBoldMedium-lineHeight)',
        letterSpacing: 'var(--ds-typo-bodyBoldMedium-letterSpacing)'
      } as CSSObject,
      sizeSmall: {
        padding: 'var(--ds-spacing-glacial) var(--ds-spacing-bitterCold)',
        fontWeight: 'var(--ds-typo-bodyBoldSmall-fontWeight)',
        fontSize: 'var(--ds-typo-bodyBoldSmall-fontSize)',
        lineHeight: 'var(--ds-typo-bodyBoldSmall-lineHeight)',
        letterSpacing: 'var(--ds-typo-bodyBoldSmall-letterSpacing)'
      } as CSSObject,
      icon: {
        '&.MuiButton-sizeLarge': {
          fontSize: 'var(--ds-typo-fontSizeMild)'
        } as CSSObject,
        '&.MuiButton-sizeMedium': {
          fontSize: 'var(--ds-typo-fontSizeCool)'
        } as CSSObject,
        '&.MuiButton-sizeSmall': {
          fontSize: 'var(--ds-typo-fontSizeBitterCold)'
        } as CSSObject
      } as CSSObject,
      startIcon: {
        marginRight: 'var(--ds-spacing-glacial)'
      },
      endIcon: {
        marginLeft: 'var(--ds-spacing-glacial)'
      },
      text: {
        padding: 'var(--ds-spacing-glacial) var(--ds-spacing-quickFreeze)',
        textTransform: 'uppercase',
        borderRadius: 'var(--ds-radius-zero)',
        '&:hover': {
          backgroundColor: 'transparent'
        } as CSSObject,
        '> .MuiTouchRipple-root': {
          display: 'none'
        } as CSSObject,
        '&:disabled': {
          color: 'var(--ds-colour-typoDisabled)'
        } as CSSObject,
        '> .MuiIcon-root': {
          fontSize: 'var(--ds-typo-fontSizeFrostbite)'
        } as CSSObject,

        '&.MuiButton-sizeLarge': {
          // To override the padding from size attributes
          padding: 'var(--ds-spacing-glacial) var(--ds-spacing-quickFreeze)',
          fontWeight: 'var(--ds-typo-supportBoldTextButton-fontWeight)',
          fontSize: 'var(--ds-typo-supportBoldTextButton-fontSize)',
          lineHeight: 'var(--ds-typo-supportBoldTextButton-lineHeight)',
          letterSpacing: 'var(--ds-typo-supportBoldTextButton-letterSpacing)'
        } as CSSObject,
        '&.MuiButton-sizeMedium': {
          // To override the padding from size attributes
          padding: 'var(--ds-spacing-glacial) var(--ds-spacing-quickFreeze)',
          fontWeight: 'var(--ds-typo-supportBoldTextButton-fontWeight)',
          fontSize: 'var(--ds-typo-supportBoldTextButton-fontSize)',
          lineHeight: 'var(--ds-typo-supportBoldTextButton-lineHeight)',
          letterSpacing: 'var(--ds-typo-supportBoldTextButton-letterSpacing)'
        } as CSSObject,
        '&.MuiButton-sizeSmall': {
          // To override the padding from size attributes
          padding: 'var(--ds-spacing-glacial) var(--ds-spacing-quickFreeze)',
          fontWeight: 'var(--ds-typo-supportBoldTextButton-fontWeight)',
          fontSize: 'var(--ds-typo-supportBoldTextButton-fontSize)',
          lineHeight: 'var(--ds-typo-supportBoldTextButton-lineHeight)',
          letterSpacing: 'var(--ds-typo-supportBoldTextButton-letterSpacing)'
        } as CSSObject
      } as CSSObject
    }
  }
}
