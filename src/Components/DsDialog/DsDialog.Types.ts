import { DialogProps } from '@mui/material'
import { DsDialogTitleProps } from '../DsDialogTitle'
import { DsTypographyProps } from '../DsTypography'
import { DsIconButtonProps } from '../DsIconButton'
import { DsRemixIconProps } from '../DsRemixIcon'
import { DsDialogContentProps } from '../DsDialogContent'
import { DsDialogActionsProps } from '../DsDialogActions'
import { DsButtonProps } from '../DsButton'
import { DsBoxProps } from '../DsBox'

export type DsDialogCloseReason = 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick'

export interface DsDialogProps extends Omit<DialogProps, 'onClose'> {
  title?: string
  description?: string
  kicker?: string
  illustration?: React.ReactNode
  showClose?: boolean
  primaryButtonText?: DsButtonProps['children']
  primaryButtonProps?: Omit<DsButtonProps, 'ref'>
  secondaryButtonText?: DsButtonProps['children']
  secondaryButtonProps?: Omit<DsButtonProps, 'ref'>
  TitleProps?: DsDialogTitleProps
  KickerProps?: DsTypographyProps
  DescriptionProps?: DsTypographyProps
  CloseIconButtonProps?: DsIconButtonProps
  CloseIconProps?: Omit<DsRemixIconProps, 'ref'>
  ContentProps?: DsDialogContentProps
  ActionsProps?: DsDialogActionsProps
  IllustrationProps?: DsDialogContentProps
  onClose?: (event: React.SyntheticEvent, reason: DsDialogCloseReason) => void
}

export const DsDialogDefaultProps: DsDialogProps = {
  open: false,
  scroll: 'paper',
  maxWidth: 'md',
  showClose: true,
  fullWidth: true
}
