import { DsBox, DsChip, DsRemixIcon, DsTypography } from "../../../Components";
import type { DsListRowProps } from "../DsListRow.Types";

type DsListRowTextSectionProps = Pick<
  DsListRowProps,
  | "primaryText"
  | "secondaryText"
  | "tertiaryText"
  | "tertiaryIcon"
  | "chipLabel"
  | "chipProps"
>;

export const DsListRowTextSection = ({
  primaryText,
  secondaryText,
  tertiaryText,
  tertiaryIcon,
  chipLabel,
  chipProps,
}: DsListRowTextSectionProps) => {
  return (
    <DsBox
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "var(--ds-spacing-quickFreeze)",
        overflow: "hidden",
      }}
    >
      <DsBox
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "var(--ds-spacing-glacial)",
        }}
      >
        <DsTypography
          variant="bodyBoldMedium"
          sx={{
            color: "var(--ds-colour-typoPrimary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            wordBreak: "break-word",
          }}
        >
          {primaryText}
        </DsTypography>

        {chipLabel && <DsChip type="nudge" label={chipLabel} {...chipProps} />}
      </DsBox>

      {secondaryText && (
        <DsTypography
          variant="bodyRegularSmall"
          sx={{
            color: "var(--ds-colour-typoSecondary)",
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
        >
          {secondaryText}
        </DsTypography>
      )}

      {tertiaryText && (
        <DsBox
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "var(--ds-spacing-glacial)",
          }}
        >
          {tertiaryIcon && (
            <DsRemixIcon
              className={tertiaryIcon ? `ri-${tertiaryIcon}` : undefined}
              sx={{
                fontSize: "16px",
                color: "var(--ds-colour-iconDefault)",
              }}
            />
          )}
          <DsTypography
            variant="supportRegularInfo"
            sx={{
              color: "var(--ds-colour-typoTertiary)",
              minWidth: 0,
            }}
          >
            {tertiaryText}
          </DsTypography>
        </DsBox>
      )}
    </DsBox>
  );
};
