import React, { FC, useEffect, useRef, useState } from 'react'
import { DsFormControl } from '../DsFormControl'
import { DsTextField } from '../DsTextField'
import { DsTypography } from '../DsTypography'
import {
  DsTextAreaProps,
  DsTextAreaState
} from './DsTextArea.Types'

export const DsTextArea: FC<
  DsTextAreaProps
> = (props) => {
  const [count, setCount] = useState<DsTextAreaState['count']>(0)
  const areRef = useRef()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = props
    const { target } = event
    const { value = '' } = target
    let count = value?.length
    setCount(count)

    if (onChange && typeof onChange === 'function') {
      onChange(event)
    }
  }

  useEffect(() => {
    const { value = '' } = props
    const count = (value as string)?.length
    setCount(count)
  }, [])

  useEffect(() => {
    const { value } = props
    const stringCount = (value as string)?.length
    if (stringCount && count !== count) {
      setCount(stringCount)
    }
  }, [count, props.value])

    const {
      maxLength,
      hideCharacterCount,
      helperText,
      inputProps,
      ref,
      fullWidth,
      ...rest
    } = props

    // Provide counter if MaxLength Provided
    const hasMaxLength = !!maxLength
    const maxLengthHandlingInputStyle = hasMaxLength
      ? { mb: 'var(--ds-spacing-bittercold)' }
      : {}

    const counterStyle = {
      position: 'absolute',
      bottom: '8px',
      right: '8px',
      overflow: 'auto'
    }

    if (helperText) {
      // Adjust the helper text size
      counterStyle.bottom = 'calc(8px + 36px)'
    }
    return (
      <DsFormControl fullWidth={fullWidth}>
        <DsTextField
          maxRows={3}
          minRows={3}
          {...rest}
          fullWidth={fullWidth}
          onChange={handleChange}
          multiline
          inputProps={{
            ref: ref || areRef,
            ...inputProps,
            sx: {
              minWidth: '288px',
              ...maxLengthHandlingInputStyle,
              ...inputProps?.sx
            },
            maxLength: maxLength || ''
          }}
          helperText={helperText}
          // TODO: To be fixed when we fix the sx passing to inputbase
          style={{
            paddingBottom: 'var(--ds-spacing-mild)',
            ...rest?.style
          }}
        />
        {hasMaxLength && !hideCharacterCount && (
          <DsTypography
            sx={counterStyle}
            variant="supportRegularFootnote"
          >{`${count}/${maxLength}`}</DsTypography>
        )}
      </DsFormControl>
    )
}
