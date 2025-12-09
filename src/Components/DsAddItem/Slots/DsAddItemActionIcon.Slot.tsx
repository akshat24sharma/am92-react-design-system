import React from "react";

import type { DsAddItemActionButtonProps } from "../DsAddItem.Types";
import { DsIconButton } from "../../DsIconButton";
import { DsRemixIcon } from "../../DsRemixIcon";

export const DsAddItemIconButton: React.FC<DsAddItemActionButtonProps> = ({
  onClick,
  disabled,
  IconProps,
  ...iconButtonProps
}) => {
  return (
    <DsIconButton disabled={disabled} onClick={onClick} {...iconButtonProps}>
      <DsRemixIcon
        sx={{
          fontSize: "20px",
          ...IconProps?.sx,
        }}
        {...IconProps}
      />
    </DsIconButton>
  );
};
