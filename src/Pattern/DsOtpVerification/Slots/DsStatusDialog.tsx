import type { ElementType } from 'react'
import React from 'react'
import type { DsDialogProps } from '../../../Components'
import { DsDialog } from '../../../Components'
import type { StatusDetailType } from '../DsOtpVerification.Types'

interface IDsStatusDialogProps {
  status: StatusDetailType
  StatusContentComponent: ElementType
  // StatusContentComponentProps?: IDsOtpStatusProps
  dialogActionProps: Partial<DsDialogProps>
}

const DsStatusDialog: React.FC<IDsStatusDialogProps> = ({
  status,
  StatusContentComponent,
  dialogActionProps,
  ...restStatusContentComponentProps
}) => {
  if (status.type !== 'fullPage' || !status.isDialogOnMobile) return null

  return (
    <DsDialog
      open
      showClose={false}
      disablePortal
      sx={{
        mx: '36px',
        zIndex: 1,
        position: 'absolute',
        '& .MuiPaper-root-MuiDialog-paper, .MuiDialog-paper , .MuiPaper-root': {
          width: '100% !important'
        }
      }}
      {...dialogActionProps}
    >
      <StatusContentComponent
        status={status}
        hideIllustration={true}
        {...restStatusContentComponentProps}
      />
    </DsDialog>
  )
}

export default DsStatusDialog
