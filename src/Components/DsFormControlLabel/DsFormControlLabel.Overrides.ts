export const DsFormControlLabelOverrides = {
  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        '&.Mui-disabled': {
          '&:hover': {
            pointerEvents: 'all',
            cursor: 'not-allowed'
          }
        },
        '.Mui-checked ~ *' : {
          fontWeight: 'var(--ds-typo-bodyBoldMedium-fontWeight)',
          fontSize: 'var(--ds-typo-bodyBoldMedium-fontSize)',
          lineHeight: 'var(--ds-typo-bodyBoldMedium-lineHeight)',
          letterSpacing: 'var(--ds-typo-bodyBoldMedium-letterSpacing)'
      }
      },
      label: {
        padding: 'var(--ds-spacing-deepFreeze)',
        paddingRight: 'var(--ds-spacing-zero)',
        marginLeft: 'var(--ds-spacing-quickFreeze)',
        fontWeight: 'var(--ds-typo-bodyRegularMedium-fontWeight)',
        fontSize: 'var(--ds-typo-bodyRegularMedium-fontSize)',
        lineHeight: 'var(--ds-typo-bodyRegularMedium-lineHeight)',
        letterSpacing: 'var(--ds-typo-bodyRegularMedium-letterSpacing)'
      },
      labelPlacementStart: {
        marginLeft: 'var(--ds-spacing-zero)',
        marginRight: 'var(--ds-spacing-quickFreeze)'
      }
    }
  }
}
