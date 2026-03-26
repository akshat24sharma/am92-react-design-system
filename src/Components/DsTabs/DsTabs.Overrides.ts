import { CSSObject } from "@mui/system";
import { DsTabsDefaultProps, DsTabsProps } from "./DsTabs.Types";

export const DsTabsOverrides = {
  MuiTabs: {
    defaultProps: DsTabsDefaultProps,
    styleOverrides: {
      root: {
        minHeight: "36px",
        borderBottom: "1px solid var(--ds-colour-strokeDefault)",
        variants: [
          {
            props: { "ds-variant": "container" } as Partial<DsTabsProps>,
            style: {
              borderBottom: "none",
              "> .MuiTabs-scroller > .MuiTabs-indicator": {
                height: "0px",
              },
              "> .MuiTabs-scroller > .MuiTabs-flexContainer": {
                gap: "var(--ds-spacing-frostbite)",
                "> .MuiTab-root": {
                  fontWeight: "var(--ds-typo-bodyRegularMedium-fontWeight)",
                  fontSize: "var(--ds-typo-bodyRegularMedium-fontSize)",
                  lineHeight: "var(--ds-typo-bodyRegularMedium-lineHeight)",
                  letterSpacing:
                    "var(--ds-typo-bodyRegularMedium-letterSpacing)",
                  borderRadius: "var(--ds-radius-glacial)",
                  padding:
                    "var(--ds-spacing-glacial) var(--ds-spacing-frostbite)",
                  border: "1px solid var(--ds-colour-strokeDefault)",
                  backgroundColor: "var(--ds-colour-surfaceSecondary)",
                  color: "var(--ds-colour-typoSecondary)",
                  "&.Mui-selected": {
                    backgroundColor: "var(--ds-colour-neutral2)",
                    borderColor: "var(--ds-colour-iconTypical)",
                    color: "var(--ds-colour-typoActionTertiary)",
                    fontWeight: "var(--ds-typo-bodyBoldMedium-fontWeight)",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "var(--ds-colour-stateDisabledSurface)",
                    borderColor: "var(--ds-colour-strokeDisabled)",
                    color: "var(--ds-colour-typoDisabled)",
                  },
                },
              },
            } as CSSObject,
          },
          {
            props: { "ds-variant": "segmented" } as Partial<DsTabsProps>,
            style: {
              borderBottom: "none",
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
            props: (props: DsTabsProps) =>
              props["ds-textfit"] === "fixed" &&
              props["ds-variant"] !== "container" &&
              props["ds-variant"] !== "segmented" &&
              props.orientation !== "vertical",
            style: {
              "> .MuiTabs-scroller > .MuiTabs-flexContainer": {
                borderBottom: "none",
                "> .MuiTab-root": {
                  minWidth: "unset",
                  paddingRight: "0 !important",
                  paddingLeft: "0 !important",
                  marginRight: "var(--ds-spacing-bitterCold) !important",
                  marginLeft: "var(--ds-spacing-bitterCold) !important",
                },
              },
            } as CSSObject,
          },
          {
            props: { orientation: "vertical" } as Partial<DsTabsProps>,
            style: {
              borderBottom: "none",
              "> .MuiTabs-scroller > .MuiTabs-flexContainer": {
                "> .MuiTab-root": {
                  borderBottom: "1px solid var(--ds-colour-strokeDefault)",
                },
              } as CSSObject,
            },
          },
          {
            props: { "ds-size": "small" } as Partial<DsTabsProps>,
            style: {
              minHeight: "auto",
              "> .MuiTabs-scroller > .MuiTabs-flexContainer": {
                "> .MuiTab-root": {
                  minHeight: "unset",
                  fontWeight: "var(--ds-typo-bodyRegularSmall-fontWeight)",
                  fontSize: "var(--ds-typo-bodyRegularSmall-fontSize)",
                  lineHeight: "var(--ds-typo-bodyRegularSmall-lineHeight)",
                  padding: "var(--ds-spacing-gelid) var(--ds-spacing-glacial)",
                  letterSpacing:
                    "var(--ds-typo-bodyRegularSmall-letterSpacing)",
                  "&.Mui-selected": {
                    fontWeight: "var(--ds-typo-bodyBoldSmall-fontWeight)",
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
