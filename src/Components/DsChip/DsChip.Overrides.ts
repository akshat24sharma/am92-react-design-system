import { CSSObject } from '@mui/system'
import { DsChipDefaultProps, DsChipProps } from './DsChip.Types'

export const DsChipOverrides = {
  MuiChip: {
    defaultProps: DsChipDefaultProps,
    styleOverrides: {
      root: {
        variants: [
          {
            props: { variant: 'chip' } as Partial<DsChipProps>,
            style: {
              border: 'none',
              borderRadius: 'var(--ds-radius-quickFreeze)',
              paddingLeft: 'var(--ds-spacing-glacial)',
              paddingRight: 'var(--ds-spacing-glacial)',
              height: '20px',
              '.MuiChip-icon': {
                fontSize: 'var(--ds-typo-fontSizeIceAge)',
                marginRight: 'var(--ds-spacing-quickFreeze)',
                marginLeft: 'var(--ds-spacing-zero)',
                color: 'inherit'
              },
              '> .MuiChip-label': {
                paddingLeft: 'var(--ds-spacing-zero)',
                paddingRight: 'var(--ds-spacing-zero)'
              }
            } as CSSObject
          },
          {
            props: { variant: 'chip', type: 'status' } as Partial<DsChipProps>,
            style: {
              fontWeight: 'var(--ds-typo-supportRegularMetadata-fontWeight)',
              fontSize: 'var(--ds-typo-supportRegularMetadata-fontSize)',
              lineHeight: 'var(--ds-typo-supportRegularMetadata-lineHeight)',
              letterSpacing: 'var(--ds-typo-supportRegularMetadata-letterSpacing)',
              textTransform: 'uppercase',
              paddingTop: 'var(--ds-spacing-quickFreeze)',
              paddingBottom: 'var(--ds-spacing-quickFreeze)',
              backgroundColor: 'var(--ds-colour-supportTypical)',
              color: 'var(--ds-colour-typoOnSurface)'
            } as CSSObject
          },
          {
            props: {
              variant: 'chip',
              type: 'status',
              color: 'success'
            } as Partial<DsChipProps>,
            style: {
              backgroundColor: 'var(--ds-colour-supportPositive)'
            } as CSSObject
          },
          {
            props: {
              variant: 'chip',
              type: 'status',
              color: 'warning'
            } as Partial<DsChipProps>,
            style: {
              backgroundColor: 'var(--ds-colour-supportWarning)'
            } as CSSObject
          },
          {
            props: {
              variant: 'chip',
              type: 'status',
              color: 'error'
            } as Partial<DsChipProps>,
            style: {
              backgroundColor: 'var(--ds-colour-supportNegative)'
            } as CSSObject
          },
          {
            props: {
              variant: 'chip',
              type: 'status',
              color: 'info'
            } as Partial<DsChipProps>,
            style: {
              backgroundColor: 'var(--ds-colour-neutral1)',
              color: 'var(--ds-colour-typoPrimary)'
            } as CSSObject
          },
          {
            props: { variant: 'chip', type: 'nudge' } as Partial<DsChipProps>,
            style: {
              fontWeight: 'var(--ds-typo-supportRegularInfo-fontWeight)',
              fontSize: 'var(--ds-typo-supportRegularInfo-fontSize)',
              lineHeight: 'var(--ds-typo-supportRegularInfo-lineHeight)',
              letterSpacing: 'var(--ds-typo-supportRegularInfo-letterSpacing)',
              textTransform: 'none',
              paddingTop: 'var(--ds-spacing-deepFreeze)',
              paddingBottom: 'var(--ds-spacing-deepFreeze)',
              backgroundColor: 'var(--ds-colour-supportTypicalNeutral)',
              color: 'var(--ds-colour-supportTypical)'
            } as CSSObject
          },
          {
            props: {
              variant: 'chip',
              type: 'nudge',
              color: 'success'
            } as Partial<DsChipProps>,
            style: {
              backgroundColor: 'var(--ds-colour-supportPositiveNeutral)',
              color: 'var(--ds-colour-supportPositive)'
            } as CSSObject
          },
          {
            props: {
              variant: 'chip',
              type: 'nudge',
              color: 'warning'
            } as Partial<DsChipProps>,
            style: {
              backgroundColor: 'var(--ds-colour-supportWarningNeutral)',
              color: 'var(--ds-colour-supportWarning)'
            } as CSSObject
          },
          {
            props: {
              variant: 'chip',
              type: 'nudge',
              color: 'error'
            } as Partial<DsChipProps>,
            style: {
              backgroundColor: 'var(--ds-colour-supportNegativeNeutral)',
              color: 'var(--ds-colour-supportNegative)'
            } as CSSObject
          },
          {
            props: {
              variant: 'chip',
              type: 'nudge',
              color: 'info'
            } as Partial<DsChipProps>,
            style: {
              backgroundColor: 'var(--ds-colour-neutral1)',
              color: 'var(--ds-colour-typoPrimary)'
            } as CSSObject
          }
        ]
      }
    }
  }
}
