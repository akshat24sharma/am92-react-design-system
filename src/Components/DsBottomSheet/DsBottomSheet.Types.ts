import { DsButtonProps } from '../DsButton'
import { DsDialogActionsProps } from '../DsDialogActions'
import { DsDialogContentProps } from '../DsDialogContent'
import { DsDialogTitleProps } from '../DsDialogTitle'
import { DsDrawerProps } from '../DsDrawer'
import { DsIconButtonProps } from '../DsIconButton'
import { DsPaperProps } from '../DsPaper'
import { DsRemixIconProps } from '../DsRemixIcon'
import { DsTypographyProps } from '../DsTypography'

export interface DsBottomSheetProps extends Omit<DsDrawerProps, 'title'> {
  /** Small contextual text displayed above the title (e.g., "Confirm Action", "Settings") */
  kicker?: string
  /** Main heading text for the bottom sheet content */
  title?: string
  /** Supporting text content displayed below the title for additional context */
  description?: string
  /** Whether to display the close (×) button in the header. @default true */
  showClose?: boolean
  /** Content for the primary action button (typically the main action) */
  primaryButtonText?: DsButtonProps['children']
  /** Content for the secondary action button (typically cancel or dismiss) */
  secondaryButtonText?: DsButtonProps['children']
  /** Custom React element to display as an illustration (icons, images, etc.) */
  illustration?: React.ReactNode

  /** Root container Paper customization */
  ContainerProps?: DsPaperProps
  /** Kicker text Typography customization */
  KickerProps?: DsTypographyProps
  /** Description text Typography customization */
  DescriptionProps?: DsTypographyProps
  /** Header title DialogTitle customization */
  TitleProps?: DsDialogTitleProps
  /** Close button IconButton customization */
  CloseIconButtonProps?: DsIconButtonProps
  /** Close icon RemixIcon customization (ref omitted) */
  CloseIconProps?: Omit<DsRemixIconProps, 'ref'>
  /** Illustration container DialogContent customization */
  IllustrationProps?: DsDialogContentProps
  /** Main content area DialogContent customization */
  ContentProps?: DsDialogContentProps
  /** Action buttons container DialogActions customization */
  ActionsProps?: DsDialogActionsProps
  /** Primary action Button customization (ref omitted) */
  primaryButtonProps?: Omit<DsButtonProps, 'ref'>
  /** Secondary action Button customization (ref omitted) */
  secondaryButtonProps?: Omit<DsButtonProps, 'ref'>
}

export const DsBottomSheetDefaultProps: DsBottomSheetProps = {
  showClose: true
}
