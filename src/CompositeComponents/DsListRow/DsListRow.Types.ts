import type React from "react";
import {
  DsButtonProps,
  DsChipProps,
  DsIconButtonProps,
  DsImageProps,
  DsListItemButtonProps,
  DsListItemProps,
  DsRadioProps,
  DsRemixIconProps,
} from "../../Components";
import { SxProps } from "@mui/system";

export type DsListRowType = "default" | "selection" | "info";

export type DsListRowLeadingVariant = "image" | "date" | "icon";

export interface DsListRowProps extends Omit<DsListItemProps, "onClick"> {
  /** Row type controls trailing section behavior. */
  type?: DsListRowType;

  /** Main label shown on top. */
  primaryText: React.ReactNode;

  /** Optional sub text. */
  secondaryText?: React.ReactNode;

  /** Optional tertiary line (for date/time metadata). */
  tertiaryText?: React.ReactNode;

  /** Optional image source for the leading visual. */
  leadingImageSrc?: DsImageProps["srcSet"];

  /** Leading visual variant. */
  leadingVariant?: DsListRowLeadingVariant;

  /** Additional props for leading image component. */
  leadingImageProps?: DsImageProps;

  /** Day value for date leading variant. */
  leadingDateDay?: React.ReactNode;

  /** Month value for date leading variant. */
  leadingDateMonth?: React.ReactNode;

  /** Icon class (without ri- prefix) for icon leading variant. */
  leadingIcon?: string;

  /** Additional props for icon leading variant. */
  leadingIconProps?: DsRemixIconProps;

  /** Controls leading visual visibility. */
  showLeading?: boolean;

  /** Optional chip content. */
  chipLabel?: React.ReactNode;

  /** Additional props for chip component. */
  chipProps?: DsChipProps;

  /** Controls right chevron visibility. */
  showChevron?: boolean;

  /** Optional tertiary leading icon class (without ri- prefix). */
  tertiaryIcon?: string;

  /** Selection value passed to the internal radio for RadioGroup usage. */
  value?: string;

  /** Info row trailing icon class (without ri- prefix). */
  trailingIcon?: string;

  /** Click handler for info row trailing icon. */
  onTrailingIconClick?: DsIconButtonProps["onClick"];

  /** Additional props for info row trailing icon. */
  trailingIconProps?: DsRemixIconProps;

  /** Additional props for info row trailing icon button wrapper. */
  trailingIconButtonProps?: DsIconButtonProps;

  /** Fully custom node for trailing section (takes precedence over icon). */
  trailingNode?: React.ReactNode;

  /** Optional CTA label */
  ctaLabel?: React.ReactNode;

  /** Optional CTA click handler */
  onCtaClick?: DsButtonProps["onClick"];

  /** Additional props for CTA button. */
  ctaButtonProps?: DsButtonProps;

  /** Additional props for selection radio. */
  radioProps?: DsRadioProps;

  /** Row click handler. If passed, row becomes interactive. */
  onClick?: DsListItemButtonProps["onClick"];

  /** Controls interactive wrapper behavior (DsListItemButton vs DsBox). */
  interactable?: boolean;

  /** sx override for the grid container (controls layout, padding, gaps). */
  rowSx?: SxProps;
}

export const DsListRowDefaultProps: Partial<DsListRowProps> = {
  type: "default",
  leadingVariant: "image",
  showLeading: true,
  tertiaryIcon: undefined,
  alignItems: "flex-start",
};
