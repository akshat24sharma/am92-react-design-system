import { FC } from 'react'
import {
  SnackbarProvider,
  SnackbarProviderProps,
  closeSnackbar,
  enqueueSnackbar,
  useSnackbar
} from 'notistack'

import {
  DsNotistackAlertDefault,
  DsNotistackAlertSuccess,
  DsNotistackAlertError,
  DsNotistackAlertWarning,
  DsNotistackAlertInfo
} from './AlertMessage.Component'
import { DsNotistackKey, DsNotistackProviderDefaultProps, EnqueNotistackProps } from './DsNotistack.Types'

const useNotistack = useSnackbar

export { closeNotistack, useNotistack, enqueueNotistack, generateKeyNotistack }

export const DsNotistackProvider: FC<SnackbarProviderProps> = (inProps) => {
  const props = { ...DsNotistackProviderDefaultProps, ...inProps }

    return (
      <SnackbarProvider
        preventDuplicate
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        {...props}
        Components={{
          default: DsNotistackAlertDefault,
          success: DsNotistackAlertSuccess,
          error: DsNotistackAlertError,
          warning: DsNotistackAlertWarning,
          info: DsNotistackAlertInfo,
          ...props.Components
        }}
      />
    )
}

function generateKeyNotistack(message?: string): string {
  const key: DsNotistackKey = `${message || ''}-${new Date().getTime()}`
  return key
}

function enqueueNotistack(notistackOptions: EnqueNotistackProps): void {
  const key: DsNotistackKey = `${
    notistackOptions.message
  }-${new Date().getTime()}`

  // Handle if key has been passed
  const notificationObj = { key, ...notistackOptions }
  enqueueSnackbar(notificationObj)
}

function closeNotistack(key?: DsNotistackKey | undefined): void {
  closeSnackbar(key)
}
