import { DsBox, DsListItem, DsListItemButton } from "../../Components";
import { DsListRowCtaSection } from "./Components/DsListRow.CtaSection";
import { DsListRowLeadingSection } from "./Components/DsListRow.LeadingSection";
import { DsListRowTextSection } from "./Components/DsListRow.TextSection";
import { DsListRowTrailingSection } from "./Components/DsListRow.TrailingSection";

import {
  getDsListRowFlags,
  mergeDsListRowProps,
  stopPropagationAndCall,
} from "./DsListRow.helpers";
import type { DsListRowProps } from "./DsListRow.Types";

export const DsListRow = (InProps: DsListRowProps) => {
  const {
    type,
    primaryText,
    secondaryText,
    tertiaryText,
    leadingImageSrc,
    leadingVariant,
    leadingImageProps,
    leadingDateDay,
    leadingDateMonth,
    leadingIcon,
    leadingIconProps,
    showLeading,
    chipLabel,
    chipProps,
    showChevron,
    divider,
    tertiaryIcon,
    value,
    trailingIcon,
    onTrailingIconClick,
    trailingIconProps,
    trailingIconButtonProps,
    trailingNode,
    interactable,
    ctaLabel,
    ctaButtonProps,
    radioProps,
    alignItems,
    rowSx,
    onClick,
    onCtaClick,
    sx,
    disablePadding: _disablePadding,
    ...restProps
  } = mergeDsListRowProps(InProps);

  const { isSelectionType, isInfoType, resolvedShowChevron, isInteractable } =
    getDsListRowFlags({ type, showChevron, interactable });

  const handleCtaClick: NonNullable<DsListRowProps["onCtaClick"]> = (event) => {
    stopPropagationAndCall(event, onCtaClick);
  };

  const handleTrailingIconClick: NonNullable<
    DsListRowProps["onTrailingIconClick"]
  > = (event) => {
    stopPropagationAndCall(event, onTrailingIconClick);
  };

  // 2-column grid: leading (auto) | content (1fr).
  // Content column holds a flex row (text+trailing) and optionally CTA below.
  // Leading spans both rows when CTA is present.
  const gridTemplateColumns = showLeading ? "auto 1fr" : "1fr";

  const gridSx = {
    display: "grid",
    gridTemplateColumns,
    alignItems,
    columnGap: "var(--ds-spacing-frostbite)",
    rowGap: "var(--ds-spacing-frostbite)",
    p: "var(--ds-spacing-bitterCold)",
    ...rowSx,
  };

  const rowContent = (
    <>
      {showLeading && (
        <DsListRowLeadingSection
          leadingVariant={leadingVariant}
          leadingImageSrc={leadingImageSrc}
          leadingImageProps={leadingImageProps}
          leadingDateDay={leadingDateDay}
          leadingDateMonth={leadingDateMonth}
          leadingIcon={leadingIcon}
          leadingIconProps={leadingIconProps}
          ctaLabel={ctaLabel}
        />
      )}
      <DsBox
        sx={{
          display: "flex",
          alignItems: "inherit",
          gap: "var(--ds-spacing-bitterCold)",
        }}
      >
        <DsListRowTextSection
          primaryText={primaryText}
          secondaryText={secondaryText}
          tertiaryText={tertiaryText}
          tertiaryIcon={tertiaryIcon}
          chipLabel={chipLabel}
          chipProps={chipProps}
        />
        <DsListRowTrailingSection
          isSelectionType={isSelectionType}
          isInfoType={isInfoType}
          resolvedShowChevron={resolvedShowChevron}
          value={value}
          radioProps={radioProps}
          trailingIcon={trailingIcon}
          trailingIconProps={trailingIconProps}
          trailingIconButtonProps={trailingIconButtonProps}
          onTrailingIconClick={handleTrailingIconClick}
          trailingNode={trailingNode}
        />
      </DsBox>
      {ctaLabel && (
        <DsListRowCtaSection
          ctaButtonProps={ctaButtonProps}
          ctaLabel={ctaLabel}
          onCtaClick={handleCtaClick}
        />
      )}
    </>
  );

  return (
    <DsListItem
      divider={divider}
      disablePadding
      sx={{
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "var(--ds-colour-surfacePrimary)",
        ...sx,
      }}
      {...restProps}
    >
      {isInteractable ? (
        <DsListItemButton
          {...(isSelectionType && { component: "label" })}
          onClick={onClick}
          sx={{
            ...gridSx,
            "&:hover": {
              backgroundColor: "var(--ds-colour-stateSelectedPrimaryHover)",
            },
            "&:active": {
              backgroundColor: "var(--ds-colour-surfaceSecondary)",
            },
          }}
        >
          {rowContent}
        </DsListItemButton>
      ) : (
        <DsBox sx={gridSx}>{rowContent}</DsBox>
      )}
    </DsListItem>
  );
};
