import type { FC } from "react";
import { DsStack } from "../../../Components/DsStack";
import { DsTypography } from "../../../Components/DsTypography";
import type { DsBankAccountSelectorHeaderSlotProps } from "../DsBankAccountSelector.Types";

export const DsBankAccountSelectorHeader: FC<
  DsBankAccountSelectorHeaderSlotProps
> = ({ headerText }) => {
  return (
    <DsStack
      sx={{
        width: "100%",
        padding: "var(--ds-spacing-glacial) var(--ds-spacing-bitterCold)",
      }}
    >
      <DsTypography
        variant="supportRegularMetadata"
        sx={{
          flex: "1 0 0",
          color: "var(--ds-colour-typoPrimary)",
          textTransform: "uppercase",
        }}
      >
        {headerText}
      </DsTypography>
    </DsStack>
  );
};
