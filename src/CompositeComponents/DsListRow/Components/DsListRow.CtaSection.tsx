
import { DsButton } from '../../../Components'
import type { DsListRowProps } from '../DsListRow.Types'

type DsListRowCtaSectionProps = Pick<
  DsListRowProps,
  'ctaButtonProps' | 'ctaLabel'
> & {
  onCtaClick?: DsListRowProps['onCtaClick']
}

export const DsListRowCtaSection = ({
  ctaButtonProps,
  ctaLabel,
  onCtaClick
}: DsListRowCtaSectionProps) => {
  return (
    <DsButton
      {...ctaButtonProps}
      fullWidth
      size='small'
      color='secondary'
      onClick={onCtaClick}
      sx={{ ...(ctaButtonProps?.sx ?? {}) }}
    >
      {ctaLabel}
    </DsButton>
  )
}
