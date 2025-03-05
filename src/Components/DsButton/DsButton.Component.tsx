import { FC } from 'react'
import Button from '@mui/material/Button'
import { DsButtonProps } from './DsButton.Types'

export const DsButton: FC<DsButtonProps> = (props) => {
    const { children, ...buttonProps } = props
    return (
      <Button {...buttonProps}>
        <span>{children}</span>
      </Button>
    )
}
