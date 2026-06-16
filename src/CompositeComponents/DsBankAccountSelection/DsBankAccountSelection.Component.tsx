import { type FC, useEffect, useState } from "react";
import { DsBox } from "../../Components/DsBox";
import { DsStack } from "../../Components/DsStack";
import { DsListRow } from "../DsListRow";
import { DsPopup } from "../../Components/DsPopup";
import { DsRemixIcon } from "../../Components/DsRemixIcon";

import type { DsBankAccountSelectionProps } from "./DsBankAccountSelection.Types";
import { DsBankAccountSelectionDefaultProps } from "./DsBankAccountSelection.Types";

const DsBankAccountSelection: FC<DsBankAccountSelectionProps> = (inProps) => {
  const props = {
    ...DsBankAccountSelectionDefaultProps,
    ...inProps,
    popupProps: {
      ...DsBankAccountSelectionDefaultProps.popupProps,
      ...inProps.popupProps,
    },
    slots: {
      ...DsBankAccountSelectionDefaultProps.slots,
      ...inProps.slots,
    },
    slotProps: {
      Header: {
        ...DsBankAccountSelectionDefaultProps.slotProps?.Header,
        ...inProps.slotProps?.Header,
      },
      Footer: {
        ...DsBankAccountSelectionDefaultProps.slotProps?.Footer,
        ...inProps.slotProps?.Footer,
      },
    },
  };

  const {
    accounts,
    selectedAccount,
    selectedAccountProps,
    onAccountChange,
    onOpen,
    onClose,
    slots,
    slotProps,
    popupProps,
  } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  const HeaderSlot = slots?.Header;
  const FooterSlot = slots?.Footer;

  // Tracks in-popup selection without committing until user confirms
  const [localSelectedAccount, setLocalSelectedAccount] =
    useState<typeof selectedAccount>(selectedAccount);

  useEffect(() => {
    setLocalSelectedAccount(selectedAccount);
  }, [selectedAccount]);

  const handleOpen = () => {
    setLocalSelectedAccount(selectedAccount);
    setDialogOpen(true);
    onOpen?.();
  };

  const handleClose = () => {
    setLocalSelectedAccount(selectedAccount);
    setDialogOpen(false);
    onClose?.();
  };

  const handleConfirm = () => {
    if (localSelectedAccount) onAccountChange(localSelectedAccount);
    setDialogOpen(false);
  };

  return (
    <>
      {/* Collapsed selected account row */}
      <DsStack
        sx={{
          width: "100%",
        }}
      >
        {/* Header slot */}
        {HeaderSlot && <HeaderSlot {...slotProps?.Header} />}
        {selectedAccount && (
          <DsListRow
            interactable
            trailingIcon="ri-arrow-down-s-line"
            type="info"
            onTrailingIconClick={handleOpen}
            {...selectedAccount}
            {...selectedAccountProps}
            rowSx={[
              selectedAccount.rowSx as object,
              selectedAccountProps?.rowSx as object,
            ]}
          />
        )}
      </DsStack>

      {/* Footer slot */}
      {FooterSlot && <FooterSlot {...slotProps?.Footer} />}

      {/* Account picker popup */}
      <DsPopup
        open={dialogOpen}
        showClose
        onClose={handleClose}
        {...popupProps}
        primaryButtonProps={{
          ...popupProps?.primaryButtonProps,
          onClick: (e) => {
            handleConfirm();
            popupProps?.primaryButtonProps?.onClick?.(e); // chain consumer onClick
          },
        }}
        DsDialogProps={{
          ...popupProps?.DsDialogProps,
          sx: {
            "& .MuiListItemButton-root": {
              paddingY: "var(--ds-spacing-mild)",
            },
            ...popupProps?.DsDialogProps?.sx,
          },
        }}
        DsBottomSheetProps={{
          ...popupProps?.DsBottomSheetProps,
          sx: {
            "& .MuiListItemButton-root": {
              paddingX: 0,
            },
            ...popupProps?.DsBottomSheetProps?.sx,
          },
        }}
      >
        {accounts.map((account, index) => (
          <DsBox key={index}>
            <DsListRow
              interactable
              type="selection"
              rowSx={{ alignItems: "center", ...account.rowSx }}
              {...account}
              divider={index !== accounts.length - 1}
              radioProps={{
                checked: localSelectedAccount === account,
                label: "",
                RadioProps: {
                  checkedIcon: (
                    <DsRemixIcon
                      className="ri-checkbox-circle-fill"
                      fontSize="cool"
                    />
                  ),
                  icon: (
                    <DsRemixIcon
                      className="ri-checkbox-blank-circle-line"
                      fontSize="cool"
                    />
                  ),
                },
              }}
              onClick={() => setLocalSelectedAccount(account)}
            />
          </DsBox>
        ))}
      </DsPopup>
    </>
  );
};

export default DsBankAccountSelection;
