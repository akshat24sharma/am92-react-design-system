import React from "react";

import type { DsAddItemCounterTextProps } from "../DsAddItem.Types";
import { DsTypography } from "../../DsTypography";

export const DsAddItemCounterText: React.FC<DsAddItemCounterTextProps> = ({
  label,
  value,
  disabled,
  color,
  ...textProps
}) => {
  const isEmptyCount = value === 0;

  return (
    <DsTypography
      variant={isEmptyCount ? "supportBoldTextButton" : "bodyBoldMedium"}
      color={
        disabled
          ? "var(--ds-colour-typoDisabled)"
          : isEmptyCount
            ? color
            : "var(--ds-colour-typoPrimary)"
      }
      sx={{
        mx: isEmptyCount
          ? "var(--ds-spacing-cool)"
          : "var(--ds-spacing-glacial)",
        ...textProps.sx,
      }}
      {...textProps}
    >
      {isEmptyCount ? label : value}
    </DsTypography>
  );
};
