import { useEffect, useMemo, useState } from "react";
import {
  DsAddItemDefaultProps,
  type DsAddItemProps,
  DEFAULT_STEP_VALUE,
} from "./DsAddItem.Types";
import STATE_STYLES from "../../Theme/STATE_STYLES";
import { DsButtonBase } from "../DsButtonBase";
import { DsBox } from "../DsBox";

export const DsAddItem = (inProps: DsAddItemProps) => {
  const mergedSlots = {
    ...DsAddItemDefaultProps.slots,
    ...(inProps.slots || {}),
  };

  const mergedSlotProps = {
    ...DsAddItemDefaultProps.slotProps,
    ...(inProps.slotProps || {}),
  };

  const props = {
    ...DsAddItemDefaultProps,
    ...inProps,
    slots: mergedSlots,
    slotProps: mergedSlotProps,
  };

  const {
    value,
    label,
    maxValue,
    minValue,
    step,
    slots,
    slotProps,
    disabled,
    onChange,
    name,
    loading,
    ...restProps
  } = props;

  const isControlled = typeof value === "number";

  const { LeftIconButton, RightIconButton, CounterText } = slots;

  // Internal state for count value, initialized based on control mode
  const [countValue, setCountValue] = useState<number>(
    isControlled ? value : 0
  );

  // Component is in "empty" state when count is 0 (shows single Add button)
  const isEmptyCount = countValue === 0;

  useEffect(() => {
    if (isControlled && value !== countValue) {
      setCountValue(value);
    }
  }, [value]);

  const isAddDisabled =
    disabled || loading || (maxValue !== undefined && countValue >= maxValue);

  const isSubtractDisabled = disabled || loading;

  // Helper function to check if value is below minValue threshold
  const isBelowMinValue = (value: number): boolean => {
    return minValue !== undefined && value < minValue;
  };

  // Helper function to calculate new value based on operation
  const calculateNewValue = (operation: "add" | "subtract"): number => {
    const stepValue = step ?? DEFAULT_STEP_VALUE;
    return operation === "add"
      ? countValue + stepValue
      : countValue - stepValue;
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAddDisabled) {
      let newValue = calculateNewValue("add");

      // Jump to minValue if increment would result in a value below minimum threshold
      if (isBelowMinValue(newValue)) {
        newValue = minValue!;
      }

      if (!isControlled) {
        setCountValue(newValue);
      }

      if (typeof onChange === "function") onChange(name, newValue, "increment");
    }
  };

  const handleSubtract = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isSubtractDisabled) {
      let newValue = calculateNewValue("subtract");

      // Reset to 0 if would go negative or below minValue (back to "add" state)
      if (newValue < 0 || isBelowMinValue(newValue)) {
        newValue = 0;
      }

      if (!isControlled) {
        setCountValue(newValue);
      }
      if (typeof onChange === "function") onChange(name, newValue, "decrement");
    }
  };

  const fabSx = useMemo(
    () => ({
      px: "var(--ds-spacing-glacial)",
      pt: isEmptyCount ? "var(--ds-spacing-quickFreeze)" : 0,
      pb: isEmptyCount ? "var(--ds-spacing-quickFreeze)" : 0,
      minWidth: "90px",
      minHeight: "var(--ds-spacing-tepid)",
      borderRadius: "var(--ds-radius-cool)",
      boxShadow: "var(--ds-elevation-8)",
      background: "var(--ds-colour-surfacePrimary)",
      ...STATE_STYLES.SURFACE_PRIMARY_STATE_PRIMARY,
      pointerEvents: disabled || loading ? "none" : "auto",
      ...(disabled && {
        background: "var(--ds-colour-stateDisabledSurface)",
      }),
      ...restProps.sx,
    }),
    [isEmptyCount, disabled, restProps.sx]
  );

  const boxSx = useMemo(
    () => ({
      ...fabSx,
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",    
      "&:hover": {
        background: "var(--ds-colour-surfacePrimary) !important",
      },
      ...restProps.sx,
    }),
    [fabSx, restProps.sx]
  );

  const counterTextElement = CounterText && (
    <CounterText
      value={countValue}
      label={label ?? ""}
      disabled={disabled ?? false}
      {...slotProps?.CounterText}
    />
  );

  return isEmptyCount ? (
    <DsButtonBase
      aria-label={label}
      aria-disabled={disabled}
      color="default"
      {...restProps}
      onClick={isEmptyCount ? handleAdd : undefined}
      sx={{
        ...fabSx,
        display: "inline-flex",
        verticalAlign: "top",
      }}
      disableRipple={!isEmptyCount || disabled}
    >
      {counterTextElement}
    </DsButtonBase>
  ) : (
    <DsBox
      component={"div"}
      aria-label={label}
      aria-disabled={disabled}
      color="default"
      {...restProps}
      onClick={isEmptyCount ? handleAdd : undefined}
      sx={boxSx}
    >
      {!isEmptyCount && LeftIconButton && (
        <LeftIconButton
          disabled={isSubtractDisabled}
          onClick={handleSubtract}
          aria-label="Decrease value"
          {...slotProps?.LeftIconButton}
        />
      )}

      {counterTextElement}

      {!isEmptyCount && RightIconButton && (
        <RightIconButton
          onClick={handleAdd}
          disabled={isAddDisabled}
          aria-label="Increase value"
          {...slotProps?.RightIconButton}
        />
      )}
    </DsBox>
  );
};
