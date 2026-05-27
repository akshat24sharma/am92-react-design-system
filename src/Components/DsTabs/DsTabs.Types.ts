import { TabsProps } from "@mui/material";

export interface DsTabsProps extends TabsProps {
  "ds-variant"?: "container" | "segmented";
  "ds-size"?: "small" | "medium";
  "ds-textfit"?: "fixed" | "filled";
}

export const DsTabsDefaultProps: DsTabsProps = {
  indicatorColor: "secondary",
  textColor: "secondary",
  "ds-size": "medium",
  "ds-textfit": "filled",
};
