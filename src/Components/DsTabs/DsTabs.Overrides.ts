import type { CSSObject } from "@mui/system";

import type { DsTabsProps } from "./DsTabs.Types";
import { DsTabsDefaultProps } from "./DsTabs.Types";

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
                  borderRadius: "var(--ds-radius-quickFreeze)",
                  paddingTop: "var(--ds-spacing-frostbite)",
                  paddingBottom: "var(--ds-spacing-frostbite)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  backgroundColor: "var(--ds-colour-surfaceSecondary)",
                  borderColor: "var(--ds-colour-strokeDefault)",
                  color: "var(--ds-colour-typoSecondary)",
                  "&.Mui-selected": {
                    backgroundColor:
                      "var(--ds-colour-stateSelectedSecondaryHover)",
                    borderColor: "var(--ds-colour-strokeSecondarySelected)",
                    color: "var(--ds-colour-typoActionTertiary)",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "transparent",
                    borderColor: "transparent",
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
        ],
      } as CSSObject,
      indicator: {
        height: "2px",
        borderRadius: "2px 2px 0px 0px",
      },
    },
  },
};
