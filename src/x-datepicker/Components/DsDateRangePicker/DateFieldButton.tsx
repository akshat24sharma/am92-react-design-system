import React, { useMemo } from "react";
import { useUtils } from "@mui/x-date-pickers/internals";
import { DsButtonBase, DsTypography } from "../../../Components";
import { IDateFieldButtonProps } from "./DsDateRangePicker.Types";

/**
 * Reusable button component for date range picker header fields
 * Displays date field with label, formatted date value, and interactive states
 * Used for both "Start" and "End" date buttons in the date range picker
 */
export const DateFieldButton: React.FC<IDateFieldButtonProps> = ({
  label,
  date,
  isActive,
  isDisabled = false,
  onClick,
}) => {
  const utils = useUtils();

  const buttonSx = useMemo(
    () => ({
      flex: 1,
      justifyContent: "flex-start",
      py: "var(--ds-spacing-bitterCold)",
      pl: "var(--ds-spacing-bitterCold)",
      borderBottom: isActive
        ? "1px solid var(--ds-colour-actionSecondary)"
        : undefined,
      backgroundColor: isDisabled
        ? "var(--ds-colour-stateDisabledSurface)"
        : isActive
          ? "var(--ds-colour-surfacePrimary) !important"
          : "var(--ds-colour-surfaceSecondary) !important",
      borderRadius: "var(--ds-radius-zero)",
      "&.MuiButton-containedPrimary:disabled": {
        backgroundColor: "var(--ds-colour-stateDisabledSurface)",
      },
    }),
    [isDisabled, isActive],
  );

  return (
    <DsButtonBase onClick={onClick} disabled={isDisabled} sx={buttonSx}>
      <DsTypography
        color="var(--ds-colour-typoPrimary)"
        variant="bodyBoldSmall"
        sx={{
          marginRight: "var(--ds-spacing-glacial)",
        }}
      >
        {label}
      </DsTypography>
      <DsTypography
        variant="bodyBoldSmall"
        color="var(--ds-colour-typoPrimary)"
      >
        {date
          ? utils.formatByString(date, utils.formats.fullDate)
          : "Pick a Date"}
      </DsTypography>
    </DsButtonBase>
  );
};
