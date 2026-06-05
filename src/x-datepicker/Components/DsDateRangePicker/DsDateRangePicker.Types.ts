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

/**
 * Base interface defining the core date range properties
 * Used as a foundation for other interfaces to ensure consistency
 */
export interface IDateRangeBaseProps {
  startDate: Date | null;
  endDate: Date | null;
}

export interface IDateRangeActiveFieldProps extends IDateRangeBaseProps {
  activeField: "start" | "end";
}

/**
 * Props interface for the DateRangePickerActionBar component
 * Extends MUI's PickersActionBarProps with date range specific functionality
 */
export interface IDateRangePickerActionBarProps
  extends PickersActionBarProps, Partial<IDateRangeBaseProps> {
  onClear?: () => void;
}

/**
 * Props interface for the DateRangePickerHeader/Toolbar component
 * Extends MUI's DatePickerToolbarProps with field switching capability
 */
export interface IDateRangePickerToolBarProps
  extends DatePickerToolbarProps, IDateRangeActiveFieldProps {
  /** Callback to change the active field (start/end) */
  onFieldChange: (field: "start" | "end") => void;
}
/**
 * Props interface for the DateRangePickerDay component
 * Handles individual calendar day rendering with range selection logic
 */
export interface IDateRangePickerDayProps
  extends PropsFromSlot<DateCalendarSlots["day"]>, IDateRangeActiveFieldProps {
  onDateClick: (date: Date | null, field: "start" | "end") => void;
}

/**
 * Props interface for the DateRangePickerHeader component
 * Manages the header UI with field switching and close functionality
 */
export interface IDateRangePickerHeaderProps
  extends PropsFromSlot<BaseDatePickerSlots["toolbar"]>, IDateRangeBaseProps {
  /** Currently active field for UI highlighting */
  activeField: "start" | "end";
  /** Callback to switch between start and end fields */
  onFieldChange: (field: "start" | "end") => void;
  /** Optional callback to cancel/close the picker */
  onCancel?: () => void;
}

export interface IDateRangePickerTextFieldProps
  extends
    Omit<
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

export interface IDsDateRangePickerSlotProps extends Omit<
  NonNullable<DsDatePickerProps["slotProps"]>,
  "textField" | "actionBar" | "day" | "toolbar"
> {
  /**
   * Props for the text field component (excludes internally managed props)
   * Consumers can customize styling and labels, but not core functionality
   */
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
  /**
   * Props for the action bar component (excludes clear handler)
   * Clear functionality is managed internally for proper state updates
   */
  actionBar?: Omit<IDateRangePickerActionBarProps, "onClear">;
  /**
   * Props for individual calendar day components (excludes core functionality)
   * Date selection and range logic are managed internally
   */
  day?: Omit<
    IDateRangePickerDayProps,
    "onDateClick" | "startDate" | "endDate" | "activeField"
  >;
  toolbar?: Omit<
    IDateRangePickerToolBarProps,
    "onFieldChange" | "activeField" | "startDate" | "endDate"
  >;
}

/**
 * Props interface for the DateFieldButton component
 * Used in the header for switching between start and end date fields
 */
export interface IDateFieldButtonProps {
  label: string;
  date: Date | null;
  isActive: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

export interface IDsDateRangePickerProps extends Omit<
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
  /** Date range value as [startDate, endDate] */
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
