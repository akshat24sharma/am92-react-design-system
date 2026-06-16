import type { ComponentType } from "react";
import { DsButtonProps } from "../../Components/DsButton";
import { DsListRowProps } from "../DsListRow";
import { DsStackProps } from "../../Components/DsStack";
import { DsPopupProps } from "../../Components/DsPopup";

import DsBankAccountSelectorFooter from "./Slots/DsBankAccountSelectorFooter.Slot";
import { DsBankAccountSelectorHeader } from "./Slots/DsBankAccountSelectorHeader.Slot";

export type DsBankAccountSelectorHeaderSlotProps = {
  headerText?: string;
};

export type DsBankAccountSelectorFooterSlotProps = {
  primaryButtonText?: string;
  secondaryButtonText?: string;
  /** Primary action Button customization (ref omitted) */
  primaryButtonProps?: Omit<DsButtonProps, "ref">;
  /** Secondary action Button customization (ref omitted) */
  secondaryButtonProps?: Omit<DsButtonProps, "ref">;
  /** Action buttons container Stack customization */
  FooterWrapperProps?: DsStackProps;
};

export type DsBankAccountSelectorSlots = {
  /** Component rendered as the header above the selected account row */
  Header?: ComponentType<DsBankAccountSelectorHeaderSlotProps>;
  /** Component rendered as the proceed / CTA button */
  Footer?: ComponentType<Partial<DsBankAccountSelectorFooterSlotProps>>;
};

export type DsBankAccountSelectorSlotProps = {
  /** Props forwarded to the Header slot */
  Header?: DsBankAccountSelectorHeaderSlotProps;
  /** Props forwarded to the Footer slot */
  Footer?: Partial<DsBankAccountSelectorFooterSlotProps>;
};

export type DsBankAccountSelectorProps = {
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
  slots?: DsBankAccountSelectorSlots;
  /** Props forwarded to slot components */
  slotProps?: DsBankAccountSelectorSlotProps;
  /** Optional props to pass to the underlying DsPopup component */
  popupProps?: Omit<DsPopupProps, "open">;
};

export const DsBankAccountSelectorDefaultProps: Partial<DsBankAccountSelectorProps> =
  {
    slots: {
      Header: DsBankAccountSelectorHeader,
      Footer: DsBankAccountSelectorFooter,
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
