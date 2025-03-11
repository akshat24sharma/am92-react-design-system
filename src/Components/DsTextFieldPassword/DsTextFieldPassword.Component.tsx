import React, { Component, FC, useState } from 'react'
import PropTypes from 'prop-types'

import { DsInputAdornment } from '../DsInputAdornment'
import { DsTextField } from '../DsTextField'
import { DsButton } from '../DsButton'

import {
  DsTextFieldPasswordDefaultProps,
  DsTextFieldPasswordProps,
  DsTextFieldPasswordState
} from './DsTextFieldPassword.Types'

export const DsTextFieldPassword: FC<
  DsTextFieldPasswordProps
> = (props) => {
  const [isVisible, setIsVisible] = useState<DsTextFieldPasswordState['isVisible']>(false)

  const getMergedProps = (): DsTextFieldPasswordProps => {
    return { ...DsTextFieldPasswordDefaultProps, ...props }
  }

  const handleTogglePassword = (): void =>
    setIsVisible(!isVisible)

    const mergedProps = getMergedProps()
    const {
      type,
      isVisible: isVisibleProp,
      disabled,
      toggleNode,
      ...restProps
    } = mergedProps

    const inputType = (isVisible && type) || 'password'

    const endAdornment = isVisible
      ? React.cloneElement(toggleNode?.toHide || <></>, { disabled })
      : React.cloneElement(toggleNode?.toShow || <></>, { disabled })

    return (
      <DsTextField
        {...restProps}
        disabled={disabled}
        type={inputType}
        endAdornment={
          <DsInputAdornment
            position="end"
            onClick={(!disabled && handleTogglePassword) || undefined}
          >
            {endAdornment}
          </DsInputAdornment>
        }
      />
    )
  
}
