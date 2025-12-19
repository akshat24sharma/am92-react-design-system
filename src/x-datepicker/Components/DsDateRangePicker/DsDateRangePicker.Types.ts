import type {
  DateCalendarSlots,
  DateFieldProps,
  DatePickerToolbarProps,
  PickersActionBarProps,
  PropsFromSlot,
} from "@mui/x-date-pickers";
import { DsDatePickerProps } from "../DsDatePicker";
import { DsTextFieldProps } from "../../../Components";
import { BaseDatePickerSlots } from "@mui/x-date-pickers/DatePicker/shared";

// Common base interfaces for shared properties
export interface IDateRangeBaseProps {
  startDate: Date | null;
  endDate: Date | null;
}

export interface IDateRangeActiveFieldProps extends IDateRangeBaseProps {
  activeField: "start" | "end";
}

export interface IDateRangePickerActionBarProps
  extends PickersActionBarProps,
    Partial<IDateRangeBaseProps> {
  onClear?: () => void;
}

export interface IDateRangePickerToolBarProps
  extends DatePickerToolbarProps,
    IDateRangeActiveFieldProps {
  onFieldChange: () => void;
}
export interface IDateRangePickerDayProps
  extends PropsFromSlot<DateCalendarSlots["day"]>,
    IDateRangeActiveFieldProps {
  onDateClick: (date: Date | null, field: "start" | "end") => void;
}

export interface IDateRangePickerHeaderProps
  extends PropsFromSlot<BaseDatePickerSlots["toolbar"]>,
    IDateRangeBaseProps {
  activeField: "start" | "end";
  onFieldChange: (field: "start" | "end") => void;
  onCancel?: () => void;
}

export interface IDateRangePickerTextFieldProps
  extends Omit<
      DateFieldProps,
      | "margin"
      | "onInvalid"
      | "onKeyDown"
      | "onBlur"
      | "onKeyUp"
      | "ref"
      | "value"
      | "onChange"
      | "variant"
      | "defaultValue"
      | "onError"
      | "onFocus"
      | "slotProps"
      | "slots"
    >,
    Pick<DsTextFieldProps, "slots" | "slotProps" | "success">,
    Partial<IDateRangeBaseProps> {
  InputProps?: DateFieldProps["InputProps"];
  ref: DateFieldProps["ref"];
  customRef: DateFieldProps["ref"];
  focused: boolean;
  startDateLabel?: string;
  endDateLabel?: string;
  startDateLabelSupportText?: string;
  endDateLabelSupportText?: string;
  onDateChange: (newStart: Date | null, newEnd: Date | null) => void;
  onFieldClick: (field: "start" | "end") => void;
}

export interface IDsDateRangePickerSlotProps
  extends Omit<
    NonNullable<DsDatePickerProps["slotProps"]>,
    "textField" | "actionBar" | "day" | "toolbar"
  > {
  textField?: Omit<
    IDateRangePickerTextFieldProps,
    | "onDateChange"
    | "onFieldClick"
    | "customRef"
    | "ref"
    | "focused"
    | "startDate"
    | "endDate"
  >;
  actionBar?: Omit<IDateRangePickerActionBarProps, "onClear">;
  day?: Omit<IDateRangePickerDayProps, "onDateClick" | "startDate" | "endDate">;
  toolbar?: Omit<
    IDateRangePickerToolBarProps,
    "onFieldChange" | "activeField" | "startDate" | "endDate"
  >;
}

export interface IDsDateRangePickerProps
  extends Omit<
    DsDatePickerProps,
    | "onChange"
    | "value"
    | "defaultValue"
    | "slotProps"
    | "label"
    | "labelSupportText"
    | "open"
    | "onOpen"
    | "onClose"
    | "yearsPerRow"
    | "monthsPerRow"
    | "views"
    | "view"
    | "closeOnSelect"
  > {
  value: [Date | null, Date | null];
  onChange: (name: string, value: [Date | null, Date | null]) => void;
  slotProps?: Partial<IDsDateRangePickerSlotProps>;
  startDateLabel?: string;
  endDateLabel?: string;
  startDateLabelSupportText?: string;
  endDateLabelSupportText?: string;
}

export const DsDateRangePickerDefaultProps: Partial<IDsDateRangePickerProps> = {
  /**
   * Note: Component overrides are restricted to maintain design consistency.
   * Only label-related props in textFields can be customized by consumers.
   * All other slot overrides are handled internally to ensure proper functionality.
   */
  format: "dd/MM/yyyy",
  valueType: "date",
  fixedWeekNumber: 6,
  startDateLabel: "Start",
  endDateLabel: "End",
  LocalizationProviderProps: {
    localeText: {
      datePickerToolbarTitle: "Select a date range",
    },
  },
};
