import { useEffect, useRef, useState } from "react";
import { useThemeProps } from "@mui/system";
import {
  type DateValidationError,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { DsDatePicker } from "../DsDatePicker";
import { getErrorFromErrorMap } from "../DsDatePicker/utils";
import { DateRangePickerActionBar } from "./DateRangePickerActionBar";
import { DateRangePickerDay } from "./DateRangePickerDay";
import { DateRangePickerHeader } from "./DateRangePickerHeader";
import DateRangePickerTextField from "./DateRangePickerTextField";
import type {
  IDateRangePickerTextFieldProps,
  IDsDateRangePickerProps,
} from "./DsDateRangePicker.Types";
import { DsDateRangePickerDefaultProps } from "./DsDateRangePicker.Types";

export const DsDateRangePicker = (InProps: IDsDateRangePickerProps) => {
  const props = { ...DsDateRangePickerDefaultProps, ...InProps };

  const {
    value,
    onChange,
    format,
    name,
    orientation,
    startDateLabel,
    endDateLabel,
    startDateLabelSupportText,
    endDateLabelSupportText,
    LocalizationProviderProps: inLocalizationProviderProps,
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
    ...restProps
  } = props;

  const updatedProps = { ...DsDateRangePickerDefaultProps, ...restProps };
  const [startDate, setStartDate] = useState<Date | null>(value?.[0] || null);
  const [endDate, setEndDate] = useState<Date | null>(value?.[1] || null);

  const [activeField, setActiveField] = useState<"start" | "end">("start");
  const [anchorEL, setAnchorEl] = useState<HTMLElement | null>(null);
  const [validationError, setValidationError] = useState<boolean>(false);
  const startRef = useRef<HTMLInputElement>(null);

  // Combined effect for validation, value sync, anchor setup, and field switching
  useEffect(() => {
    // 1. Sync internal state with external value prop changes
    const externalStart = value?.[0];
    const externalEnd = value?.[1];

    const startChanged =
      externalStart?.getTime() !== startDate?.getTime() ||
      (externalStart === null && startDate !== null) ||
      (externalStart !== null && startDate === null);

    const endChanged =
      externalEnd?.getTime() !== endDate?.getTime() ||
      (externalEnd === null && endDate !== null) ||
      (externalEnd !== null && endDate === null);

    if (startChanged) setStartDate(externalStart ?? null);
    if (endChanged) setEndDate(externalEnd ?? null);

    // 2. Set anchor element when activeField or ref changes
    if (startRef?.current) {
      setAnchorEl(startRef.current);
    }

    // 3. Auto-switch to end field when start date is selected but no end date
    if (startDate && !endDate) {
      setActiveField("end");
    }

    // 4. Validate both dates and trigger onError
    const { minDate, maxDate, onError, errorMap } = updatedProps;
    let hasError = false;
    let errorCode: DateValidationError = null;
    let invalidDate = null;

    // Check if start date is greater than end date
    if (startDate && endDate && startDate > endDate) {
      hasError = true;
      errorCode = "invalidDate";
      invalidDate = startDate;
    } else if (startDate && minDate && startDate < minDate) {
      hasError = true;
      errorCode = "minDate";
      invalidDate = startDate;
    } else if (startDate && maxDate && startDate > maxDate) {
      hasError = true;
      errorCode = "maxDate";
      invalidDate = startDate;
    } else if (endDate && minDate && endDate < minDate) {
      hasError = true;
      errorCode = "minDate";
      invalidDate = endDate;
    } else if (endDate && maxDate && endDate > maxDate) {
      hasError = true;
      errorCode = "maxDate";
      invalidDate = endDate;
    }

    setValidationError(hasError);

    if (hasError && typeof onError === "function") {
      const errorMessage = getErrorFromErrorMap(
        errorMap,
        errorCode,
        invalidDate
      );
      onError(name, errorMessage, errorCode, invalidDate);
    }
  }, [
    value,
    startDate,
    endDate,
    activeField,
    updatedProps.minDate,
    updatedProps.maxDate,
    updatedProps.onError,
    updatedProps.errorMap,
    name,
  ]);

  const handleDateClick = (date: Date | null, field: "start" | "end") => {
    if (!date) return;

    if (field === "start") {
      const newEndDate = endDate && date > endDate ? null : endDate;
      onChange(name, [date, newEndDate]);
      setStartDate(date);
      if (newEndDate === null && endDate !== null) {
        setEndDate(null);
      }
      setActiveField("end");
    }

    if (field === "end") {
      if (!startDate) {
        return;
      }

      if (date < startDate) {
        onChange?.(name, [date, endDate]);
        setStartDate(date);
        // setEndDate(null);
        setActiveField("end");
      } else {
        onChange?.(name, [startDate, date]);
        setEndDate(date);
      }
    }
  };
  const handleClear = () => {
    onChange?.(name, [null, null]);
    setStartDate(null);
    setEndDate(null);
    setActiveField("start");
  };

  const handleTextFieldChange = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    setStartDate(startDate);
    setEndDate(endDate);
    onChange?.(name, [startDate, endDate]);
  };

  const LocalizationProviderProps = useThemeProps({
    props: inLocalizationProviderProps,
    name: "MuiLocalizationProvider",
  });

  const onFieldClick = (field: "start" | "end") => {
    setActiveField(field);
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      {...LocalizationProviderProps}
    >
      <DsDatePicker
        {...updatedProps}
        name={name}
        onChange={() => {}}
        value={activeField === "start" ? startDate : endDate || startDate}
        slots={{
          actionBar: (actionBarProps) => (
            <DateRangePickerActionBar
              startDate={startDate}
              endDate={endDate}
              onClear={handleClear}
              {...actionBarProps}
            />
          ),
          toolbar: (toolbarProps) => (
            <DateRangePickerHeader
              startDate={startDate}
              endDate={endDate}
              activeField={activeField}
              onFieldChange={setActiveField}
              {...toolbarProps}
              {...props.slotProps?.toolbar}
            />
          ),
          textField: DateRangePickerTextField,
          day: (dayProps) => (
            <DateRangePickerDay
              {...dayProps}
              startDate={startDate}
              endDate={endDate}
              activeField={activeField}
              onDateClick={handleDateClick}
            />
          ),
          ...props.slots,
        }}
        slotProps={{
          ...props.slotProps,
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
            error: error || validationError, // Use custom validation or external error
            startDate,
            endDate,
            startDateLabel,
            endDateLabel,
            startDateLabelSupportText,
            endDateLabelSupportText,
            onDateChange: handleTextFieldChange,
            orientation,
            customRef: startRef,
            ...props.slotProps?.textField,
          } as IDateRangePickerTextFieldProps,
          day: undefined,
          popper: {
            anchorEl: anchorEL,
            ...props.slotProps?.popper,
          },
        }}
        inputRef={startRef}
        format={format}
      />
    </LocalizationProvider>
  );
};
