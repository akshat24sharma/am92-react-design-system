export const DsDialogActionsOverrides = {
  MuiDialogActions: {
    styleOverrides: {
      root: {
        boxShadow: 'var(--ds-elevation-1)',
        padding: 'var(--ds-spacing-zero)',
        '> *': {
          flex: 1
        },
        '>:not(style)~:not(style)': {
          marginLeft: 'var(--ds-spacing-frostbite)'
        }
      }
    }
  }
}
