import { CSSInterpolation } from '@mui/system'
import { DsBottomNavigationActionDefaultProps } from './DsBottomNavigationAction.Types'

export const DsBottomNavigationActionOverrides = {
  MuiBottomNavigationAction: {
    defaultProps: DsBottomNavigationActionDefaultProps,
    styleOverrides: {
      root: {
        marginLeft: 'var(--ds-spacing-quickFreeze)',
        marginRight: 'var(--ds-spacing-quickFreeze)',
        borderTopStyle: 'solid',
        borderTopColor: 'transparent',
        padding: 'var(--ds-spacing-zero)',
        justifyContent: 'flex-start',
        color: 'var(--ds-colour-iconDisabled)',
        '> .MuiIcon-root': {
          paddingTop: 'var(--ds-spacing-glacial)'
        },
        '&.Mui-selected': {
          color: 'var(--ds-colour-actionSecondary)',
          // adding this for the inverse curve at top
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '2px',
            backgroundColor: 'var(--ds-colour-actionSecondary)',
            borderRadius: '0 0 2px 2px',
          }
        }
      } as CSSInterpolation,
      label: {
        fontWeight: 'var(--ds-typo-bodyRegularSmall-fontWeight)',
        fontSize: 'var(--ds-typo-bodyRegularSmall-fontSize)',
        lineHeight: 'var(--ds-typo-bodyRegularSmall-lineHeight)',
        letterSpacing: 'var(--ds-typo-bodyRegularSmall-letterSpacing)',
        color: 'var(--ds-colour-typoDisabled)',
        paddingBottom: 'var(--ds-spacing-quickFreeze)',
        '&.Mui-selected': {
          fontWeight: 'var(--ds-typo-bodyBoldSmall-fontWeight)',
          fontSize: 'var(--ds-typo-bodyBoldSmall-fontSize)',
          lineHeight: 'var(--ds-typo-bodyBoldSmall-lineHeight)',
          letterSpacing: 'var(--ds-typo-bodyBoldSmall-letterSpacing)',
          color: 'var(--ds-colour-actionSecondary)'
        }
      } as CSSInterpolation
    }
  }
}
