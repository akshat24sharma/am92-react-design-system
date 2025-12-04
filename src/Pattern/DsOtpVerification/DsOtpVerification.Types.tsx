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
    | 'secondaryOtp'
    | 'footerText'
    | 'footerIcon'
    | 'onResend'
  > {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  otp: string
  setOtp: React.Dispatch<React.SetStateAction<string>>
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

export interface DsOtpVerificationSlots
  extends Pick<DsBottomSheetProps, 'slots'> {
  statusContent?: ElementType<IDsOtpStatusProps>
  otpSection?: ElementType<IDsOtpSectionProps>
  otpHeader?: ElementType<IDsOtpHeaderProps> | null
}

export interface DsOtpVerificationSlotProps
  extends Pick<DsBottomSheetProps, 'slotProps'> {
  statusContent?: Partial<IDsOtpStatusProps>
  otpSection?: Partial<IDsOtpSectionProps>
  otpHeader?: Partial<IDsOtpHeaderProps>
}

export interface DsOtpVerificationProps
  extends Omit<DsDialogProps, 'slots' | 'onSubmit' | 'slotProps' | 'classes'>,
    Omit<DsBottomSheetProps, 'slots' | 'onSubmit' | 'slotProps' | 'classes'> {
  /**
   * Controls whether the OTP verification dialog/bottom sheet is open.
   */
  open: boolean

  /**
   * Title shown in the dialog or bottom sheet.
   */
  title: string

  /**
   * Description shown under the title.
   */
  description: string

  /**
   * Whether to use bottom sheet layout.
   * Defaults to false.
   */
  showBottomSheet?: boolean

  /**
   * Whether to show a confirmation dialog when the user tries to close.
   */
  showConfirmationOnClose?: boolean

  /**
   * Whether to hide header when bottomsheet layout is used
   */
  hideHeader?: boolean

  /**
   * Unique identifier for the OTP channel (e.g., phone or email).
   */
  channelId: DsOtpChannelConfig['channelId']

  /**
   * Display label for the OTP channel (e.g., "+91 ******6326" or "su****@gmail.com").
   */
  channelLabel: DsOtpChannelConfig['channelLabel']

  /**
   * Number of times the user has attempted to resend OTP so far.
   */
  currentResendAttempts: DsOtpChannelConfig['currentResendAttempts']

  /**
   * Maximum number of allowed OTP resend attempts.
   */
  maxResendAttempts: DsOtpChannelConfig['maxResendAttempts']

  /**
   * Secondary OTP configuration.
   * Used when a secondary channel (e.g., email + phone) also requires OTP verification.
   */
  secondaryOtp?: DsOtpChannelConfig

  /**
   * Length of the OTP.
   * Defaults to 6. Can also be 4.
   */
  otpLength?: 4 | 6

  /**
   * Timer in seconds before the user can request OTP resend again.
   * Defaults to 30 seconds.
   */
  resendTimer?: number

  /**
   * Callback to request OTP resend.
   * Receives the `channelId` and must return a promise.
   */
  onResend: (channelId: string) => Promise<void>

  /**
   * Text displayed at the footer of the OTP section.
   * Defaults to "Powered by RBI regulated Account Aggregator".
   */
  footerText?: string

  /**
   * Optional icon shown at the footer alongside `footerText`.
   */
  footerIcon?: React.ReactNode

  /**
   * Callback when the OTP is submitted.
   * Receives an object with `channelId` as key and OTP string as value.
   * Must return a promise resolving `{ success: boolean }`.
   */
  onSubmit: (otps: Record<string, string>) => Promise<{ success: boolean }>

  /**
   * Callback invoked when the user closes the dialog/bottom sheet.
   */
  onClose: () => void

  /**
   * Slots for overriding specific sections of the OTP component.
   * Example usage:
   * slots={{ otpHeader: CustomHeader, otpSection: CustomOtpInput }}
   */
  slots?: Omit<DsOtpVerificationSlots, 'statusContent' | 'otpSection'>

  /**
   * Props for the slots, used to customize behavior or data.
   * Example usage:
   * slotProps={{ otpHeader: { appBarTitle: 'Cards' } }}
   */
  slotProps?: Omit<DsOtpVerificationSlotProps, 'statusContent' | 'otpSection'>

}
