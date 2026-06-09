import React, { useMemo } from "react";
import { PickersDay } from "@mui/x-date-pickers";
import { isSameDay, isWithinInterval } from "date-fns";

import type { IDateRangePickerDayProps } from "./DsDateRangePicker.Types";
import { DsBox } from "../../../Components";

/**
 * Custom day component for date range picker calendar
 * Handles visual styling for start/end dates, range selection, and date validation
 * Wraps MUI's PickersDay with custom range styling and disabled state logic
 */
 const DateRangePickerDayComponent = (
  ({
    day,
    startDate,
    endDate,
    onDateClick,
    activeField,
    ...other
  }: IDateRangePickerDayProps) => {
    // Check if this day is the selected start date
    const isStart = !!startDate && isSameDay(day, startDate);
    // Check if this day is the selected end date
    const isEnd = !!endDate && isSameDay(day, endDate);

    // Check if this day falls within the selected date range
    const isInRange =
      startDate &&
      endDate &&
      isWithinInterval(day, { start: startDate, end: endDate });

    /**
     * Dynamic styling for the date range visual indicators
     * Applies background color for range and rounded borders for start/end dates
     */
    const boxStyles = useMemo(
      () => ({
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        background: isInRange
          ? "var(--ds-colour-stateSelectedPrimaryHover)"
          : "none",
        ...(isStart && {
          borderTopLeftRadius: "50%",
          borderBottomLeftRadius: "50%",
        }),
        ...(isEnd && {
          borderTopRightRadius: "50%",
          borderBottomRightRadius: "50%",
        }),
      }),
      [isInRange, isStart, isEnd],
    );

    return (
      <DsBox sx={boxStyles}>
        <PickersDay
          {...other}
          day={day}
          onClick={() => onDateClick(day, activeField)}
          selected={isStart || isEnd}
        />
      </DsBox>
    );
  }
);
export const DateRangePickerDay = React.memo(DateRangePickerDayComponent) as typeof DateRangePickerDayComponent;