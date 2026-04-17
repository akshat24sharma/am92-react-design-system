export const DsDataGridOverrides = {
  MuiDataGrid: {
    styleOverrides: {
      root: {
        width: "100%",
        borderRadius: "var(--ds-radius-frostbite)",
        border: "1px solid var(--ds-colour-strokeDefault)",
        "& .MuiDataGrid-filler": {
          display: "none !important",
        },
        "& .MuiDataGrid-cellEmpty": {
          display: "none !important",
        },
      },
      columnHeaders: {
        height: "var(--ds-rules-dataGridColumnHeaderHeight)",
        borderBottom: "1px solid var(--ds-colour-strokeDefault)",
      },
      columnHeader: {
        backgroundColor: "var(--ds-colour-neutral1)",
        padding: "0 var(--ds-spacing-cool)",
        "&:focus, &:focus-within": {
          outline: "none",
        },
        "& .MuiDataGrid-sortButton": {
          background: "none",
        },
      },
      columnSeparator: {
        display: "none",
      },
      columnHeaderTitle: {
        fontWeight: "var(--ds-typo-bodyBoldMedium-fontWeight)",
        fontSize: "var(--ds-typo-bodyRegularMedium-fontSize)",
        lineHeight: "var(--ds-typo-bodyRegularMedium-lineHeight)",
        letterSpacing: "var(--ds-typo-bodyRegularMedium-letterSpacing)",
      },
      columnHeaderTitleContainer: {
        justifyContent: "space-between",
      },
      menuIcon: {
        display: "none",
      },
      iconButtonContainer: {
        width: "auto",
        "& .MuiButtonBase-root": {
          "& .MuiSvgIcon-root": {
            color: "var(--ds-colour-iconDefault)",
            fontSize: "var(--ds-typo-fontSizeBitterCold)",
          },
        },
      },
      row: {
        borderBottom: "1px solid var(--ds-colour-strokeDefault)",
        alignItems: "flex-start",
        maxHeight: "none",
        width: "auto",
      },
      cell: {
        maxHeight: "none",
        alignItems: "center",
        minHeight: "var(--ds-rules-dataGridRowMinHeight)",
        display: "flex",
        padding: "0 var(--ds-spacing-cool)",
        "&:focus, &:focus-within": {
          outline: "none",
        },
        '&[data-field="actions"]': {
          overflow: "visible",
        },
      },
      "cell--withRightBorder": {
        borderRightColor: "var(--ds-colour-strokeDefault)",
      },
      "cell--withLeftBorder": {
        borderLeftColor: "var(--ds-colour-strokeDefault)",
      },
      "columnHeader--withRightBorder": {
        borderRightColor: "var(--ds-colour-strokeDefault)",
      },
      "columnHeader--withLeftBorder": {
        borderLeftColor: "var(--ds-colour-strokeDefault)",
      },
    },
  },
};
