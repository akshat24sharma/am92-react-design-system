import { FC } from 'react'
import Chip from '@mui/material/Chip'
import { DsTagProps } from './DsTag.Types'
import { DsRemixIcon } from '../DsRemixIcon'
import STATE_STYLES from '../../Theme/STATE_STYLES'
import { useThemeProps } from '@mui/system'

export const DsTag: FC<DsTagProps> = inProps => {
  const props = useThemeProps({ props: inProps, name: 'DsTag' })

  const handleClick = (): void => {
    const { value, onClick } = props
    if (typeof onClick === 'function') {
      onClick(value)
    }
  }

  const handleDelete = (): void => {
    const { value, onDelete } = props
    if (typeof onDelete === 'function') {
      onDelete(value)
    }
  }

  const { selected, onClick, onDelete, ...chipProps } = props
  const color = (selected && 'secondary') || 'default'

  return (
    <Chip
      deleteIcon={<DsRemixIcon className="ri-close-circle-fill" />}
      skipFocusWhenDisabled
      sx={{
        paddingTop: 'var(--ds-spacing-quickFreeze)',
        paddingBottom: 'var(--ds-spacing-quickFreeze)',
        fontWeight: 'var(--ds-typo-bodyRegularMedium-fontWeight)',
        fontSize: 'var(--ds-typo-bodyRegularMedium-fontSize)',
        lineHeight: 'var(--ds-typo-bodyRegularMedium-lineHeight)',
        letterSpacing: 'var(--ds-typo-bodyRegularMedium-letterSpacing)',
        backgroundColor: 'var(--ds-colour-surfacePrimary)',
        border: '1px solid var(--ds-colour-strokeDefault)',

        '&.MuiChip-colorSecondary': {
          backgroundColor: 'var(--ds-colour-actionSecondary)',
          border: '1px solid var(--ds-colour-strokeSelected)',
          fontWeight: 'var(--ds-typo-bodyBoldMedium-fontWeight)',
          fontSize: 'var(--ds-typo-bodyBoldMedium-fontSize)',
          lineHeight: 'var(--ds-typo-bodyBoldMedium-lineHeight)',
          letterSpacing: 'var(--ds-typo-bodyBoldMedium-letterSpacing)',
          '> .MuiChip-icon': {
            color: 'inherit'
          },
          ...STATE_STYLES.ACTION_SECONDARY_STATE_SECONDARY
        },
        '> .MuiChip-label': {
          paddingTop: 'var(--ds-spacing-deepFreeze)',
          paddingBottom: 'var(--ds-spacing-deepFreeze)',
          paddingLeft: 'var(--ds-spacing-frostbite)',
          paddingRight: 'var(--ds-spacing-frostbite)'
        },
        '> .MuiChip-icon': {
          color: 'var(--ds-colour-iconDefault)',
          fontSize: 'var(--ds-typo-fontSizeBitterCold)',
          marginLeft: 'var(--ds-spacing-frostbite)',
          marginRight: 'calc(var(--ds-spacing-quickFreeze) * -1)'
        },
        '> .MuiChip-deleteIcon': {
          fontSize: 'var(--ds-typo-fontSizeBitterCold)',
          marginRight: 'var(--ds-spacing-frostbite)',
          marginLeft: 'calc(var(--ds-spacing-quickFreeze) * -1)'
        }
      }}
      {...chipProps}
      variant="tag"
      clickable
      color={color}
      onDelete={(onDelete && handleDelete) || undefined}
      onClick={handleClick}
    />
  )
}
