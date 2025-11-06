import { CSSObject, borderBottom, borderBottomColor } from '@mui/system'
import { DsTabsDefaultProps, DsTabsProps } from './DsTabs.Types'

export const DsTabsOverrides = {
  MuiTabs: {
    defaultProps: DsTabsDefaultProps,
    styleOverrides: {
      root: {
        minHeight: '36px',
        variants: [
          {
            props: { 'ds-variant': 'container' } as Partial<DsTabsProps>,
            style: {
              '> .MuiTabs-scroller > .MuiTabs-indicator': {
                height: '0px'
              },
              '> .MuiTabs-scroller > .MuiTabs-flexContainer': {
                gap: 'var(--ds-spacing-glacial)',
                '> .MuiTab-root': {
                  fontWeight: 'var(--ds-typo-supportRegularMetadata-fontWeight)',
                  fontSize: 'var(--ds-typo-supportRegularMetadata-fontSize)',
                  lineHeight: 'var(--ds-typo-supportRegularMetadata-lineHeight)',
                  letterSpacing:
                    'var(--ds-typo-supportRegularMetadata-letterSpacing)',
                  borderRadius: 'var(--ds-radius-quickFreeze)',
                  paddingTop: 'var(--ds-spacing-frostbite)',
                  paddingBottom: 'var(--ds-spacing-frostbite)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  backgroundColor: 'var(--ds-colour-surfaceSecondary)',
                  borderColor: 'var(--ds-colour-strokeDefault)',
                  color: 'var(--ds-colour-typoSecondary)',
                  '&.Mui-selected': {
                    backgroundColor: 'var(--ds-colour-stateSelectedSecondaryHover)',
                    borderColor: 'var(--ds-colour-strokeSecondarySelected)',
                    color: 'var(--ds-colour-typoActionTertiary)'
                  },
                  '&.Mui-disabled': {
                    backgroundColor: 'none',
                    borderColor: 'none',
                    color: 'var(--ds-colour-typoDisabled)'
                  }
                }
              }
            } as CSSObject
          }
        ]
      } as CSSObject,
      indicator: {
        height: '2px',
        borderRadius: '2px 2px 0px 0px'
      }
    }
  }
}
