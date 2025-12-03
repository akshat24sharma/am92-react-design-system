import { useEffect, useState } from "react";
import { DsAddItemDefaultProps, type DsAddItemProps } from "./DsAddItem.Types";
import STATE_STYLES from "../../Theme/STATE_STYLES";
import { DsButtonBase } from "../DsButtonBase";
import { SxProps } from "@mui/system";

export const DsAddItem = (inProps: DsAddItemProps) => {
  const mergedSlots = {
    ...DsAddItemDefaultProps.slots,
    ...inProps.slots,
  };

  const mergedSlotProps = {
    ...DsAddItemDefaultProps.slotProps,
    ...inProps.slotProps,
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
    minDecrementValue,
    step,
    slots,
    slotProps,
    disabled,
    onChange,
    name,
    loading,
    ...restProps
  } = props;

  const { LeftIconButton, RightIconButton, CounterText } =
    slots ?? DsAddItemDefaultProps.slots!;

  const [countValue, setCountValue] = useState<number>(count ?? 0);

  useEffect(() => {
    if (count !== undefined) {
      setCountValue(count);
    }
  }, [count]);

  const isEmptyCount = countValue === 0;

  const isAddDisabled =
    disabled || loading || (maxValue !== undefined && countValue >= maxValue);

  const isSubtractDisabled =
    disabled ||
    loading ||
    countValue === 0 ||
    (minDecrementValue !== undefined && countValue <= minDecrementValue);

  const handleAdd = () => {
    if (!isAddDisabled) {
      // If count is 0 and we have a minValue, jump to minValue on first add
      const newValue = isEmptyCount ? minValue ?? 1 : countValue + (step ?? 1);
      if (count === undefined) {
        setCountValue(newValue);
      }
      onChange?.(name, newValue, "increment");
    }
  };

  const handleSubtract = () => {
    if (!isSubtractDisabled) {
      let newValue = countValue - (step ?? 1);

      // If new value would be less than minValue, reset to 0 (back to add state)
      if (minValue !== undefined && newValue < minValue) {
        newValue = 0;
      }

      if (count === undefined) {
        setCountValue(newValue);
      }
      onChange?.(name, newValue, "decrement");
    }
  };

  const fabSx = {
    px: "var(--ds-spacing-glacial)",
    pt: isEmptyCount ? "var(--ds-spacing-quickFreeze)" : 0,
    pb: isEmptyCount ? "var(--ds-spacing-quickFreeze)" : 0,
    minWidth: "90px",
    minHeight: "var(--ds-spacing-tepid)",
    borderRadius: "var(--ds-radius-cool)",
    boxShadow: "var(--ds-elevation-8, 0px 8px 12px rgba(0, 0, 0, 0.08))",
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
  } as SxProps;

  return (
    <DsButtonBase
      onClick={countValue === 0 ? handleAdd : undefined}
      aria-label={label}
      aria-disabled={disabled}
      color="default"
      {...restProps}
      sx={fabSx}
      disableRipple={!isEmptyCount || disabled}
    >
      {!isEmptyCount && LeftIconButton && (
        <LeftIconButton
          disabled={isSubtractDisabled}
          onClick={handleSubtract}
          aria-label="Decrease value"
          {...slotProps?.LeftIconButton}
        />
      )}

      {CounterText && (
        <CounterText
          count={countValue}
          label={label ?? ""}
          disabled={disabled ?? false}
          {...slotProps?.CounterText}
        />
      )}

      {!isEmptyCount && RightIconButton && (
        <RightIconButton
          onClick={handleAdd}
          disabled={isAddDisabled}
          aria-label="Increase value"
          {...slotProps?.RightIconButton}
        />
      )}
    </DsButtonBase>
  );
};
