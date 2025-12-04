import type { StatusDetailType } from './DsOtpVerification.Types'

import { CONFIRM_CLOSE, OTP_EXHAUST, SUCCESS } from '../Assets/HOME_IMAGE'

// Default status map
export const DEFAULT_STATUS_MAP: Record<string, StatusDetailType> = {
  INCORRECT_OTP: {
    type: 'message',
    message: 'Incorrect OTP. You have only -- attempts left'
  },
  LIMIT_EXHAUSTED: {
    type: 'fullPage',
    image: { srcSet: OTP_EXHAUST },
    title: 'OTP attempts exhausted.',
    primaryButtonText: 'Go Back'
  },
  RESEND_LIMIT: {
    type: 'fullPage',
    image: { srcSet: OTP_EXHAUST },
    title: 'You have exhausted the maximum resend attempts.',
    primaryButtonText: 'Go Back'
  },
  SUCCESS: {
    type: 'fullPage',
    image: { srcSet: SUCCESS },
    title: 'OTP verification successful!'
  },
  DEFAULT: {
    type: 'message',
    message: 'Something went wrong. Please try again.'
  }
}

// Confim close screen data
// primary btn will always close the pattern component
// secondary will take back to otp screen
export const CONFIRM_CLOSE_DETAIL: StatusDetailType = {
  type: 'fullPage',
  image: { srcSet: CONFIRM_CLOSE },
  title: 'Cancel transaction?',
  description: 'Going back will cancel all your ongoing transactions.',
  primaryButtonText: 'Yes, Cancel',
  secondaryBtnText: 'No, Go Back',
  // TODO: rename this key
  isDialogOnMobile: true
}
