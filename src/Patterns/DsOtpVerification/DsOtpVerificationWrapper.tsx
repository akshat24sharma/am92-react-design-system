import React from 'react'
import type {
  DsBottomSheetProps,
  DsDialogProps
} from '../../Components'
import { DsBottomSheet, DsDialog } from '../../Components'

interface DsOtpVerificationWrapperProps
  extends Omit<DsDialogProps, 'slots' | 'onSubmit' | 'slotProps' | 'classes'>,
    Omit<DsBottomSheetProps, 'slots' | 'onSubmit' | 'slotProps' | 'classes'> {
  open: boolean
  title: string
  description: string
  onClose: () => void
  useBottomSheet?: boolean
  showInputSection: boolean
  children: React.ReactNode
  dialogHeight: string
  statusDialog: React.ReactNode
  commonActionBtnProps: Partial<DsDialogProps>
  header: React.ReactNode | null
}

const DsOtpVerificationWrapper: React.FC<DsOtpVerificationWrapperProps> = ({
  open,
  title,
  description,
  onClose,
  useBottomSheet = false,
  showInputSection,
  children,
  dialogHeight,
  statusDialog,
  commonActionBtnProps,
  header,
  ...rest
}) => {
  if (!open) return null
  const headerHeight = 'var(--ds-rules-appBarMobileMinHeight)'
  const { PaperProps, ContainerProps, ContentProps, TitleProps } = rest ?? {}

  return useBottomSheet ? (
    <>
      <DsBottomSheet
        showClose={false}
        open={open}
        title={showInputSection ? title : ''}
        description={showInputSection ? description : ''}
        TitleProps={{
          ...TitleProps,
          sx: {
            ...TitleProps?.sx,
            mt: headerHeight
          }
        }}
        PaperProps={{
          ...PaperProps,
          sx: {
            ...PaperProps?.sx,
            maxHeight: '100vh',
            height: '100vh',
            position: 'absolute',
            bottom: 0
          }
        }}
        ContainerProps={{
          ...ContainerProps,
          sx: {
            ...ContainerProps?.sx,
            borderTopLeftRadius: 'unset',
            borderTopRightRadius: 'unset'
          }
        }}
        variant='permanent'
        ContentProps={{
          ...ContentProps,
          sx: {
            ...ContentProps?.sx,
            padding: 'unset',
            margin: 'unset'
          }
        }}
        {...rest}
        {...commonActionBtnProps}
      >
        {showInputSection && header}
        {children}
        {statusDialog}
      </DsBottomSheet>
    </>
  ) : (
    <DsDialog
      open={open}
      showClose={showInputSection}
      title={showInputSection ? title : ''}
      description={showInputSection ? description : ''}
      DescriptionProps={{ sx: { mr: 'var(--ds-spacing-warm)' } }}
      onClose={onClose}
      PaperProps={{
        ...PaperProps,
        sx: {
          ...PaperProps?.sx,
          height: dialogHeight
        }
      }}
      ContentProps={{
        ...ContentProps
      }}
      {...rest}
      {...commonActionBtnProps}
    >
      {children}
    </DsDialog>
  )
}

export default DsOtpVerificationWrapper
