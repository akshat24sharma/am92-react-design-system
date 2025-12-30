import type { DateValidationError } from "@mui/x-date-pickers";
import { startOfDay } from "date-fns";

/**
 * Efficiently compares two dates for equality
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns true if dates are equal, false otherwise
 */
export const areDatesEqual = (
  date1: Date | null,
  date2: Date | null
): boolean => {
  if (date1 === null && date2 === null) return true;
  if (date1 === null || date2 === null) return false;
  return date1.getTime() === date2.getTime();
};

/**
 * Validates a date against min/max bounds
 * Uses startOfDay to ensure consistent date-only comparison
 * @param date - Date to validate
 * @param minDate - Minimum allowed date
 * @param maxDate - Maximum allowed date
 * @returns Validation result or null if valid
 */
export const validateDateBounds = (
  date: Date | null,
  minDate?: Date,
  maxDate?: Date
) => {
  if (!date) return null;
  if (minDate && startOfDay(date) < startOfDay(minDate))
    return { code: "minDate" as const, date };
  if (maxDate && startOfDay(date) > startOfDay(maxDate))
    return { code: "maxDate" as const, date };
  return null;
};

/**
 * Validates a date range (start and end dates)
 * @param startDate - Start date of the range
 * @param endDate - End date of the range
 * @param minDate - Minimum allowed date
 * @param maxDate - Maximum allowed date
 * @returns Validation result object
 */
export const validateDateRange = (
  startDate: Date | null,
  endDate: Date | null,
  minDate?: Date,
  maxDate?: Date
) => {
  let hasError = false;
  let errorCode: DateValidationError = null;
  let invalidDate: Date | null = null;

  const startValidation = validateDateBounds(startDate, minDate, maxDate);
  const endValidation = validateDateBounds(endDate, minDate, maxDate);
  const rangeInvalid = startDate && endDate && startDate > endDate;

  if (rangeInvalid) {
    hasError = true;
    errorCode = "invalidDate";
    invalidDate = startDate;
  } else if (startValidation) {
    hasError = true;
    errorCode = startValidation.code;
    invalidDate = startValidation.date;
  } else if (endValidation) {
    hasError = true;
    errorCode = endValidation.code;
    invalidDate = endValidation.date;
  }

  return { hasError, errorCode, invalidDate };
};

/**
 * Determines the appropriate reference date for calendar display
 * @param activeField - Currently active field ('start' or 'end')
 * @param startDate - Start date value
 * @param endDate - End date value
 * @returns Reference date for calendar
 */
export const getCalendarReferenceDate = (
  activeField: "start" | "end",
  startDate: Date | null,
  endDate: Date | null
): Date => {
  return (
    (activeField === "end" ? endDate : startDate) || startDate || new Date()
  );
};

/**
 * Handles date click logic for date range selection
 * @param date - Clicked date
 * @param field - Field being updated ('start' or 'end')
 * @param currentStartDate - Current start date
 * @param currentEndDate - Current end date
 * @returns New date range and active field
 */
export const handleDateRangeClick = (
  date: Date | null,
  field: "start" | "end",
  currentStartDate: Date | null,
  currentEndDate: Date | null
) => {
  if (!date) return null;

  if (field === "start") {
    const newEndDate =
      currentEndDate && date > currentEndDate ? null : currentEndDate;
    return {
      dateRange: [date, newEndDate] as [Date | null, Date | null],
      activeField: "end" as const,
    };
  }

  if (field === "end") {
    if (!currentStartDate) return null;

    if (date < currentStartDate) {
      return {
        dateRange: [date, currentEndDate] as [Date | null, Date | null],
        activeField: "end" as const,
      };
    }
    return {
      dateRange: [currentStartDate, date] as [Date | null, Date | null],
      activeField: "end" as const,
    };
  }

  return null;
};
