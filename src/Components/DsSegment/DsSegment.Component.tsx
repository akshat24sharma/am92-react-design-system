import { FC } from "react";
import { DsSegmentProps } from "./DsSegment.Types";
import { DsTab } from "../DsTab";

export const DsSegment: FC<DsSegmentProps> = (props) => {
  return (
    <DsTab
      {...props}
      sx={{
        position: "relative",
        borderBottom: "none",
        padding:
          "calc(var(--ds-spacing-quickFreeze) + var(--ds-spacing-deepFreeze)) var(--ds-spacing-frostbite)",
        minHeight: "unset",
        height: "auto",
        color: "var(--ds-colour-typoPrimary) !important",
        "&.Mui-selected:not(.Mui-disabled)": {
          boxShadow: "var(--ds-elevation-2)",
          borderRadius:
            "calc(var(--ds-radius-quickFreeze) + var(--ds-radius-deepFreeze))",
        },
        "&.Mui-disabled": {
          backgroundColor: "var(--ds-colour-neutral1)",
          color: "var(--ds-colour-typoDisabled) !important",
          fontWeight: "var(--ds-typo-bodyRegularMedium-fontWeight)",
        },
        ...props.sx,
      }}
    />
  );
};
