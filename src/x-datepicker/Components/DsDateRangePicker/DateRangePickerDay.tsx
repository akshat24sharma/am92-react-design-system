import { useMemo } from "react";
import { PickersDay } from "@mui/x-date-pickers";
import { isAfter, isSameDay, isWithinInterval } from "date-fns";

import type { IDateRangePickerDayProps } from "./DsDateRangePicker.Types";
import { DsBox } from "../../../Components";

export const DateRangePickerDay = ({
  day,
  startDate,
  endDate,
  onDateClick,
  activeField,
  ...other
}: IDateRangePickerDayProps) => {
  const isStart = !!startDate && isSameDay(day, startDate);
  const isEnd = !!endDate && isSameDay(day, endDate);
  const isSingleDay = isStart && isEnd;
  const isInRange =
    startDate && endDate && !isAfter(startDate, endDate)
      ? isWithinInterval(day, { start: startDate, end: endDate })
      : false;

  const background =
    (isStart || isEnd || isInRange) && !(startDate && !endDate)
      ? "var(--ds-colour-stateSelectedPrimaryHover)"
      : "none";

  const boxStyles = useMemo(
    () => ({
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      flex: 1,
      background: background,
      ...(isSingleDay && { borderRadius: "50%" }),
      ...(isStart && !isEnd && { borderRadius: "50% 0 0 50%" }),
      ...(isEnd && !isStart && { borderRadius: "0 50% 50% 0" }),
    }),
    [background, isSingleDay, isStart, isEnd]
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
};
