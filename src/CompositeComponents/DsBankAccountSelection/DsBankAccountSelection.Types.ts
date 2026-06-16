import type { ComponentType } from "react";
import { DsButtonProps } from "../../Components/DsButton";
import { DsListRowProps } from "../DsListRow";
import { DsStackProps } from "../../Components/DsStack";
import { DsPopupProps } from "../../Components/DsPopup";

import DsBankAccountSelectionFooter from "./Slots/DsBankAccountSelectionFooter.Slot";
import  DsBankAccountSelectionHeader  from "./Slots/DsBankAccountSelectionHeader.Slot";

export type DsBankAccountSelectionHeaderSlotProps = {
  headerText?: string;
};

export type DsBankAccountSelectionFooterSlotProps = {
  primaryButtonText?: string;
  secondaryButtonText?: string;
  /** Primary action Button customization (ref omitted) */
  primaryButtonProps?: Omit<DsButtonProps, "ref">;
  /** Secondary action Button customization (ref omitted) */
  secondaryButtonProps?: Omit<DsButtonProps, "ref">;
  /** Action buttons container Stack customization */
  FooterWrapperProps?: DsStackProps;
};

export type DsBankAccountSelectionSlots = {
  /** Component rendered as the header above the selected account row */
  Header?: ComponentType<DsBankAccountSelectionHeaderSlotProps>;
  /** Component rendered as the proceed / CTA button */
  Footer?: ComponentType<Partial<DsBankAccountSelectionFooterSlotProps>>;
};

export type DsBankAccountSelectionSlotProps = {
  /** Props forwarded to the Header slot */
  Header?: DsBankAccountSelectionHeaderSlotProps;
  /** Props forwarded to the Footer slot */
  Footer?: Partial<DsBankAccountSelectionFooterSlotProps>;
};

export type DsBankAccountSelectionProps = {
  /** Array of bank accounts to display */
  accounts: DsListRowProps[];
  /** The currently selected bank account */
  selectedAccount?: DsListRowProps;
  /**
   * DsListRowProps overrides applied only to the collapsed selected row.
   * Useful when selectedAccount drives both the collapsed row AND the popup list
   * and you need different appearance for just the collapsed view
   * (e.g. hide badge on collapsed row but keep it visible in the popup list).
   */
  selectedAccountProps?: Partial<DsListRowProps>;
  /** Callback fired when user confirms account change */
  onAccountChange: (account: DsListRowProps) => void;
  /** Callback fired when the account picker dialog opens */
  onOpen?: () => void;
  /** Callback fired when the account picker dialog closes without confirming */
  onClose?: () => void;
  /** Slot component overrides */
  slots?: DsBankAccountSelectionSlots;
  /** Props forwarded to slot components */
  slotProps?: DsBankAccountSelectionSlotProps;
  /** Optional props to pass to the underlying DsPopup component */
  popupProps?: Omit<DsPopupProps, "open">;
};

export const DsBankAccountSelectionDefaultProps: Partial<DsBankAccountSelectionProps> =
  {
    slots: {
      Header: DsBankAccountSelectionHeader,
      Footer: DsBankAccountSelectionFooter,
    },
    slotProps: {
      Header: {
        headerText: "PAY USING",
      },
      Footer: {
        primaryButtonText: "Proceed",
      },
    },
    popupProps: {
      title: "Change Bank Account",
      primaryButtonText: "Proceed",
    },
  };
