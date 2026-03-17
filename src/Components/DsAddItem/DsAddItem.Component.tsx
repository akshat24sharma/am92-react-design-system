import React, { useEffect, useMemo, useState } from "react";

import { DsAddItemDefaultProps, type DsAddItemProps } from "./DsAddItem.Types";
import { calculateNewValue, isBelowMinValue } from "./DsAddItem.helpers";
import STATE_STYLES from "../../Theme/STATE_STYLES";
import { DsStack } from "../DsStack";
import { DsFab } from "../DsFab";
import { CSSObject } from "@mui/system";

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

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAddDisabled) {
      let newValue = calculateNewValue(countValue, step, "add");

      // Jump to minValue if increment would result in a value below minimum threshold
      if (isBelowMinValue(newValue, minValue)) {
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
      let newValue = calculateNewValue(countValue, step, "subtract");

      // Reset to 0 if would go negative or below minValue (back to "add" state)
      if (newValue < 0 || isBelowMinValue(newValue, minValue)) {
        newValue = 0;
      }

      if (!isControlled) {
        setCountValue(newValue);
      }
      if (typeof onChange === "function") onChange(name, newValue, "decrement");
    }
  };

  const stackSx = useMemo(
    () => ({
      minWidth: "90px",
      minHeight: "36px",
      padding: "var(--ds-spacing-glacial)",
      borderRadius: "var(--ds-radius-cool)",
      boxShadow: "var(--ds-elevation-8)",
      background: "var(--ds-colour-surfacePrimary)",
      pointerEvents: disabled || loading ? "none" : "auto",
      ...((disabled || loading) && {
        background: "var(--ds-colour-stateDisabledSurface)",
      }),
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      verticalAlign: "middle",
    }),
    [disabled, loading],
  );

  const counterTextElement = CounterText && (
    <CounterText
      value={countValue}
      label={label ?? ""}
      disabled={(disabled || loading) ?? false}
      {...slotProps?.CounterText}
    />
  );

  return isEmptyCount ? (
    <DsFab
      disabled={disabled || loading}
      color="default"
      size="small"
      onClick={isEmptyCount ? handleAdd : undefined}
      disableRipple={!isEmptyCount || disabled}
      {...restProps}
      sx={{
        ...STATE_STYLES.SURFACE_PRIMARY_STATE_PRIMARY,
        border: "none",
        padding: "var(--ds-spacing-frostbite) var(--ds-spacing-glacial)",
        minWidth: "90px",
        minHeight: "36px",
        "&.Mui-disabled": {
          background: "var(--ds-colour-stateDisabledSurface)",
          boxShadow: "var(--ds-elevation-8)",
        },
        "& .MuiTypography-root": {
          fontSize: "var(--ds-typo-supportBoldTextButton-fontSize)",
          lineHeight: "var(--ds-typo-supportBoldTextButton-lineHeight)",
        },
        ...restProps.sx,
      }}
    >
      {counterTextElement}
    </DsFab>
  ) : (
    <DsStack
      direction="row"
      onClick={isEmptyCount ? handleAdd : undefined}
      sx={{ ...stackSx, ...restProps.sx } as CSSObject}
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
    </DsStack>
  );
};
