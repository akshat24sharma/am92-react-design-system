import { useEffect, useMemo, useState } from "react";
import { DsAddItemDefaultProps, type DsAddItemProps } from "./DsAddItem.Types";
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
    count,
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

  const isControlled = typeof count === "number";

  const { LeftIconButton, RightIconButton, CounterText } = slots;

  // Internal state for count value, initialized based on control mode
  const [countValue, setCountValue] = useState<number>(
    isControlled ? count : 0
  );

  // Component is in "empty" state when count is 0 (shows single Add button)
  const isEmptyCount = countValue === 0;

  useEffect(() => {
    if (isControlled && count !== countValue) {
      setCountValue(count);
    }
  }, [count]);

  const isAddDisabled =
    disabled || loading || (maxValue !== undefined && countValue >= maxValue);

  const isSubtractDisabled = disabled || loading;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAddDisabled) {
      let newValue = countValue + (step ?? 1);

      // Jump to minValue if increment would result in a value below minimum threshold
      if (minValue !== undefined && newValue < minValue) {
        newValue = minValue;
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
      let newValue = countValue - (step ?? 1);

      // Reset to 0 if would go negative or below minValue (back to "add" state)
      if (newValue < 0 || (minValue !== undefined && newValue < minValue)) {
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
      "&:hover": {
        background: "var(--ds-colour-surfacePrimary) !important",
      },
      ...STATE_STYLES.SURFACE_SECONDARY_STATE_PRIMARY,
      pointerEvents: !isEmptyCount && disabled ? "none" : "auto",
      "&.Mui-disabled": {
        background: "var(--ds-colour-stateDisabledSurface) !important",
      },
      ...restProps.sx,
    }),
    [isEmptyCount, disabled, restProps.sx]
  );

  const boxSx = useMemo(
    () => ({
      ...fabSx,
      display: "flex",
      px: "var(--ds-spacing-glacial)",
      justifyContent: "center",
      alignItems: "center",
      ...restProps.sx,
    }),
    [isEmptyCount, disabled, restProps.sx]
  );

  const counterTextElement = CounterText && (
    <CounterText
      count={countValue}
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
      sx={fabSx}
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
