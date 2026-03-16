export const DsInputAdornmentOverrides = {
  MuiInputAdornment: {
    styleOverrides: {
      root: {
        color: 'var(--ds-colour-iconDefault)',
        '& .MuiIcon-root': {
          cursor: 'pointer'
        }
      },
      positionStart: {
        marginRight: 'var(--ds-spacing-zero)'
      },
      positionEnd: {
        marginLeft: 'var(--ds-spacing-zero)'
      }
    }
  }
}
