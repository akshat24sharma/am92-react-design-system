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
    LeftIconButton: {
      ...DsAddItemDefaultProps.slotProps?.LeftIconButton,
      ...inProps.slotProps?.LeftIconButton,
      IconProps: {
        ...DsAddItemDefaultProps.slotProps?.LeftIconButton?.IconProps,
        ...inProps.slotProps?.LeftIconButton?.IconProps,
      },
    },
    RightIconButton: {
      ...DsAddItemDefaultProps.slotProps?.RightIconButton,
      ...inProps.slotProps?.RightIconButton,
      IconProps: {
        ...DsAddItemDefaultProps.slotProps?.RightIconButton?.IconProps,
        ...inProps.slotProps?.RightIconButton?.IconProps,
      },
    },
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
    color,
    wrapperProps,
    ...restProps
  } = props;

  const isControlled = typeof value === "number";

  const { LeftIconButton, RightIconButton, CounterText } = slots;

  // Internal state for count value, initialized based on control mode
  const [countValue, setCountValue] = useState<number>(
    isControlled ? value : 0,
  );

  // Component is in "empty" state when count is 0 (shows single Add button)
  const isEmptyCount = countValue === 0;

  useEffect(() => {
    if (isControlled && value !== countValue) {
      setCountValue(value);
    }
  }, [value]);

  const isAddDisabled =
    disabled || (maxValue !== undefined && countValue >= maxValue);

  const isSubtractDisabled = disabled;

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
      pointerEvents: disabled ? "none" : "auto",
      ...(disabled && {
        background: "var(--ds-colour-stateDisabledSurface)",
      }),
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      verticalAlign: "middle",
    }),
    [disabled],
  );

  const counterTextElement = CounterText && (
    <CounterText
      value={countValue}
      label={label ?? ""}
      disabled={disabled ?? false}
      color={color}
      {...slotProps?.CounterText}
    />
  );

  return (
    <DsStack
      {...wrapperProps}
      sx={{ display: "inline-flex", verticalAlign: "middle", ...wrapperProps?.sx } as CSSObject}
    >
      {isEmptyCount ? (
        <DsFab
          disabled={disabled}
          color="default"
          size="small"
          onClick={handleAdd}
          disableRipple={disabled}
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
          sx={{ ...stackSx, ...restProps.sx } as CSSObject}
        >
          {LeftIconButton && (
            <LeftIconButton
              disabled={isSubtractDisabled}
              onClick={handleSubtract}
              aria-label="Decrease value"
              color={color}
              {...slotProps?.LeftIconButton}
            />
          )}

          {counterTextElement}

          {RightIconButton && (
            <RightIconButton
              onClick={handleAdd}
              disabled={isAddDisabled}
              aria-label="Increase value"
              color={color}
              {...slotProps?.RightIconButton}
            />
          )}
        </DsStack>
      )}
    </DsStack>
  );
};
