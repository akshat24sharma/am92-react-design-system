import React, { useState } from 'react'

import type {
  DsOtpVerificationProps,
  DsOtpVerificationSlotProps,
  DsOtpVerificationSlots,
  StatusDetailType
} from './DsOtpVerification.Types'
import DsOtpVerificationWrapper from './DsOtpVerificationWrapper'
import { OtpError } from './OtpErrorClass'
import DsOtpHeader from './Slots/DsOtpHeader'
import DsOtpSection from './Slots/DsOtpSection'
import DsOtpStatusContent from './Slots/DsOtpStatusContent'
import DsStatusDialog from './Slots/DsStatusDialog'
import { CONFIRM_CLOSE_DETAIL, DEFAULT_STATUS_MAP } from './StatusMapper'
import { DsLoader } from '../../Components'
import { useBreakpoints } from '../../Hooks'

export const INITIAL_STATUS: StatusDetailType = {
  message: '',
  type: 'message'
}

export const DsOtpVerification: React.FC<DsOtpVerificationProps> = ({
  open,
  showConfirmationOnClose,
  hideHeader,
  channelId,
  channelLabel,
  secondaryOtp,
  otpLength = 6,
  resendTimer = 30,
  currentResendAttempts,
  maxResendAttempts,
  title,
  description,
  showBottomSheet,
  footerText = 'Powered by RBI regulated Account Aggregator ',
  footerIcon,
  onResend,
  onSubmit,
  onClose,
  ...restProps
}) => {
  const [status, setStatus] = useState<StatusDetailType>(INITIAL_STATUS)
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState('')
  const [secondaryOtpValue, setSecondaryOtpValue] = useState('')

  const { slots, slotProps, ...wrapperProps } = restProps as {
    slots?: DsOtpVerificationSlots
    slotProps?: DsOtpVerificationSlotProps
  }

  const { breakpoints } = useBreakpoints()

  const useBottomSheet =
    breakpoints.sm || breakpoints.xs || showBottomSheet || false

  const isFullPageStatus = status.type === 'fullPage'

  const showInputSection = useBottomSheet
    ? status.type === 'message' ||
      (status.type === 'fullPage' && !!status.isDialogOnMobile)
    : !isFullPageStatus

  const hasPrimaryOtp = otp.length === otpLength
  const hasSecondaryOtp =
    !secondaryOtp || secondaryOtpValue.length === otpLength

  const isConfirmDisabled = !hasPrimaryOtp || !hasSecondaryOtp || loading

  const StatusContentComponent = slots?.statusContent ?? DsOtpStatusContent
  const OtpSectionComponent = slots?.otpSection ?? DsOtpSection

  const OtpHeader = slots?.otpHeader ?? DsOtpHeader

  const handleClose = () => {
    if (showConfirmationOnClose) {
      setStatus(CONFIRM_CLOSE_DETAIL)
    } else {
      onClose()
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setStatus(INITIAL_STATUS)
    try {
      const otps = { [channelId]: otp }

      if (secondaryOtp) {
        if (!secondaryOtp.channelId)
          console.warn("secondaryChannelId must be present with variant 'dual'")

        otps[secondaryOtp.channelId ?? 'secondary'] = secondaryOtpValue
      }

      const result = await onSubmit(otps)

      if (result.success) {
        setStatus(DEFAULT_STATUS_MAP.SUCCESS)
      }
    } catch (err: unknown) {
      if (err instanceof OtpError) {
        const errorStatus = err.status
        setStatus(errorStatus)
      } else {
        setStatus(DEFAULT_STATUS_MAP.DEFAULT)
      }
    } finally {
      setLoading(false)
    }
  }

  const getCommonDialogProps = (forInputSection?: boolean) => {
    let actionBtnProps = {}

    if (forInputSection) {
      actionBtnProps = {
        primaryButtonText: 'Confirm OTP',
        primaryButtonProps: {
          disabled: isConfirmDisabled,
          onClick: handleSubmit
        },
        ActionsProps: {
          sx: {
            boxShadow: 'none',
            margin: 0,
            ...(useBottomSheet
              ? {}
              : { paddingTop: 'var(--ds-spacing-mild) !important' })
          }
        }
      }
    } else {
      const hasPrimary =
        status.type === 'fullPage' && Boolean(status.primaryButtonText)
      const hasSecondary =
        status.type === 'fullPage' && Boolean(status.secondaryBtnText)

      actionBtnProps = {
        ActionsProps: {
          sx: { boxShadow: 'none', margin: 0 }
        }
      }
      if (hasPrimary) {
        actionBtnProps = {
          ...actionBtnProps,
          primaryButtonText: status.primaryButtonText,
          primaryButtonProps: {
            onClick: onClose
          }
        }
      }
      if (hasSecondary) {
        actionBtnProps = {
          ...actionBtnProps,
          secondaryButtonText: status.secondaryBtnText,
          secondaryButtonProps: {
            onClick: () => setStatus(INITIAL_STATUS)
          }
        }
      }
    }

    return actionBtnProps
  }

  return (
    <DsOtpVerificationWrapper
      open={open}
      title={title}
      description={description}
      onClose={handleClose}
      useBottomSheet={useBottomSheet}
      showInputSection={showInputSection}
      dialogHeight={secondaryOtp ? '100%' : '478px'}
      statusDialog={
        <DsStatusDialog
          status={status}
          StatusContentComponent={StatusContentComponent}
          dialogActionProps={getCommonDialogProps()}
          {...slotProps?.statusContent}
        />
      }
      commonActionBtnProps={getCommonDialogProps(showInputSection)}
      header={
        OtpHeader ? (
          <OtpHeader onClose={handleClose} {...slotProps?.otpHeader} />
        ) : null
      }
      {...wrapperProps}
    >
      {showInputSection ? (
        <OtpSectionComponent
          loading={loading}
          setLoading={setLoading}
          channelId={channelId}
          channelLabel={channelLabel}
          currentResendAttempts={currentResendAttempts}
          maxResendAttempts={maxResendAttempts}
          otp={otp}
          setOtp={setOtp}
          secondaryOtp={secondaryOtp}
          secondaryOtpValue={secondaryOtpValue}
          setSecondaryOtpValue={setSecondaryOtpValue}
          otpLength={otpLength}
          useBottomSheet={useBottomSheet}
          status={status}
          footerText={footerText}
          footerIcon={footerIcon}
          onResend={onResend}
          resendTimer={resendTimer}
          setStatus={setStatus}
          {...slotProps?.otpSection}
        />
      ) : (
        <StatusContentComponent status={status} {...slotProps?.statusContent} />
      )}
      {loading && <DsLoader />}
    </DsOtpVerificationWrapper>
  )
}
