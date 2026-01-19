import { CSSObject } from "@mui/system";
import { DsTabsDefaultProps, DsTabsProps } from "./DsTabs.Types";

export const DsTabsOverrides = {
  MuiTabs: {
    defaultProps: DsTabsDefaultProps,
    styleOverrides: {
      root: {
        minHeight: "36px",
        variants: [
          {
            props: { "ds-variant": "container" } as Partial<DsTabsProps>,
            style: {
              "> .MuiTabs-scroller > .MuiTabs-indicator": {
                height: "0px",
              },
              "> .MuiTabs-scroller > .MuiTabs-flexContainer": {
                gap: "var(--ds-spacing-glacial)",
                "> .MuiTab-root": {
                  fontWeight:
                    "var(--ds-typo-supportRegularMetadata-fontWeight)",
                  fontSize: "var(--ds-typo-supportRegularMetadata-fontSize)",
                  lineHeight:
                    "var(--ds-typo-supportRegularMetadata-lineHeight)",
                  letterSpacing:
                    "var(--ds-typo-supportRegularMetadata-letterSpacing)",
                  borderRadius: "var(--ds-radius-glacial)",
                  paddingTop: "var(--ds-spacing-glacial)",
                  paddingBottom: "var(--ds-spacing-glacial)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  backgroundColor: "var(--ds-colour-surfaceSecondary)",
                  borderColor: "var(--ds-colour-strokeDefault)",
                  color: "var(--ds-colour-typoSecondary)",
                  "&.Mui-selected": {
                    backgroundColor:
                      "var(--ds-colour-stateSelectedSecondaryHover)",
                    borderColor: "var(--ds-colour-iconTypical)",
                    color: "var(--ds-colour-typoActionTertiary)",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "none",
                    borderColor: "none",
                    color: "var(--ds-colour-typoDisabled)",
                  },
                },
              },
            } as CSSObject,
          },
          {
            props: { "ds-variant": "segmented" } as Partial<DsTabsProps>,
            style: {
              "& .MuiTabs-scroller": {
                backgroundColor: "var(--ds-colour-neutral1)",
                borderRadius: "var(--ds-radius-glacial)",
                padding: "var(--ds-spacing-quickFreeze)",
                boxSizing: "border-box",
                position: "relative",

                "& .MuiTabs-indicator": {
                  height: "calc(100% - var(--ds-spacing-glacial))",
                  top: "var(--ds-spacing-quickFreeze)",
                  borderRadius: "var(--ds-radius-gelid)",
                  backgroundColor: "var(--ds-colour-surfaceBackground)",
                  zIndex: 1,
                },

                "& .MuiTabs-flexContainer": {
                  gap: "var(--ds-spacing-zero)",
                  position: "relative",
                  zIndex: 2,
                },
                "& .MuiTab-root": {
                  position: "relative",
                  borderBottom: "none",
                  padding:
                    "var(--ds-spacing-gelid) var(--ds-spacing-frostbite)",
                  minHeight: "unset",
                  color: "var(--ds-colour-typoPrimary)",
                  "&.Mui-selected:not(.Mui-disabled)": {
                    boxShadow: "var(--ds-elevation-2)",
                    borderRadius: "var(--ds-radius-gelid)",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "var(--ds-colour-neutral1)",
                    color: "var(--ds-colour-typoDisabled)",
                    fontWeight: "var(--ds-typo-bodyRegularMedium-fontWeight)",
                  },
                },
              },
            } as CSSObject,
          },
          {
            props: { textFit: true } as Partial<DsTabsProps>,
            style: {
              "> .MuiTabs-scroller > .MuiTabs-flexContainer": {
                "> .MuiTab-root": {
                  paddingLeft: "var(--ds-spacing-bitterCold) !important",
                  paddingRight: "var(--ds-spacing-bitterCold) !important",
                  minWidth: "0 !important",
                  "&.MuiButtonBase-root": {
                    minWidth: "0 !important",
                    paddingLeft: "var(--ds-spacing-bitterCold) !important",
                    paddingRight: "var(--ds-spacing-bitterCold) !important",
                  },
                },
              },
            } as CSSObject,
          },
          {
            props: { "ds-size": "small" } as Partial<DsTabsProps>,
            style: {
              "> .MuiTabs-scroller > .MuiTabs-flexContainer": {
                "> .MuiTab-root": {
                  fontWeight: "var(--ds-typo-bodyRegularSmall-fontWeight)",
                  fontSize: "var(--ds-typo-bodyRegularSmall-fontSize)",
                  lineHeight: "var(--ds-typo-bodyRegularSmall-lineHeight)",
                  letterSpacing:
                    "var(--ds-typo-bodyRegularSmall-letterSpacing)",
                  "&.Mui-selected": {
                    fontWeight: "var(--ds-typo-bodyBoldSmall-fontWeight)",
                    fontSize: "var(--ds-typo-bodyBoldSmall-fontSize)",
                    lineHeight: "var(--ds-typo-bodyBoldSmall-lineHeight)",
                    letterSpacing: "var(--ds-typo-bodyBoldSmall-letterSpacing)",
                  },
                },
              },
            } as CSSObject,
          },
        ],
      } as CSSObject,
      indicator: {
        height: "2px",
        borderRadius: "2px 2px 0px 0px",
      },
    },
  },
};
