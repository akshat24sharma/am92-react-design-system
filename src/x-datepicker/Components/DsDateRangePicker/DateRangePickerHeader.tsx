import React, { useCallback } from "react";

import { useThemeProps } from "@mui/system";
import {
  usePickerActionsContext,
  usePickerTranslations,
} from "@mui/x-date-pickers";

import type { IDateRangePickerHeaderProps } from "./DsDateRangePicker.Types";
import { DateFieldButton } from "./DateFieldButton";
import {
  DsIconButton,
  DsRemixIcon,
  DsStack,
  DsTypography,
} from "../../../Components";

/**
 * Header/toolbar component for date range picker
 * Displays the picker title with close button and start/end date field buttons
 * Allows users to switch between start and end date selection
 */
export const DateRangePickerHeader = React.forwardRef(
  function DateRangePickerHeader(
    inProps: IDateRangePickerHeaderProps,
    ref: React.Ref<HTMLDivElement>,
  ) {
    const props = useThemeProps({
      props: inProps,
      name: "DsDateRangePickerHeader",
    });

    const { startDate, endDate, activeField, onFieldChange } = props;
    const { cancelValueChanges } = usePickerActionsContext();

    const translations = usePickerTranslations();

    const handleStartFieldClick = useCallback(() => {
      onFieldChange("start");
    }, [onFieldChange]);

    const handleEndFieldClick = useCallback(() => {
      if (startDate) onFieldChange("end");
    }, [startDate, onFieldChange]);

    return (
      <DsStack
        ref={ref}
        sx={{
          gridArea: "1 / 2 / auto / 4",
          borderBottom: "1px solid var(--ds-colour-strokeDefault)",
        }}
      >
        <DsStack
          sx={{
            borderRadius:
              "var(--ds-spacing-bitterCold) var(--ds-spacing-bitterCold) var(--ds-spacing-zero) var(--ds-spacing-zero)",
            backgroundColor: "var(--ds-colour-surfaceSecondary)",
            padding: "var(--ds-spacing-cool) var(--ds-spacing-bitterCold)",
          }}
        >
          <DsTypography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            variant="headingBoldExtraSmall"
          >
            {translations.datePickerToolbarTitle}
            <DsIconButton onClick={cancelValueChanges}>
              <DsRemixIcon className="ri-close-line" />
            </DsIconButton>
          </DsTypography>
        </DsStack>
        <DsStack
          direction="row"
          sx={{
            width: "100%",
            borderTop: "1px solid var(--ds-colour-strokeDefault)",
          }}
        >
          <DateFieldButton
            label="Start"
            date={startDate}
            isActive={activeField === "start"}
            onClick={handleStartFieldClick}
          />

          <DateFieldButton
            label="End"
            date={endDate}
            isActive={activeField === "end"}
            isDisabled={!startDate} // Can't select end date without start date
            onClick={handleEndFieldClick}
          />
        </DsStack>
      </DsStack>
    );
  },
);
