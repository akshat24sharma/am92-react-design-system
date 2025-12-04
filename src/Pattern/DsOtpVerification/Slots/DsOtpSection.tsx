import React, { useEffect } from 'react'
import {
  DsBox,
  DsChip,
  DsDivider,
  DsOtp,
  DsRemixIcon,
  DsStack,
  DsTypography
} from '../../../Components'

import { INITIAL_STATUS } from '../DsOtpVerification.Component'
import type { IDsOtpSectionProps } from '../DsOtpVerification.Types'
import DsOtpVerificationResend from '../DsOtpVerificationResend'
import { OtpError } from '../OtpErrorClass'
import { DEFAULT_STATUS_MAP } from '../StatusMapper'


const OtpLabel: React.FC<{ label: string }> = ({ label }) => {
  return (
    <DsStack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 'var(--ds-spacing-glacial)'
      }}
    >
      <DsStack
        sx={{
          background: 'var(--ds-colour-neutral1)',
          height: 'var(--ds-spacing-mild)',
          width: 'var(--ds-spacing-mild)',
          borderRadius: 'var(--ds-spacing-quickFreeze)',
          justifyContent: 'center'
        }}
      >
        <DsRemixIcon className='ri-lock-password-line' fontSize='frigid' />
      </DsStack>
      <DsTypography variant='bodyBoldMedium'>{label}</DsTypography>
    </DsStack>
  )
}

const DsOtpSection: React.FC<IDsOtpSectionProps> = ({
  loading,
  setLoading,

  channelId,
  channelLabel,
  otp,
  setOtp,
  currentResendAttempts,
  maxResendAttempts,

  secondaryOtp,
  secondaryOtpValue,
  setSecondaryOtpValue,

  otpLength,
  useBottomSheet,
  status,
  footerText,
  footerIcon,
  onResend,
  resendTimer,
  setStatus
}) => {
  useEffect(() => {
    return setOtp('')
  }, [])

  const handleResend = async (channel: string) => {
    setLoading(true)
    setStatus(INITIAL_STATUS)
    try {
      await onResend(channel)
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

  const hasSecondary = secondaryOtp !== undefined

  // Error display helpers
  const isError = status.type === 'message' && status.message.length > 3

  const helperText = isError ? status.message : undefined

  // styling helpers
  const mobilePaddingSx = useBottomSheet
    ? {
        padding: 'var(--ds-spacing-bitterCold)',
        paddingTop: 'var(--ds-spacing-mild)'
      }
    : {}

  const footerSx = useBottomSheet
    ? { px: 'var(--ds-spacing-bitterCold)', pb: 'var(--ds-spacing-glacial)' }
    : {}

  const renderOtp = (
    id: string,
    label: string,
    currentResend: number,
    maxResend: number,
    otpValue: string,
    setOtpValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (
      <>
        <DsOtp
          label={<OtpLabel label={label} />}
          // TODO: check on IOS for keyboard
          // TODO: lazy load images - check one - important
          value={otpValue}
          length={otpLength}
          // size={useBottomSheet ? 'small' : 'medium'}
          size={'small'}
          error={isError}
          helperText={helperText}
          onComplete={value => setOtpValue(value)}
        />
        <DsOtpVerificationResend
          currentResendAttempts={currentResend}
          maxResendAttempts={maxResend}
          loading={loading}
          onResend={() => handleResend(id)}
          resendTimer={resendTimer}
        />
      </>
    )
  }
  return (
    <DsStack
      sx={{
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }}
    >
      <DsStack
        sx={{
          alignItems: 'flex-start',
          gap: 'var(--ds-spacing-bitterCold)',
          width: '100%',
          ...mobilePaddingSx
        }}
      >
        {renderOtp(
          channelId,
          channelLabel,
          currentResendAttempts,
          maxResendAttempts,
          otp,
          setOtp
        )}

        {hasSecondary && (
          <>
            <DsDivider
              ds-size='M'
              variant='fullWidth'
              sx={{ width: '100%', my: 'var(--ds-spacing-bitterCold)' }}
            />

            {renderOtp(
              secondaryOtp.channelId,
              secondaryOtp.channelLabel,
              secondaryOtp.currentResendAttempts,
              secondaryOtp.maxResendAttempts,
              secondaryOtpValue,
              setSecondaryOtpValue
            )}
          </>
        )}

        <DsChip
          type='nudge'
          color='info'
          label={
            <DsStack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 'var(--ds-spacing-glacial)'
              }}
            >
              <DsRemixIcon
                className='ri-shield-keyhole-line'
                fontSize='frostbite'
              />
              <DsBox color={'var(--ds-colour-typoSecondary)'}>
                We ensure 100% data security.
              </DsBox>
            </DsStack>
          }
          sx={{
            marginBottom: 'var(--ds-spacing-warm)'
          }}
        />
      </DsStack>
      <DsStack
        sx={{
          width: '100%',
          gap: 'var(--ds-spacing-bitterCold)',
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'var(--ds-colour-surfaceBackground)'
        }}
      >
        <DsDivider ds-size='M' variant='fullWidth' style={{ width: '100%' }} />
        <DsStack
          sx={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // marginBottom: 'var(--ds-spacing-glacial)',
            ...footerSx
          }}
        >
          <DsTypography
            variant='supportRegularInfo'
            sx={{
              color: 'var(--ds-colour-typoTertiary)'
            }}
          >
            {footerText}
          </DsTypography>
          {footerIcon}
        </DsStack>
      </DsStack>
    </DsStack>
  )
}

export default DsOtpSection
