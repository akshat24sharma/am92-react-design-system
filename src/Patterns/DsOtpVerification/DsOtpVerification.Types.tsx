import type React from 'react'
import type { ElementType } from 'react'
import type {
  DsAppBarProps,
  DsBottomSheetProps,
  DsDialogProps,
  DsImageProps
} from '../../Components'

type MessageStatus = {
  type: 'message'
  message: string
}

type FullPageStatus = {
  type: 'fullPage'
  image: DsImageProps
  title: string
  description?: string
  primaryButtonText?: string
  secondaryBtnText?: string
  isDialogOnMobile?: boolean
}

export type StatusDetailType = MessageStatus | FullPageStatus

export interface IDsOtpSectionProps
  extends Pick<
    DsOtpVerificationProps,
    | 'otpLength'
    | 'channelLabel'
    | 'channelId'
    | 'currentResendAttempts'
    | 'maxResendAttempts'
    | 'footerText'
    | 'footerIcon'
    | 'onResend'
  > {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  otp: string
  setOtp: React.Dispatch<React.SetStateAction<string>>

  variant?: 'single' | 'dual'
  secondaryChannelId?: string
  secondaryChannelLabel?: string
  secondaryCurrentResendAttempts?: number
  secondaryMaxResendAttempts?: number
  secondaryOtpValue: string
  setSecondaryOtpValue: React.Dispatch<React.SetStateAction<string>>

  useBottomSheet: boolean
  status: StatusDetailType
  setStatus: React.Dispatch<React.SetStateAction<StatusDetailType>>
  resendTimer: number
}

export interface IDsOtpHeaderProps extends Pick<DsAppBarProps, 'color'> {
  onClose: () => void
}

export interface IDsOtpStatusProps {
  status: StatusDetailType
  hideIllustration?: boolean
}

/**
 * Configuration for an OTP channel (primary or secondary).
 */
export interface DsOtpChannelConfig {
  /**
   * Unique identifier for the OTP channel.
   * e.g., `'email'` or `'phone'`
   */
  channelId: string

  /**
   * Display label for the OTP channel.
   * e.g., `"+91 ******6326"` or `"vi****@gmail.com"`
   */
  channelLabel: string

  /**
   * Number of times the user has attempted to resend the OTP so far.
   */
  currentResendAttempts: number

  /**
   * Maximum number of allowed OTP resend attempts.
   */
  maxResendAttempts: number
}

export interface DsOtpVerificationSlots {
  statusContent?: ElementType<IDsOtpStatusProps>
  otpSection?: ElementType<IDsOtpSectionProps>
  otpHeader?: ElementType<IDsOtpHeaderProps> | null
}

export interface DsOtpVerificationSlotProps {
  statusContent?: Partial<IDsOtpStatusProps>
  otpSection?: Partial<IDsOtpSectionProps>
  otpHeader?: Partial<IDsOtpHeaderProps>
}

/**
 * Shared props across both variants
 */
interface BaseOtpVerificationProps
  extends Omit<DsDialogProps, 'slots' | 'onSubmit' | 'slotProps' | 'classes'>,
    Omit<
      DsBottomSheetProps,
      'slots' | 'onSubmit' | 'slotProps' | 'classes' | 'variant'
    > {
  open: boolean
  title: string
  description: string
  showBottomSheet?: boolean
  showConfirmationOnClose?: boolean
  hideHeader?: boolean

  channelId: DsOtpChannelConfig['channelId']
  channelLabel: DsOtpChannelConfig['channelLabel']
  currentResendAttempts: DsOtpChannelConfig['currentResendAttempts']
  maxResendAttempts: DsOtpChannelConfig['maxResendAttempts']

  otpLength?: 4 | 6
  resendTimer?: number
  footerText?: string
  footerIcon?: React.ReactNode
  onResend: (channelId: string) => Promise<void>
  onSubmit: (otps: Record<string, string>) => Promise<{ success: boolean }>
  onClose: () => void
  slots?: Omit<DsOtpVerificationSlots, 'statusContent' | 'otpSection'>
  slotProps?: Omit<DsOtpVerificationSlotProps, 'statusContent' | 'otpSection'>
}

/**
 * Props for single-channel OTP
 */
interface SingleOtpVerificationProps extends BaseOtpVerificationProps {
  variant: 'single' // default
}

/**
 * Props for dual-channel OTP
 */
export interface DualOtpVerificationProps extends BaseOtpVerificationProps {
  variant: 'dual'
  secondaryChannelId: DsOtpChannelConfig['channelId']
  secondaryChannelLabel: DsOtpChannelConfig['channelLabel']
  secondaryCurrentResendAttempts: DsOtpChannelConfig['currentResendAttempts']
  secondaryMaxResendAttempts: DsOtpChannelConfig['maxResendAttempts']
}

/**
 * Combined + generic version
 */
export type DsOtpVerificationProps =
  | SingleOtpVerificationProps
  | DualOtpVerificationProps
