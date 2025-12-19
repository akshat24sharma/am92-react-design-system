import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useThemeProps } from "@mui/system";
import {
  DateCalendarSlotProps,
  DateCalendarSlots,
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
  IDateRangePickerActionBarProps,
  IDateRangePickerTextFieldProps,
  IDsDateRangePickerProps,
} from "./DsDateRangePicker.Types";
import { DsDateRangePickerDefaultProps } from "./DsDateRangePicker.Types";
import {
  BaseDatePickerSlotProps,
  BaseDatePickerSlots,
} from "@mui/x-date-pickers/DatePicker/shared";

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
    ...restProps
  } = props;

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
    const { minDate, maxDate, onError, errorMap } = props;
    let hasError = false;
    let errorCode: DateValidationError = null;
    let invalidDate = null;

    // Validate date range and bounds
    const validateDate = (date: Date | null) => {
      if (!date) return null;
      if (minDate && date < minDate) return { code: "minDate", date };
      if (maxDate && date > maxDate) return { code: "maxDate", date };
      return null;
    };

    // Check range validity and individual date bounds
    const startValidation = validateDate(startDate);
    const endValidation = validateDate(endDate);
    const rangeInvalid = startDate && endDate && startDate > endDate;

    if (rangeInvalid) {
      hasError = true;
      errorCode = "invalidDate";
      invalidDate = startDate;
    } else if (startValidation) {
      hasError = true;
      errorCode = startValidation.code as DateValidationError;
      invalidDate = startValidation.date;
    } else if (endValidation) {
      hasError = true;
      errorCode = endValidation.code as DateValidationError;
      invalidDate = endValidation.date;
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
    props.minDate,
    props.maxDate,
    props.onError,
    props.errorMap,
    name,
  ]);

  const handleDateClick = (date: Date | null, field: "start" | "end") => {
    if (!date) return;

    if (field === "start") {
      const newEndDate = endDate && date > endDate ? null : endDate;
      onChange(name, [date, newEndDate]);
      setStartDate(date);
      setEndDate(newEndDate);
      setActiveField("end");
    }

    if (field === "end") {
      if (!startDate) {
        return;
      }

      if (date < startDate) {
        onChange(name, [date, endDate]);
        setStartDate(date);
        setActiveField("end");
      } else {
        onChange(name, [startDate, date]);
        setEndDate(date);
      }
    }
  };

  const handleClear = () => {
    onChange(name, [null, null]);
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
    onChange(name, [startDate, endDate]);
  };

  const LocalizationProviderProps = useThemeProps({
    props: props.LocalizationProviderProps,
    name: "MuiLocalizationProvider",
  });

  const onFieldClick = useCallback(
    (field: "start" | "end") => {
      if (field === "end" && !startDate) {
        setActiveField("start");
      } else {
        setActiveField(field);
      }
    },
    [startDate]
  );

  const referenceDate = useMemo(
    () =>
      (activeField === "end" ? endDate : startDate) || startDate || new Date(),
    [activeField, endDate, startDate]
  );

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      {...LocalizationProviderProps}
    >
      <DsDatePicker
        {...restProps}
        name={name}
        // Set calendar reference date based on active field for better UX
        referenceDate={referenceDate}
        slots={{
          actionBar: DateRangePickerActionBar,
          toolbar: DateRangePickerHeader as BaseDatePickerSlots["toolbar"],
          textField: DateRangePickerTextField,
          day: DateRangePickerDay as DateCalendarSlots["day"],
          ...props.slots,
        }}
        slotProps={{
          ...props.slotProps,
          actionBar: {
            startDate: startDate,
            endDate: endDate,
            onClear: handleClear,
            actions: ["clear", "accept"],
            ...props.slotProps?.actionBar,
          } as IDateRangePickerActionBarProps,
          toolbar: {
            startDate: startDate,
            endDate: endDate,
            activeField: activeField,
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
            error: error || validationError, // Use custom validation or external error
            startDate,
            endDate,
            startDateLabel,
            endDateLabel,
            startDateLabelSupportText,
            endDateLabelSupportText,
            onDateChange: handleTextFieldChange,
            customRef: startRef,
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
