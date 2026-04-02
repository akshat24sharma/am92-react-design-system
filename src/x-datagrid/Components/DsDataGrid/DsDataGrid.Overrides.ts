export const DsDataGridOverrides = {
  MuiDataGrid: {
    styleOverrides: {
      root: {
        width: "100%",
        "& .MuiDataGrid-cell": {
          maxHeight: "none",
          alignItems: "center",
          minHeight: "52px",
          display: "flex",
          padding: "0 var(--ds-spacing-cool)",
        },
        '& .MuiDataGrid-cell[data-field="actions"]': {
          overflow: "visible",
        },
        '& .MuiDataGrid-columnHeader[data-field="actions"], & .MuiDataGrid-columnHeader[data-field="__check__"]':
          {
            borderRight: "none",
          },
      },
      columnHeaders: {
        height: "48px",
      },
      columnHeader: {
        backgroundColor: "var(--ds-colour-neutral1)",
        padding: "0 var(--ds-spacing-cool)",
        "--DataGrid-t-color-border-base": "none",
        borderRight: "1px solid var(--ds-colour-strokeDefault)",
        "&--last": {
          borderRight: "none",
        },
        "&:focus, &:focus-within": {
          outline: "none",
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
      },
      cell: {
        "&:focus, &:focus-within": {
          outline: "none",
        },
      },
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        border: "1px solid var(--ds-colour-strokeDefault)",
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
      },
      sizeSmall: {
        lineHeight: "var(--ds-rules-dataGridSSize)",
      },
      sizeMedium: {
        lineHeight: "var(--ds-rules-dataGridMSize)",
      },
      sizeLarge: {
        lineHeight: "var(--ds-rules-dataGridLSize)",
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
