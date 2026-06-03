import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useThemeProps } from "@mui/system";
import {
  type DateCalendarSlotProps,
  type DateCalendarSlots,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { DsDatePicker } from "../DsDatePicker";
import { getErrorFromErrorMap } from "../DsDatePicker/utils";
import { DateRangePickerActionBar } from "./DateRangePickerActionBar";
import { DateRangePickerDay } from "./DateRangePickerDay";
import { DateRangePickerHeader } from "./DateRangePickerHeader";
import DateRangePickerTextField from "./DateRangePickerTextField";
import {
  areDatesEqual,
  getCalendarReferenceDate,
  handleDateRangeClick,
  validateDateRange,
} from "./helpers";
import type {
  IDateRangePickerActionBarProps,
  IDateRangePickerTextFieldProps,
  IDsDateRangePickerProps,
} from "./DsDateRangePicker.Types";
import { DsDateRangePickerDefaultProps } from "./DsDateRangePicker.Types";
import {
  BaseDatePickerSlotProps,
  BaseDatePickerSlots,
} from "@mui/x-date-pickers/DatePicker/shared";

/**
 * Main DsDateRangePicker component that provides a complete date range selection interface
 * Orchestrates multiple sub-components including text fields, calendar, action bar, and header
 *
 * Key Features:
 * - Dual date selection (start and end dates)
 * - Integrated validation with minDate/maxDate constraints
 * - Auto field switching for better UX
 * - Custom slot-based architecture for extensibility
 * - Proper ref forwarding and focus management
 *
 * Architecture:
 * - Uses MUI X DatePicker as the base with custom slots
 * - Manages internal state synchronized with external value prop
 * - Provides validation through helper functions
 * - Integrates with AM92 design system components
 */
export const DsDateRangePicker = (InProps: IDsDateRangePickerProps) => {
  const props = { ...DsDateRangePickerDefaultProps, ...InProps };

  const {
    value,
    onChange,
    format,
    name,
    startDateLabel,
    endDateLabel,
    startDateLabelSupportText,
    endDateLabelSupportText,
    valueType,
    required,
    fullWidth,
    onBlur,
    onFocus,
    InputLabelProps,
    helperText,
    HelperTextProps,
    FormControlProps,
    success,
    error,
    minDate,
    maxDate,
    onError,
    errorMap,
    ...restProps
  } = props;

  // Internal state management for date range selection
  const [startDate, setStartDate] = useState<Date | null>(value?.[0] ?? null);
  const [endDate, setEndDate] = useState<Date | null>(value?.[1] ?? null);

  // Track which field is currently active for calendar interaction
  const [activeField, setActiveField] = useState<"start" | "end">("start");

  // Popover anchor element for calendar positioning
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Internal validation state separate from external error prop
  const [validationError, setValidationError] = useState<boolean>(false);

  // Ref for focus management and popover anchoring
  const startRef = useRef<HTMLInputElement>(null);

  // Synchronize internal state with external value prop changes and handle UX improvements
  useEffect(() => {
    const externalStart = value?.[0] ?? null;
    const externalEnd = value?.[1] ?? null;

    // Update internal state when external value changes (controlled component behavior)
    if (!areDatesEqual(externalStart, startDate)) {
      setStartDate(externalStart);
    }
    if (!areDatesEqual(externalEnd, endDate)) {
      setEndDate(externalEnd);
    }

    // Initialize anchor element for popover positioning on first render
    if (startRef.current && !anchorEl) {
      setAnchorEl(startRef.current);
    }

    // UX Enhancement: Auto-switch to end field when start date is selected
    // This provides a smoother user experience for range selection
    if (startDate && !endDate && activeField === "start") {
      setActiveField("end");
    }
  }, [value, startDate, endDate, activeField, anchorEl]);

  // Memoized validation logic for performance optimization
  // Recalculates only when dates or constraints change
  const validationResult = useMemo(() => {
    return validateDateRange(startDate, endDate, minDate, maxDate);
  }, [startDate, endDate, minDate, maxDate]);

  // Handle validation results and trigger error callbacks when validation fails
  useEffect(() => {
    const { hasError, errorCode, invalidDate } = validationResult;
    setValidationError(hasError);

    // Notify parent component of validation errors with detailed error information
    if (hasError && onError) {
      const errorMessage = getErrorFromErrorMap(
        errorMap,
        errorCode,
        invalidDate
      );
      onError(name, errorMessage, errorCode, invalidDate);
    }
  }, [validationResult, onError, errorMap, name]);

  // Handle calendar date clicks with proper range logic and field switching
  const handleDateClick = useCallback(
    (date: Date | null, field: "start" | "end") => {
      const result = handleDateRangeClick(date, field, startDate, endDate);
      if (!result) return;

      const { dateRange, activeField: newActiveField } = result;
      // Update both internal state and notify parent of changes
      onChange(name, dateRange);
      setStartDate(dateRange[0]);
      setEndDate(dateRange[1]);
      setActiveField(newActiveField);
    },
    [startDate, endDate, onChange, name]
  );

  // Clear both dates and reset to initial state
  const handleClear = useCallback(() => {
    onChange(name, [null, null]);
    setStartDate(null);
    setEndDate(null);
    setActiveField("start");
  }, [onChange, name]);

  // Handle text field changes (manual input)
  const handleTextFieldChange = useCallback(
    (newStartDate: Date | null, newEndDate: Date | null) => {
      setStartDate(newStartDate);
      setEndDate(newEndDate);
      onChange(name, [newStartDate, newEndDate]);
    },
    [onChange, name]
  );

  const LocalizationProviderProps = useThemeProps({
    props: props.LocalizationProviderProps,
    name: "MuiLocalizationProvider",
  });

  // Handle field clicks with validation - prevent end field selection without start date
  const onFieldClick = useCallback(
    (field: "start" | "end") => {
      // UX Logic: If user clicks end field without selecting start date, redirect to start
      if (field === "end" && !startDate) {
        setActiveField("start");
      } else {
        setActiveField(field);
      }
    },
    [startDate]
  );

  // Calculate optimal reference date for calendar navigation based on active field and selected dates
  // This ensures the calendar shows the most relevant month for the current context
  const referenceDate = useMemo(
    () => getCalendarReferenceDate(activeField, startDate, endDate),
    [activeField, startDate, endDate]
  );

  // Memoized slot props configuration to prevent unnecessary re-renders
  // Each slot receives specific props needed for its functionality
  const slotProps = useMemo(
    () => ({
      ...props.slotProps,
      actionBar: {
        startDate,
        endDate,
        onClear: handleClear,
        actions: ["clear", "accept"],
        ...props.slotProps?.actionBar,
      } as IDateRangePickerActionBarProps,
      toolbar: {
        startDate,
        endDate,
        activeField,
        onFieldChange: setActiveField,
        ...props.slotProps?.toolbar,
      } as BaseDatePickerSlotProps["toolbar"],
      textField: {
        required,
        fullWidth,
        onBlur,
        onFocus,
        InputLabelProps,
        helperText,
        HelperTextProps,
        FormControlProps,
        success,
        format,
        onFieldClick,
        error: error || validationError, // Combine external and internal validation errors
        startDate,
        endDate,
        startDateLabel,
        endDateLabel,
        startDateLabelSupportText,
        endDateLabelSupportText,
        onDateChange: handleTextFieldChange,
        customRef: startRef, // For focus management and popover anchoring
        ...props.slotProps?.textField,
      } as Partial<IDateRangePickerTextFieldProps>,
      day: {
        startDate,
        endDate,
        activeField,
        onDateClick: handleDateClick,
        ...props.slotProps?.day,
      } as DateCalendarSlotProps["day"],
      popper: {
        anchorEl, // Element to anchor the calendar popover to
        ...props.slotProps?.popper,
      },
    }),
    [
      props.slotProps,
      startDate,
      endDate,
      activeField,
      handleClear,
      handleTextFieldChange,
      handleDateClick,
      required,
      fullWidth,
      onBlur,
      onFocus,
      InputLabelProps,
      helperText,
      HelperTextProps,
      FormControlProps,
      success,
      format,
      onFieldClick,
      error,
      validationError,
      startDateLabel,
      endDateLabel,
      startDateLabelSupportText,
      endDateLabelSupportText,
      anchorEl,
    ]
  );

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      {...LocalizationProviderProps}
    >
      <DsDatePicker
        {...restProps}
        name={name}
        referenceDate={referenceDate}
        minDate={minDate}
        maxDate={maxDate}
        slots={{
          actionBar: DateRangePickerActionBar,
          toolbar: DateRangePickerHeader as BaseDatePickerSlots["toolbar"],
          textField: DateRangePickerTextField,
          day: DateRangePickerDay as DateCalendarSlots["day"],
          ...props.slots,
        }}
        slotProps={slotProps}
        inputRef={startRef}
        format={format}
      />
    </LocalizationProvider>
  );
};
