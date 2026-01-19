import { TabsProps } from "@mui/material";

export interface DsTabsProps extends TabsProps {
  "ds-variant"?: "container" | "segmented";
  "ds-size"?: "small" | "medium";
  textFit?: boolean;
}

export const DsTabsDefaultProps: DsTabsProps = {
  indicatorColor: "secondary",
  textColor: "secondary",
  "ds-size": "medium",
  textFit: false,
};
