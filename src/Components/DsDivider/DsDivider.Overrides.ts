import { CSSObject } from '@mui/system'
import { DsDividerDefaultProps, DsDividerProps } from './DsDivider.Types'

export const DsDividerOverrides = {
  MuiDivider: {
    defaultProps: DsDividerDefaultProps,
    styleOverrides: {
      root: {
        borderColor: 'var(--ds-colour-strokeDefault)',
        variants: [
          {
            props: { 'ds-size': 'M' } as Partial<DsDividerProps>,
            style: {
              '&::before': {
                borderWidth: '0.5px'
              },
              '&::after': {
                borderWidth: '0.5px'
              },
              '&:not(.MuiDivider-withChildren)': {
                borderWidth: '0.5px'
              }
            } as CSSObject
          },
          {
            props: { 'ds-size': 'L' } as Partial<DsDividerProps>,
            style: {
              '&::before': {
                borderWidth: '6px'
              },
              '&::after': {
                borderWidth: '6px'
              },
              '&:not(.MuiDivider-withChildren)': {
                borderWidth: '6px'
              }
            } as CSSObject
          }
        ]
      },
      light: {
        borderColor: 'var(--ds-colour-strokeDisabled)'
      }
    }
  }
}
