import { FC } from "react";
import { DsTabs } from "../DsTabs/DsTabs.Component";
import { DsSegmentedControlProps } from "./DsSegmentedControl.Types";

export const DsSegmentedControl: FC<DsSegmentedControlProps> = (props) => {
  return (
    <DsTabs
      {...props}
      sx={{
        minHeight: "unset",
        "& .MuiTabs-scroller": {
          backgroundColor: "var(--ds-colour-neutral1)",
          borderRadius: "var(--ds-radius-glacial)",
          padding: "var(--ds-spacing-quickFreeze)",
          boxSizing: "border-box",
          position: "relative",

          "& .MuiTabs-indicator": {
            height: "calc(100% - var(--ds-spacing-glacial))",
            top: "var(--ds-spacing-quickFreeze)",
            borderRadius:
              "calc(var(--ds-radius-quickFreeze) + var(--ds-radius-deepFreeze))",
            backgroundColor: "var(--ds-colour-surfaceBackground)",
            transition: "all 300ms ease",
            zIndex: 1,
            overflow: "hidden",
          },

          "& .MuiTabs-flexContainer": {
            gap: "var(--ds-spacing-zero)",
            position: "relative",
            zIndex: 2,
          },
        },
        ...props.sx,
      }}
    />
  );
};
