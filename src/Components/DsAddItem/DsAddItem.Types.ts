import type { ComponentType } from "react";

import { DsAddItemIconButton } from "./Slots/DsAddItemActionIcon.Slot";
import { DsAddItemCounterText } from "./Slots/DsAddItemCounterText.Slot";
import { DsFabProps } from "../DsFab";
import { DsTypographyProps } from "../DsTypography";
import { DsIconButtonProps } from "../DsIconButton";
import { DsRemixIconProps } from "../DsRemixIcon";

/**
 * Default step value for increment/decrement operations
 */
export const DEFAULT_STEP_VALUE = 1;

/**
 * Props for action buttons (left/right) within the add item component
 * Extends DsIconButtonProps with optional icon configuration
 */
export interface DsAddItemActionButtonProps extends DsIconButtonProps {
  /** Props for the icon within the action button */
  IconProps?: Omit<DsRemixIconProps, "ref">;
}

/**
 * Props for the counter text display showing current count
 */
export interface DsAddItemCounterTextProps extends DsTypographyProps {
  label: string;
  value: number;
  disabled: boolean;
}

/**
 * Slots configuration for customizing components
 */
export interface DsAddItemSlots {
  /** Component for the left (subtract) icon button */
  LeftIconButton?: ComponentType<DsAddItemActionButtonProps>;
  /** Component for the right (add) icon button */
  RightIconButton?: ComponentType<DsAddItemActionButtonProps>;
  /** Component for the counter text display */
  CounterText?: ComponentType<DsAddItemCounterTextProps>;
}

/**
 * Slot props configuration for customizing different parts of the add item component
 */
export interface DsAddItemSlotProps {
  /** Props for the left (subtract) icon button */
  LeftIconButton?: DsAddItemActionButtonProps;
  /** Props for the right (add) icon button */
  RightIconButton?: DsAddItemActionButtonProps;
  /** Props for the counter text display */
  CounterText?: DsAddItemCounterTextProps;
}

/**
 * Main props interface for the DsAddItem component
 * Extends DsFabProps while omitting the onChange prop to define custom signature
 */
// export interface DsAddItemProps extends Omit<DsFabProps, 'onChange'> {
export interface DsAddItemProps
  extends Omit<DsFabProps, "onChange" | "value"> {
  /** The current count value */
  value?: number;
  /** The maximum allowed value */
  maxValue?: number;
  /** The minimum allowed value */
  minValue?: number;
  /** The step size for increment/decrement */
  step?: number;
  /** The label to show when count is 0 */
  label?: string;
  /** Handler called when count changes */
  onChange: (
    name: string,
    value: number,
    reason: "increment" | "decrement"
  ) => void;
  /** Custom components to use for slots */
  slots?: DsAddItemSlots;
  /** Props to pass to slot components */
  slotProps?: DsAddItemSlotProps;
  /** Name of the counter field */
  name: string;
  /** Whether the counter is in loading state */
  loading?: boolean;
}

/**
 * Default props configuration for DsAddItem component
 * Provides sensible defaults for count, label, and slot styling
 */
export const DsAddItemDefaultProps: Partial<DsAddItemProps> = {
  label: "Add",
  step: DEFAULT_STEP_VALUE,
  minValue: 0,
  onChange: () => {},
  slots: {
    LeftIconButton: DsAddItemIconButton,
    RightIconButton: DsAddItemIconButton,
    CounterText: DsAddItemCounterText,
  },
  slotProps: {
    LeftIconButton: {
      color: "secondary",
      IconProps: {
        className: "ri-subtract-line",
      },
    },
    RightIconButton: {
      color: "secondary",
      IconProps: {
        className: "ri-add-line",
      },
    },
  },
};
