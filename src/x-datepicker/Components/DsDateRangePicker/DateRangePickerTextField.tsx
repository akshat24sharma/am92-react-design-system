import React from "react";
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
    orientation,
    customRef,
    focused,
    ownerState,
    setOpen,
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
    startDate,
    endDate,
    onDateChange,
    startDateLabel,
    startDateLabelSupportText,
    orientation,
    customRef,
    focused,
    ownerState,
    setOpen,
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
    startDate,

    endDate,
    onDateChange,
    startDateLabel,
    endDateLabel,
    orientation = "row",
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

  return (
    <DsBox ref={ref}>
      <DsStack
        direction={orientation === "landscape" ? "column" : "row"}
        gap="var(--ds-spacing-bitterCold)"
      >
        <DateField
          slots={{ textField: StartDateTextField }}
          error={props.error}
          slotProps={{
            textField: {
              value: startDate,
              label: startDateLabel,
              inputRef: customRef,
              placeholder: format?.toLowerCase?.(),
              onClick: () => onFieldClick?.("start"),
              onChange: (value: unknown) => {
                if (value instanceof Date || value === null) {
                  onDateChange?.(value, endDate ?? null);
                }
              },
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
              onClick: () => onFieldClick?.("end"),
              onChange: (value: unknown) => {
                if (value instanceof Date || value === null) {
                  onDateChange?.(startDate ?? null, value);
                }
              },
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
