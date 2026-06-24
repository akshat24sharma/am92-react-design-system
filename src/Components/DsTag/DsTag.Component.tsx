import { FC } from 'react'
import Chip from '@mui/material/Chip'
import { DsTagProps } from './DsTag.Types'
import { DsRemixIcon } from '../DsRemixIcon'
import STATE_STYLES from '../../Constants/STATE_STYLES'
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

  const { selected, onClick, onDelete, sx, ...chipProps } = props
  const color = (selected && 'secondary') || 'default' 

  return (
    <Chip
      deleteIcon={<DsRemixIcon className="ri-close-circle-fill" />}
      skipFocusWhenDisabled
      sx={{
        paddingTop: 'var(--ds-spacing-quickFreeze)',
        paddingBottom: 'var(--ds-spacing-quickFreeze)',
        paddingLeft: 'var(--ds-spacing-frostbite)',
        paddingRight: 'var(--ds-spacing-frostbite)',
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
        '&.Mui-disabled': {
          opacity: 1,
          border: '1px solid var(--ds-colour-strokeDisabled)',
          backgroundColor: 'var(--ds-colour-stateDisabledSurface)',
        },
        '> .MuiChip-label': {
          color: 'var(--ds-colour-typoPrimary)',
          paddingTop: 'var(--ds-spacing-deepFreeze)',
          paddingBottom: 'var(--ds-spacing-deepFreeze)',
          paddingLeft: 'var(--ds-spacing-zero)',
          paddingRight: 'var(--ds-spacing-zero)'
        },
        '> .MuiChip-icon': {
          color: 'var(--ds-colour-typoPrimary)',
          fontSize: 'var(--ds-typo-fontSizeBitterCold)',
          marginLeft: 'var(--ds-spacing-zero)',
          marginRight: 'var(--ds-spacing-glacial)',
        },
        '> .MuiChip-deleteIcon': {
          fontSize: 'var(--ds-typo-fontSizeBitterCold)',
          marginRight: 'var(--ds-spacing-zero)',
          marginLeft: 'var(--ds-spacing-glacial)',
          color: 'var(--ds-colour-typoPrimary)',
        },
        '&.MuiChip-colorSecondary .MuiChip-label, &.MuiChip-colorSecondary .MuiChip-deleteIcon': {
          color: 'var(--ds-colour-typoOnSurface)'
        },
        '&.Mui-disabled .MuiChip-icon, &.Mui-disabled .MuiChip-deleteIcon': {
          color: 'var(--ds-colour-iconDisabled)'
        },
        '&.Mui-disabled .MuiChip-label': {
          color: 'var(--ds-colour-typoDisabled)',
          fontWeight: 'var(--ds-typo-bodyRegularMedium-fontWeight)',
        },
          ...sx
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
