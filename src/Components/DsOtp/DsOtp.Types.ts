import { DsBoxProps } from '..'
import { DsTextFieldProps } from '../DsTextField'

export interface DsOtpProps extends DsTextFieldProps {
  onComplete: (otpString: string) => void
  name?: string
  length?: number
  initialOtp?: string
  BoxProps?: DsBoxProps
}

export const DsOtpDefaultProps: DsOtpProps = {
  name: 'otp',
  length: 6,
  onComplete: () => undefined
}

export type DsOtpRef = {
  resetOtpValues: () => void
  focusIndex: () => void
}
export interface DsOtpState {
  otp: string[]
}

export const DsOtpDefaultState = {
  otp: []
}
