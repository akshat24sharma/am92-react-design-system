
import { DsIconButton, DsRadio, DsRemixIcon } from '../../../Components'
import type { DsListRowProps } from '../DsListRow.Types'

type DsListRowTrailingSectionProps = Pick<
  DsListRowProps,
  | 'value'
  | 'radioProps'
  | 'trailingIcon'
  | 'trailingIconProps'
  | 'trailingIconButtonProps'
  | 'trailingNode'
> & {
  isSelectionType: boolean
  isInfoType: boolean
  resolvedShowChevron: boolean
  onTrailingIconClick?: DsListRowProps['onTrailingIconClick']
}

export const DsListRowTrailingSection = ({
  isSelectionType,
  isInfoType,
  resolvedShowChevron,
  value,
  radioProps,
  trailingIcon,
  trailingIconProps,
  trailingIconButtonProps,
  onTrailingIconClick,
  trailingNode
}: DsListRowTrailingSectionProps) => {
  // Custom node takes precedence
  if (trailingNode) {
    return <>{trailingNode}</>
  }

  // Default behavior: selection, info icon, or chevron
  if (isSelectionType) {
    return (
      <DsRadio
        {...radioProps}
        label={undefined}
        value={value}
        sx={{ mr: 'unset', ...(radioProps?.sx ?? {}) }}
      />
    )
  }

  if (isInfoType) {
    if (onTrailingIconClick) {
      return (
        <DsIconButton
          {...trailingIconButtonProps}
          size='small'
          onClick={onTrailingIconClick}
          sx={{
            color: 'var(--ds-colour-iconDefault)',
            p: 0,
            ...(trailingIconButtonProps?.sx ?? {})
          }}
        >
          <DsRemixIcon
            {...trailingIconProps}
            className={trailingIcon ? `ri-${trailingIcon}` : undefined}            
            sx={{ ...(trailingIconProps?.sx ?? {}) }}
          />
        </DsIconButton>
      )
    }

    return (
      <DsRemixIcon
        {...trailingIconProps}
        className={trailingIcon ? `ri-${trailingIcon}` : undefined}        
        sx={{
          fontSize: '20px',
          color: 'var(--ds-colour-iconDefault)',
          flexShrink: 0,
          ...(trailingIconProps?.sx ?? {})
        }}
      />
    )
  }

  if (!resolvedShowChevron) {
    return null
  }

  return (
    <DsRemixIcon
      className='ri-arrow-right-s-line'
      sx={{
        fontSize: '20px',
        color: 'var(--ds-colour-iconDefault)',
        flexShrink: 0
      }}
    />
  )
}
