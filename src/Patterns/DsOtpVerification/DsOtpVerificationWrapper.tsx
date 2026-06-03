import React from 'react'
import type {
  DsBottomSheetProps,
  DsDialogProps
} from '../../Components'
import { DsBottomSheet, DsDialog } from '../../Components'

interface DsOtpVerificationWrapperProps
  extends Omit<DsDialogProps, 'slots' | 'onSubmit' | 'slotProps' | 'classes' | 'role'>,
    Omit<DsBottomSheetProps, 'slots' | 'onSubmit' | 'slotProps' | 'classes' | 'role'> {
  open: boolean
  title: string
  description: string
  onClose: () => void
  useBottomSheet?: boolean
  isUncontainerised: boolean
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
  isUncontainerised,
  showInputSection,
  children,
  dialogHeight,
  statusDialog,
  commonActionBtnProps,
  header,
  ...verificationWrapperRestProps
}) => {
  if (!open) return null
  const headerHeight = 'var(--ds-rules-appBarMobileMinHeight)'
  const { ContainerProps, ContentProps, TitleProps } = verificationWrapperRestProps ?? {}

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
        slotProps={{
          paper: {
            sx: {
              maxHeight: 'unset',
              height: isUncontainerised ? '100dvh':'100%',
              position: isUncontainerised ? 'fixed' : 'absolute',
              bottom: 0
            },
          },
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
        {...verificationWrapperRestProps}
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
      slotProps={{
        paper:  {
          sx: {
            minHeight: dialogHeight
          },
        },
      }}
      ContentProps={{
        ...ContentProps,
        sx:{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          ...ContentProps?.sx
        }
      }}
      {...verificationWrapperRestProps}
      {...commonActionBtnProps}
    >
      {children}
    </DsDialog>
  )
}

export default DsOtpVerificationWrapper
