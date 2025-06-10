import React, {
  CSSProperties,
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'

import { DsBox } from '../DsBox'
import { DsStack } from '../DsStack'
import { DsInputLabel } from '../DsInputLabel'
import { DsTextField } from '../DsTextField'
import { DsHelperText } from '../DsHelperText'
import { DsOtpDefaultProps, DsOtpProps } from './DsOtp.Types'

const KEY_CODES = {
  BACK_SPACE: 'Backspace'
}

export const DsOtp: FC<DsOtpProps> = (inProps) => {
  const props = { ...DsOtpDefaultProps, ...inProps}
  const optInputRefs = new Map()
  const { initialOtp = '', length } = props
  const [otp, setOtp] = useState(initialOtp ? [...initialOtp].slice(0, length) : [])

  const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { onFocus } = props
    const { target } = event
    target.select()
    if (typeof onFocus === 'function') {
      onFocus(event)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { onKeyDown } = props
    const { key, currentTarget } = event
    const { name, value } = currentTarget
    const indexString = name.split('.').pop() || ''
    const index = parseInt(indexString, 10)

    // Call _handleNavigation on back button pressed
    if (key === KEY_CODES.BACK_SPACE && !value) {
      _handleNavigation(index, true)
    }

    if (typeof onKeyDown === 'function') {
      onKeyDown(event)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, onComplete, length } = props
    const { target } = event
    const { name, value = '' } = target
    const indexString = name.split('.').pop() || ''
    const index = parseInt(indexString, 10)

    // Check if valid value
    const filteredValue = value.replace(/\D/g, '').charAt(0) || ''
    otp[index] = filteredValue

    const shouldNavigate = filteredValue
    const _this = this
    setOtp([...otp])
      if (shouldNavigate) {
        _handleNavigation(index, false)
      }

      if (typeof onChange === 'function') {
        onChange(event)
      }

      const otpString = otp.join('')
      if (otpString.length === length && typeof onComplete === 'function') {
        onComplete(otpString)
      }
  }

  const _handleNavigation = (index: number, isBackPressed?: boolean): void => {
    const nextFocussedIndex = isBackPressed ? --index : ++index
    const nextFocussedInput = optInputRefs.get(nextFocussedIndex)
    if (nextFocussedInput) {
      nextFocussedInput.focus()
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { onPaste, onComplete, length } = props
    const { clipboardData, currentTarget } = event

    const pastedData = clipboardData.getData('text')
    const filteredValue = pastedData.replace(/\D/g, '') || ''
    const otp = filteredValue.split('').slice(0, length)

    setOtp(otp)
    currentTarget.blur()
    const focusIndex = otp.length - 1
    _handleNavigation(focusIndex)

    if (typeof onPaste === 'function') {
      onPaste(event)
    }

    const otpString = otp.join('')
    if (otpString.length === length && typeof onComplete === 'function') {
      onComplete(otpString)
    }
  }

  const resetOtpValues = () => {
    setOtp([])
  }

  const renderOtpBoxes = () => {
    const {
      label,
      labelSupportText,
      name,
      length,
      helperText,
      inputProps = {},
      HelperTextProps,
      BoxProps,
      InputLabelProps,
      ...restProps
    } = props
    const lengthArray = Array(length).fill('')

    const otpInputProps = {
      ...inputProps,
      maxLength: '1',
      style: {
        ...inputProps.style,
        textAlign: 'center'
      } as CSSProperties
    }

    return lengthArray.map((value, index) => (
      <DsTextField
        key={index}
        type="tel"
        inputMode="tel"
        {...restProps}
        name={`${name}.${index}`}
        ds-variant="otp"
        inputProps={otpInputProps}
        onPaste={handlePaste}
        onFocus={handleFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={otp[index] || ''}
        inputRef={ref => {
          optInputRefs.set(index, ref)
        }}
      />
    ))
  }

  const {
    id,
    name,
    label,
    labelSupportText,
    helperText,
    success,
    color,
    error,
    inputProps,
    disabled,
    InputLabelProps,
    HelperTextProps,
    BoxProps
  } = props

  return (
    <DsBox ref={domRef} {...BoxProps}>
      <DsInputLabel
        label={label}
        labelSupportText={labelSupportText}
        // error={error}
        success={success}
        htmlFor={id || name}
        disabled={disabled}
        {...InputLabelProps}
      />
      <DsStack direction='row' spacing='var(--ds-spacing-glacial)' style={{}}>
        {renderOtpBoxes()}
      </DsStack>
      <DsHelperText
        helperText={helperText}
        color={color}
        success={success}
        error={error}
        {...HelperTextProps}
      />
    </DsBox>
  )
})
