import { DsBadgeDefaultProps, DsBadgeProps } from './DsBadge.Types'

export const DsBadgeOverrides = {
  MuiBadge: {
    defaultProps: DsBadgeDefaultProps,
    styleOverrides: {
      root: {
        variants:[
          {
            props: { color: 'inverse' } as Partial<DsBadgeProps>,
            style: {
              '& .MuiBadge-badge': {
                backgroundColor: 'var(--ds-colour-iconOnSurface)', 
                color: 'var(--ds-colour-actionSecondary)',
              }
          },
        },
          {
            props: { disabled: true } as Partial<DsBadgeProps>,
            style: {
              '& .MuiBadge-badge': {
                backgroundColor: 'var(--ds-colour-iconDisabled)', 
                color: 'var(--ds-colour-typoOnSurface)',
                pointerEvents: 'none'
              }
            }
        }
        ],
      },
      standard: {
        fontWeight: 'var(--ds-typo-supportRegularInfo-fontWeight)',
        fontSize: 'var(--ds-typo-supportRegularInfo-fontSize)',
        lineHeight: 'var(--ds-typo-supportRegularInfo-lineHeight)',
        letterSpacing: 'var(--ds-typo-supportRegularInfo-letterSpacing)',
        padding: 'var(--ds-spacing-deepFreeze)',
        minWidth: '16px',
        height: '16px',
        borderRadius: 'var(--ds-radius-glacial)'
      }
    }
  }
}
