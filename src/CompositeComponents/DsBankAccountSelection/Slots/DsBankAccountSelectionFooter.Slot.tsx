import type { FC } from "react";
import { DsStack } from "../../../Components/DsStack";
import { DsButton } from "../../../Components/DsButton";
import type { DsBankAccountSelectionFooterSlotProps } from "../DsBankAccountSelection.Types";

const DsBankAccountSelectionFooter: FC<
  Partial<DsBankAccountSelectionFooterSlotProps>
> = (props) => {
  return (
    <DsStack
      direction="row"
      gap="var(--ds-spacing-frostbite)"
      {...props.FooterWrapperProps}
      sx={{
        p: "var(--ds-spacing-bitterCold)",
        width: "100%",
        boxShadow: "var(--ds-elevation-1)",
        ...props.FooterWrapperProps?.sx,
      }}
    >
      {(props.secondaryButtonText || props.secondaryButtonProps?.children) && (
        <DsButton
          color="secondary"
          size="large"
          fullWidth
          sx={{ flex: 1 }}
          {...props.secondaryButtonProps}
        >
          {props.secondaryButtonText || props.secondaryButtonProps?.children}
        </DsButton>
      )}
      {(props.primaryButtonText || props.primaryButtonProps?.children) && (
        <DsButton
          size="large"
          fullWidth
          sx={{ flex: 1 }}
          {...props.primaryButtonProps}
        >
          {props.primaryButtonText || props.primaryButtonProps?.children}
        </DsButton>
      )}
    </DsStack>
  );
};

export default DsBankAccountSelectionFooter;
