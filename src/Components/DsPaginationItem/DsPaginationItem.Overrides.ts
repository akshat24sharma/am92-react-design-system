export const DsPaginationItemOverrides = {
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        margin: "0 var(--ds-spacing-quickFreeze)",
        backgroundColor: "var(--ds-colour-surfacePrimary)",
      },
      icon: {
        color: "var(--ds-colour-iconDefault)",
      },
      rounded: {
        borderRadius: "var(--ds-radius-glacial)",
      },
      ellipsis: {
        border: "none",
        backgroundColor: "transparent",
      },
      previousNext: {
        border: "none",
      },
      firstLast: {
        border: "none",
      },
    },
  },
};
