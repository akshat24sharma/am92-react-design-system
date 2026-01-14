import { TabsProps } from "@mui/material";

export interface DsTabsProps extends TabsProps {
  "ds-variant"?: "container" | "segmented";
}

export const DsTabsDefaultProps: DsTabsProps = {
  indicatorColor: "secondary",
  textColor: "secondary",
};
