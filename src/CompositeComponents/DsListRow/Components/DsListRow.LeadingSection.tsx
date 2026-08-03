import { DsBox, DsImage, DsRemixIcon, DsTypography } from "../../../Components";
import type { DsListRowProps } from "../DsListRow.Types";

type DsListRowLeadingSectionProps = Pick<
  DsListRowProps,
  | "leadingVariant"
  | "leadingImageSrc"
  | "leadingImageProps"
  | "leadingDateDay"
  | "leadingDateMonth"
  | "leadingIcon"
  | "leadingIconProps"
  | "ctaLabel"
>;

export const DsListRowLeadingSection = ({
  leadingVariant,
  leadingImageSrc,
  leadingImageProps,
  leadingDateDay,
  leadingDateMonth,
  leadingIcon,
  leadingIconProps,
  ctaLabel,
}: DsListRowLeadingSectionProps) => {
  const spanSx = ctaLabel ? { gridRow: "span 2" } : undefined;

  if (leadingVariant === "date") {
    return (
      <DsBox
        sx={{
          width: "36px",
          height: "36px",
          borderRadius: "var(--ds-radius-quickFreeze)",
          backgroundColor: "var(--ds-colour-surfaceSecondary)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--ds-spacing-deepFreeze)",
          p: "var(--ds-spacing-quickFreeze)",
          ...spanSx,
        }}
      >
        <DsTypography
          sx={{ color: "var(--ds-colour-typoSecondary)" }}
          variant="supportRegularInfo"
        >
          {leadingDateDay}
        </DsTypography>
        <DsTypography
          variant="supportRegularInfo"
          sx={{
            color: "var(--ds-colour-typoSecondary)",
          }}
        >
          {leadingDateMonth}
        </DsTypography>
      </DsBox>
    );
  }

  if (leadingVariant === "icon") {
    return (
      <DsBox
        sx={{
          width: "36px",
          height: "36px",
          borderRadius: "var(--ds-radius-quickFreeze)",
          backgroundColor: "var(--ds-colour-surfaceBackground)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: "var(--ds-spacing-quickFreeze)",
          ...spanSx,
        }}
      >
        <DsRemixIcon
          {...leadingIconProps}
          className={leadingIcon || undefined}
          fontSize="cool"
          sx={{
            color: "var(--ds-colour-iconDefault)",
            ...(leadingIconProps?.sx ?? {}),
          }}
        />
      </DsBox>
    );
  }

  return (
    <DsImage
      {...leadingImageProps}
      alt={leadingImageProps?.alt ?? "list-row-leading"}
      srcSet={leadingImageSrc}
      WrapperProps={{
        ...leadingImageProps?.WrapperProps,
        sx: {
          width: "36px",
          height: "36px",
          borderRadius: "var(--ds-radius-quickFreeze)",
          border: "1px solid var(--ds-colour-strokeDefault)",
          backgroundColor: "var(--ds-colour-surfaceBackground)",
          objectFit: "cover",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...spanSx,
          ...(leadingImageProps?.WrapperProps?.sx ?? {}),
        },
      }}
    />
  );
};

DsListRowLeadingSection.displayName = "DsListRowLeadingSection";
