import type {
  DateFieldProps,
  DatePickerToolbarProps,
  PickersActionBarProps,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { DsDatePickerProps } from "../DsDatePicker";
import { DsTextFieldProps } from "../../../Components";

export interface IDateRangePickerActionBarProps extends PickersActionBarProps {
  startDate?: Date | null;
  endDate?: Date | null;
  onClear: () => void;
}
export interface IDateRangePickerToolBarProps extends DatePickerToolbarProps {
  startDate?: Date | null;
  endDate?: Date | null;
  activeField: "start" | "end";
  onFieldChange: () => void;
}
export interface IDateRangePickerDayProps extends PickersDayProps {
  startDate: Date | null;
  endDate: Date | null;
  activeField: "start" | "end";
  onDateClick: (date: Date | null, field: "start" | "end") => void;
}

export interface IDateRangePickerHeaderProps<TDate extends Date>
  extends DatePickerToolbarProps {
  ownerState?: unknown;
  startDate: TDate | null;
  endDate: TDate | null;
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
    Pick<DsTextFieldProps, "slots" | "slotProps" | "success"> {
  setOpen?: (open: boolean) => void;
  InputProps?: DateFieldProps["InputProps"];
  ref?: DateFieldProps["ref"];
  customRef?: DateFieldProps["ref"];
  focused?: boolean;
  ownerState?: unknown;
  startDate?: Date | null;
  endDate?: Date | null;
  startDateLabel?: string;
  endDateLabel?: string;
  startDateLabelSupportText?: string;
  endDateLabelSupportText?: string;
  orientation?: IDsDateRangePickerProps["orientation"];
  onDateChange?: (newStart: Date | null, newEnd: Date | null) => void;
  onFieldClick?: (field: "start" | "end") => void;
}

export interface IDsDateRangePickerSlotProps
  extends Omit<
    NonNullable<DsDatePickerProps["slotProps"]>,
    "textField" | "actionBar" | "day" | "toolbar"
  > {
  textField?: IDateRangePickerTextFieldProps;
  actionBar?: IDateRangePickerActionBarProps;
  day?: IDateRangePickerDayProps;
  toolbar?: IDateRangePickerToolBarProps;
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
  slotProps?: IDsDateRangePickerSlotProps;
  startDateLabel?: string;
  endDateLabel?: string;
  startDateLabelSupportText?: string;
  endDateLabelSupportText?: string;
}

export const DsDateRangePickerDefaultProps: Partial<IDsDateRangePickerProps> = {
  orientation: "portrait",
  format: "dd/MM/yyyy",
  valueType: "date",
  fixedWeekNumber: 6,
  startDateLabel: "Start",
  endDateLabel: "End",
  slotProps: {
    popper: {
      sx: {
        ".MuiDayCalendar-weekContainer": {
          justifyContent: "unset",
        },
        ".MuiDayCalendar-header": {
          ".MuiDayCalendar-weekDayLabel": {
            padding: "var(--ds-spacing-glacial)",
          },
        },
      },
    },
  },
  sx: { width: "unset" },
  LocalizationProviderProps: {
    localeText: {
      datePickerToolbarTitle: "Select a date range",
    },
  },
};
