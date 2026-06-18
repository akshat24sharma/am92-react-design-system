export const DsPickersDayOverrides = {
  MuiPickersDay: {
    styleOverrides: {
      root: {
        width: "36px",
        height: "36px",
        margin: "var(--ds-spacing-zero)",
        fontWeight: "var(--ds-typo-bodyRegularMedium-fontWeight)",
        fontSize: "var(--ds-typo-bodyRegularMedium-fontSize)",
        lineHeight: "var(--ds-typo-bodyRegularMedium-lineHeight)",
        letterSpacing: "var(--ds-typo-bodyRegularMedium-letterSpacing)",
        "&.Mui-selected": {
          backgroundColor: "var(--ds-colour-actionSecondary)",
          color: "var(--ds-colour-typoOnSurface)",
          "&:hover": {
            backgroundColor: "var(--ds-colour-actionSecondary)",
            color: "var(--ds-colour-typoOnSurface)",
          },
          "&:focus": {
            backgroundColor: "var(--ds-colour-actionSecondary)",
            color: "var(--ds-colour-typoOnSurface)",
          },
        },
      },
      today: {
        ":not(.Mui-selected)": {
          background: "transparent",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "var(--ds-colour-actionSecondary)",
        },
      },
    },
  },
};
