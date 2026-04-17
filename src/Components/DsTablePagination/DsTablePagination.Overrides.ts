export const DsTablePaginationOverrides = {
  MuiTablePagination: {
    styleOverrides: {
      toolbar: {
        padding: "var(--ds-spacing-cool) !important",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      spacer: {
        display: "none",
      },
      displayedRows: {
        order: 1,
        color: "var(--ds-colour-typoSecondary)",
        margin: 0,
      },
      actions: {
        order: 2,
        flex: 1,
        display: "flex",
        justifyContent: "center",
      },
      selectLabel: {
        order: 3,
        color: "var(--ds-colour-typoSecondary)",
        margin: 0,
      },
      input: {
        order: 4,
        marginRight: 0,
        marginLeft: "var(--ds-spacing-frostbite)",
        padding: "var(--ds-spacing-gelid) var(--ds-spacing-glacial)",
        borderRadius: "var(--ds-radius-glacial)",
        "& .MuiTablePagination-select": {
          padding: 0,
        },
      },
    },
  },
};
