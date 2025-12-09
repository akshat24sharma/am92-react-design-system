import React, { useEffect, useRef, useState } from 'react'
import { DsButton, DsStack, DsTypography } from '../../Components'

interface IDsOtpVerificationResendProps {
  onResend: () => Promise<void> | void
  loading: boolean
  resendTimer: number
  maxResendAttempts: number
  currentResendAttempts: number
}

const DsOtpVerificationResend: React.FC<IDsOtpVerificationResendProps> = ({
  onResend,
  loading,
  resendTimer,
  maxResendAttempts,
  currentResendAttempts
}) => {
  const [timeLeft, setTimeLeft] = useState(resendTimer)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const limitExhausted = maxResendAttempts === currentResendAttempts

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const startTimer = (seconds: number) => {
    clearTimer()
    if (limitExhausted) return
    setTimeLeft(seconds)
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const handleClick = async () => {
    await onResend()
    startTimer(resendTimer) // reset timer after resend
  }

  const getOtpRemainingText = () => {
    return limitExhausted
      ? '(OTP resend limit exhausted)'
      : `(${maxResendAttempts - currentResendAttempts} OTP request remaining)`
  }

  // start timer once on mount
  useEffect(() => {
    startTimer(resendTimer)
    return clearTimer
  }, [])

  return (
    <DsStack sx={{ flexDirection: 'row', alignItems: 'center' }}>
      <DsButton
        variant='text'
        color='secondary'
        onClick={handleClick}
        disabled={timeLeft > 0 || loading || limitExhausted}
      >
        Resend OTP
      </DsButton>

      <DsTypography color='var(--ds-colour-typoTertiary)'>
        {timeLeft > 0 && !limitExhausted
          ? `in (${formatTime(timeLeft)})`
          : getOtpRemainingText()}
      </DsTypography>
    </DsStack>
  )
}

export default DsOtpVerificationResend
