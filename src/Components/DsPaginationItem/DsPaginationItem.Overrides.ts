export const DsPaginationItemOverrides = {
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        margin: "0 var(--ds-spacing-quickFreeze)",
        backgroundColor: "var(--ds-colour-surfacePrimary)",
        border: "1px solid var(--ds-colour-strokeDefault)",
        "&.Mui-selected": {
          border: "none",
        },
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
