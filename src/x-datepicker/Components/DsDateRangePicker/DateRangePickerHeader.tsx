import React, { useMemo } from "react";

import { useThemeProps } from "@mui/system";
import {
  usePickerActionsContext,
  usePickerTranslations,
} from "@mui/x-date-pickers";
import { useUtils } from "@mui/x-date-pickers/internals";

import type { IDateRangePickerHeaderProps } from "./DsDateRangePicker.Types";
import {
  DsButtonBase,
  DsIconButton,
  DsRemixIcon,
  DsStack,
  DsTypography,
} from "../../../Components";

export const DateRangePickerHeader = React.forwardRef(
  function DatePickerToolbar(
    inProps: IDateRangePickerHeaderProps,
    ref: React.Ref<HTMLDivElement>
  ) {
    const props = useThemeProps({
      props: inProps,
      name: "MuiDatePickerToolbar",
    });

    const { startDate, endDate, activeField, onFieldChange } = props;
    const { cancelValueChanges } = usePickerActionsContext();

    const translations = usePickerTranslations();
    const utils = useUtils();

    const createDateFieldButton = (
      field: "start" | "end",
      label: string,
      date: Date | null,
      isDisabled?: boolean
    ) => (
      <DsButtonBase
        key={field}
        onClick={() => !isDisabled && onFieldChange(field)}
        disabled={isDisabled}
        sx={{
          flex: 1,
          justifyContent: "flex-start",
          py: "var(--ds-spacing-bitterCold)",
          pl: "var(--ds-spacing-bitterCold)",
          borderBottom:
            activeField === field
              ? "1px solid var(--ds-colour-actionSecondary)"
              : undefined,
          backgroundColor: isDisabled
            ? "var(--ds-colour-stateDisabledSurface)"
            : activeField === field
            ? "var(--ds-colour-surfacePrimary) !important"
            : "var(--ds-colour-surfaceSecondary) !important",
          borderRadius: 0,
          "&.MuiButton-containedPrimary:disabled": {
            backgroundColor: "var(--ds-colour-stateDisabledSurface)",
          },
        }}
      >
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

    const dateFieldButtons = useMemo(
      () => [
        createDateFieldButton("start", "Start", startDate),
        createDateFieldButton("end", "End", endDate, !startDate),
      ],
      [startDate, endDate, activeField, onFieldChange, utils]
    );

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
          {dateFieldButtons}
        </DsStack>
      </DsStack>
    );
  }
);
