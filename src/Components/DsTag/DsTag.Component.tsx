import { FC } from 'react'
import Chip from '@mui/material/Chip'
import { DsTagProps, DsTagDefaultProps } from './DsTag.Types'
import { DsRemixIcon } from '../DsRemixIcon'

export const DsTag: FC<DsTagProps> = (inProps) => {
  const props = {...DsTagDefaultProps, ...inProps}

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
        {...chipProps}
        clickable
        color={color}
        onDelete={(onDelete && handleDelete) || undefined}
        onClick={handleClick}
      />
    )
}
