export const DsAccordionSummaryOverrides = {
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        padding: 'var(--ds-spacing-frostbite) var(--ds-spacing-bitterCold)',
        '&.Mui-expanded': {
          minHeight: '0px',
        }
      },
      content: {
        margin: 'var(--ds-spacing-zero)',
        width: 'calc(100% - 40px)',
        marginRight: 'var(--ds-spacing-bitterCold)',
        fontWeight: 'var(--ds-typo-bodyBoldMedium-fontWeight)',
        fontSize: 'var(--ds-typo-bodyBoldMedium-fontSize)',
        lineHeight: 'var(--ds-typo-bodyBoldMedium-lineHeight)',
        letterSpacing: 'var(--ds-typo-bodyBoldMedium-letterSpacing)',
        '&.Mui-expanded': {
          margin: 'var(--ds-spacing-zero)',
          marginRight: 'var(--ds-spacing-bitterCold)'
        }
      },
      expandIconWrapper: {
        color: 'var(--ds-colour-iconDefault)'
      }
    }
  }
}
