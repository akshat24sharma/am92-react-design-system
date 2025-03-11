import React, { FC } from 'react'
import { OptionsObject, closeSnackbar } from 'notistack'

import { DsToast, DsToastProps } from '../DsToast'
import { DsNotistackProviderProps, NotiStackMessage } from './DsNotistack.Types'

export interface AlertMessageProps
  extends Omit<DsToastProps, 'variant'>,
    Pick<
      OptionsObject,
      Exclude<keyof OptionsObject, keyof Omit<DsToastProps, 'variant'>>
    >,
    NotiStackMessage {
  toastVariant: DsToastProps['variant']
  iconVariant: DsNotistackProviderProps['iconVariant']
}

const AlertMessage: FC<AlertMessageProps> = (props) => {
  const handleClose = () => {
    const { id } = props
    closeSnackbar(id)
  }

    const {
      ref,
      toastVariant,
      variant,
      message,
      id,
      autoHideDuration,
      hideIconVariant,
      anchorOrigin,
      persist,
      iconVariant,

      ...restProps
    } = props

    return (
      <DsToast
        {...restProps}
        variant={toastVariant}
        color={variant}
        onClose={handleClose}
      >
        {message}
      </DsToast>
    )
}

export const DsNotistackAlertDefault = React.forwardRef<
  HTMLDivElement,
  AlertMessageProps
>((props, ref) => {
  return <AlertMessage forwardedRef={ref} {...props} variant="default" />
})

export const DsNotistackAlertSuccess = React.forwardRef<
  HTMLDivElement,
  AlertMessageProps
>((props, ref) => {
  return <AlertMessage forwardedRef={ref} {...props} variant="success" />
})

export const DsNotistackAlertError = React.forwardRef<
  HTMLDivElement,
  AlertMessageProps
>((props, ref) => {
  return <AlertMessage forwardedRef={ref} {...props} variant="error" />
})

export const DsNotistackAlertWarning = React.forwardRef<
  HTMLDivElement,
  AlertMessageProps
>((props, ref) => {
  return <AlertMessage forwardedRef={ref} {...props} variant="warning" />
})

export const DsNotistackAlertInfo = React.forwardRef<
  HTMLDivElement,
  AlertMessageProps
>((props, ref) => {
  return <AlertMessage forwardedRef={ref} {...props} variant="info" />
})
