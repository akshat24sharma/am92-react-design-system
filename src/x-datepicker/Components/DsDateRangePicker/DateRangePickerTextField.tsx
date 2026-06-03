import React, { useCallback } from "react";
import { DateField } from "@mui/x-date-pickers";
import { useThemeProps } from "@mui/system";

import type { IDateRangePickerTextFieldProps } from "./DsDateRangePicker.Types";
import { DsBox, DsHelperText, DsStack, DsTextField } from "../../../Components";

/**
 * Factory function that creates a DateTextField component for a specific field type (start or end)
 * This approach allows us to have a single component implementation while maintaining
 * type safety and proper field-specific behavior.
 *
 * Uses forwardRef to pass the ref from MUI DateField down to the underlying DsTextField input.
 * This wrapper is necessary because DateField expects a specific TextField interface,
 * and we need to bridge between MUI's DateField props and our DsTextField component.
 */
const createDateTextField = (fieldType: "start" | "end") => {
  return React.forwardRef<HTMLInputElement, IDateRangePickerTextFieldProps>(
    (fieldProps, ref) => {
      const {
        startDateLabelSupportText,
        endDateLabelSupportText,
        InputProps,
        startDateLabel,
        endDateLabel,
        // Filter out custom props that shouldn't reach DOM
        helperText,
        startDate,
        endDate,
        onDateChange,
        customRef,
        focused,
        onFieldClick,
        ...otherProps
      } = fieldProps;

      const { readOnly } = InputProps || {};

      // Determine the appropriate props based on field type
      const fieldLabel = fieldType === "start" ? startDateLabel : endDateLabel;
      const fieldLabelSupportText =
        fieldType === "start"
          ? startDateLabelSupportText
          : endDateLabelSupportText;

      return (
        <DsTextField
          {...otherProps}
          inputRef={ref} // Forward the ref from DateField to DsTextField's input element
          labelSupportText={fieldLabelSupportText}
          readOnly={readOnly}
          label={fieldLabel}
        />
      );
    }
  );
};

// Create specialized components using the factory function
const StartDateTextField = createDateTextField("start");
const EndDateTextField = createDateTextField("end");

/**
 * Main text field component for date range picker
 * Displays two date input fields side by side for start and end dates
 * Integrates with MUI DateField and handles date range specific logic
 */
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
    slots,
    slotProps: DsTextFieldSlotProps,
    error,
    success,
    ...baseTextFieldProps
  } = mergedProps;

  /**
   * Handles date changes for both start and end fields
   * Maintains the other date value when one field changes
   * @param field - Which field is changing ("start" or "end")
   * @returns Change handler function for the specified field
   */
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
              inputRef: customRef, // Reference for focus management
              placeholder: format?.toLowerCase?.(),
              onClick: () => onFieldClick("start"),
              onChange: handleDateChange("start"),
              ...DsTextFieldSlotProps,
            },
          }}
          {...baseTextFieldProps}
        />

        <DateField
          slots={{ textField: EndDateTextField }}
          slotProps={{
            textField: {
              value: endDate,
              placeholder: format?.toLowerCase?.(),
              onClick: () => onFieldClick("end"),
              onChange: handleDateChange("end"),
              ...DsTextFieldSlotProps,
            },
          }}
          {...baseTextFieldProps}
        />
      </DsStack>

      {/* Helper text for validation messages or additional guidance */}
      {helperText && (
        <DsHelperText helperText={helperText} error={error} success={success} />
      )}
    </DsBox>
  );
});

DateRangePickerTextField.displayName = "DateRangePickerTextField";

export default DateRangePickerTextField;
