export const DsDialogActionsOverrides = {
  MuiDialogActions: {
    styleOverrides: {
      root: {
        boxShadow: 'var(--ds-elevation-1)',
        clipPath: 'inset(-2px 0 0 0)', // show shadow only on top, clip right/bottom/left
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
