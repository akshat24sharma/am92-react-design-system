import { DsAccordionDefaultProps } from './DsAccordion.Types'

export const DsAccordionOverrides = {
  MuiAccordion: {
    defaultProps: DsAccordionDefaultProps,
    styleOverrides: {
      root: {
        backgroundColor: 'var(--ds-colour-surfacePrimary)',
        backgroundImage: 'none',
        overflow: 'hidden',
        paddingTop: 'var(--ds-spacing-glacial)',
        paddingBottom: 'var(--ds-spacing-glacial)',
        '&.MuiAccordion-root:not(:last-of-type)': {
            borderBottom: '1px solid var(--ds-colour-stateDisabledSurface)',
        }
    }
    }
  }
}
