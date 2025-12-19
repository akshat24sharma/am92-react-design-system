import React, { useCallback } from "react";
import { DateField } from "@mui/x-date-pickers";
import { useThemeProps } from "@mui/system";

import type { IDateRangePickerTextFieldProps } from "./DsDateRangePicker.Types";
import { DsBox, DsHelperText, DsStack, DsTextField } from "../../../Components";

const StartDateTextField = React.forwardRef<
  HTMLInputElement,
  IDateRangePickerTextFieldProps
>((fieldProps, ref) => {
  const {
    startDateLabelSupportText,
    InputProps,
    startDateLabel,
    // Filter out custom props that shouldn't reach DOM
    helperText,
    startDate,
    endDate,
    onDateChange,
    endDateLabel,
    endDateLabelSupportText,
    customRef,
    focused,
    onFieldClick,
    ...otherProps
  } = fieldProps;
  const { readOnly } = InputProps || {};
  return (
    <DsTextField
      {...otherProps}
      inputRef={ref}
      labelSupportText={startDateLabelSupportText}
      readOnly={readOnly}
      label={startDateLabel}
    />
  );
});

const EndDateTextField = React.forwardRef<
  HTMLInputElement,
  IDateRangePickerTextFieldProps
>((fieldProps, ref) => {
  const {
    endDateLabelSupportText,
    InputProps,
    endDateLabel,
    // Filter out custom props that shouldn't reach DOM
    helperText,
    onFieldClick,
    startDate,
    endDate,
    onDateChange,
    startDateLabel,
    startDateLabelSupportText,
    customRef,
    focused,
    ...otherProps
  } = fieldProps;
  const { readOnly } = InputProps || {};

  return (
    <DsTextField
      {...otherProps}
      inputRef={ref}
      labelSupportText={endDateLabelSupportText}
      readOnly={readOnly}
      label={endDateLabel}
    />
  );
});

const DateRangePickerTextField = React.forwardRef<
  HTMLDivElement,
  IDateRangePickerTextFieldProps
>((props, ref) => {
  const {
    // Filter out custom props that shouldn't reach DOM
    startDate,
    endDate,
    onDateChange,
    startDateLabel,
    endDateLabel,
    customRef,
    format,
    onFieldClick,
  } = props;

  const mergedProps = useThemeProps({
    props,
    name: "MuiPickersInput",
  });

  const {
    helperText,
    slots: DsTextFieldSlots,
    slotProps: DsTextFieldSlotProps,
    error,
    success,
    ...baseTextFieldProps
  } = mergedProps;

  const handleDateChange = useCallback(
    (field: "start" | "end") => (value: unknown) => {
      if (value instanceof Date || value === null) {
        if (field === "start") {
          onDateChange(value, endDate ?? null);
        } else {
          onDateChange(startDate ?? null, value);
        }
      }
    },
    [startDate, endDate, onDateChange]
  );

  return (
    <DsBox ref={ref}>
      <DsStack direction="row" gap="var(--ds-spacing-bitterCold)">
        <DateField
          slots={{ textField: StartDateTextField }}
          error={props.error}
          slotProps={{
            textField: {
              value: startDate,
              label: startDateLabel,
              inputRef: customRef,
              placeholder: format?.toLowerCase?.(),
              onClick: () => onFieldClick("start"),
              onChange: handleDateChange("start"),
              ...DsTextFieldSlots,
              ...DsTextFieldSlotProps,
            },
          }}
          {...baseTextFieldProps}
        />

        <DateField
          {...baseTextFieldProps}
          slots={{ textField: EndDateTextField }}
          slotProps={{
            textField: {
              value: endDate,
              label: endDateLabel,
              placeholder: format?.toLowerCase?.(),
              onClick: () => onFieldClick("end"),
              onChange: handleDateChange("end"),
              ...DsTextFieldSlots,
              ...DsTextFieldSlotProps,
            },
          }}
        />
      </DsStack>

      {helperText && (
        <DsHelperText helperText={helperText} error={error} success={success} />
      )}
    </DsBox>
  );
});

DateRangePickerTextField.displayName = "DateRangePickerTextField";

export default DateRangePickerTextField;
