import React from "react";

import type { DsAddItemCounterTextProps } from "../DsAddItem.Types";
import { DsTypography } from "../../DsTypography";

export const DsAddItemCounterText: React.FC<DsAddItemCounterTextProps> = ({
  label,
  count,
  disabled,
  ...textProps
}) => {
  const isEmptyCount = count === 0;

  return (
    <DsTypography
      variant={isEmptyCount ? "supportBoldTextButton" : "bodyBoldMedium"}
      color={
        disabled
          ? "var(--ds-colour-typoDisabled)"
          : isEmptyCount
          ? "var(--ds-colour-typoActionSecondary)"
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
      {isEmptyCount ? label : count}
    </DsTypography>
  );
};
