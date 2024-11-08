import { DsAccordionDefaultProps } from './DsAccordion.Types'

export const DsAccordionOverrides = {
  MuiAccordion: {
    defaultProps: DsAccordionDefaultProps,
    styleOverrides: {
      root: {
        backgroundColor: 'var(--ds-colour-surfacePrimary)',
        overflow: 'hidden',
        '&:not(:first-of-type):not(.Mui-expanded)': {
          marginTop: '-1px'
        }
      }
    }
  }
}
