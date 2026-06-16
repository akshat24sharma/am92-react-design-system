import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import { DsBox } from "../../Components/DsBox";
import { DsStack } from "../../Components/DsStack";
import { DsListRow } from "../DsListRow";
import { DsPopup } from "../../Components/DsPopup";
import { DsRemixIcon } from "../../Components/DsRemixIcon";

import type { DsBankAccountSelectionProps } from "./DsBankAccountSelection.Types";
import { DsBankAccountSelectionDefaultProps } from "./DsBankAccountSelection.Types";
import { CSSObject } from "@mui/system";

const checkedIcon = (
  <DsRemixIcon className="ri-checkbox-circle-fill" fontSize="cool" />
);

const uncheckedIcon = (
  <DsRemixIcon className="ri-checkbox-blank-circle-line" fontSize="cool" />
);
const DsBankAccountSelection: FC<DsBankAccountSelectionProps> = (inProps) => {
  const props = useMemo(
    () => ({
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
    }),
    [inProps],
  );

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

  // Reset popup state to the currently selected account whenever the popup is opened
  const handleOpen = useCallback(() => {
    setLocalSelectedAccount(selectedAccount);
    setDialogOpen(true);
    onOpen?.();
  }, [selectedAccount, onOpen]);

  // Discard unconfirmed changes and restore the last committed selection.
  const handleClose = useCallback(() => {
    setLocalSelectedAccount(selectedAccount);
    setDialogOpen(false);
    onClose?.();
  }, [selectedAccount, onClose]);

  // Commit the temporary selection and close the popup.
  const handleConfirm = useCallback(() => {
    if (localSelectedAccount) {
      onAccountChange(localSelectedAccount);
    }
    setDialogOpen(false);
  }, [localSelectedAccount, onAccountChange]);

  const handlePrimaryClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      handleConfirm();
      // chain consumer onClick
      popupProps?.primaryButtonProps?.onClick?.(e);
    },
    [handleConfirm, popupProps?.primaryButtonProps],
  );

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
            //customize the rendered row without modifying the account object
            {...selectedAccountProps}
            rowSx={[
              selectedAccount.rowSx as CSSObject,
              selectedAccountProps?.rowSx as CSSObject,
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
          onClick: handlePrimaryClick,
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
                  checkedIcon: checkedIcon,
                  icon: uncheckedIcon,
                },
              }}
              onClick={() => {
                // Avoid unnecessary state updates when the row is already selected.
                if (localSelectedAccount !== account) {
                  setLocalSelectedAccount(account);
                }
              }}
            />
          </DsBox>
        ))}
      </DsPopup>
    </>
  );
};

export default DsBankAccountSelection;
