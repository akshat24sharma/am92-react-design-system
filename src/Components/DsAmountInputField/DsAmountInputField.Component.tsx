import { forwardRef, useState } from 'react'
import { DsFormControl } from '../DsFormControl/DsFormControl.Component'
import { DsInputBase } from '../DsInputBase/DsInputBase.Component'
import { DsStack } from '../DsStack/DsStack.Component'
import { DsTag } from '../DsTag/DsTag.Component'
import { DsTagGroup } from '../DsTagGroup/DsTagGroup.Component'
import { DsTypography } from '../DsTypography/DsTypography.Component'
import {
  DsAmountInputFieldDefaultProps,
  type DsAmountInputFieldProps
} from './DsAmountInputField.Types'
import { defaultCurrencyFormatter, getSanitizedDigits } from './helpers'

export const DsAmountInputField = forwardRef<
  HTMLDivElement,
  DsAmountInputFieldProps
>((inProps, ref) => {
  const props = { ...DsAmountInputFieldDefaultProps, ...inProps }

  const {
    color,
    supportiveText,
    error,
    sx,
    size,
    fullWidth,
    inputRef,
    disabled,
    required,
    FormControlProps,
    SupportiveTextProps,
    suggestions = [],
    TagGroupProps,
    TagProps,
    background,
    currencySymbol,
    currencyFormatter = defaultCurrencyFormatter,
    onChange,
    value,
    defaultValue,
    name,
    ...InputBaseProps
  } = props

  const isSizeSmall = size === 'small'
  // Controlled when parent passes `value`; otherwise component manages its own state.
  const isControlled = value !== undefined

  // Raw digits-only value for uncontrolled mode
  const [uncontrolledInputValue, setUncontrolledInputValue] = useState(
    getSanitizedDigits(defaultValue)
  )

  const inputValue = isControlled
    ? getSanitizedDigits(value)
    : uncontrolledInputValue

  // Display value shown in the field, formatted via the currency formatter
  const formattedInputValue = currencyFormatter(inputValue)

  // Highlights a suggestion chip if the current input matches one of its values
  const selectedSuggestion =
    suggestions.find(({ value }) => `${value}` === inputValue)?.value ?? ''

  const typographyStyles = isSizeSmall
    ? {
        fontSize: 'var(--ds-typo-headingBoldExtraLarge-fontSize)',
        fontWeight: 'var(--ds-typo-headingBoldExtraLarge-fontWeight)',
        lineHeight: 'var(--ds-typo-headingBoldExtraLarge-lineHeight)',
        letterSpacing: 'var(--ds-typo-headingBoldExtraLarge-letterSpacing)'
      }
    : {
        fontSize: 'var(--ds-typo-displayBoldMedium-fontSize)',
        fontWeight: 'var(--ds-typo-displayBoldMedium-fontWeight)',
        lineHeight: 'var(--ds-typo-displayBoldMedium-lineHeight)',
        letterSpacing: 'var(--ds-typo-displayBoldMedium-letterSpacing)'
      }

  // Strips non-digit characters, updates local state, and notifies the consumer's onChange
  // with the field's `name` and the sanitized (unformatted) value so external state
  // always stores a plain number string.
  const handleValueChange = (value: string) => {
    const sanitizedValue = value.replace(/\D/g, '')

    // Only mutate local state in uncontrolled mode.
    if (!isControlled) {
      setUncontrolledInputValue(sanitizedValue)
    }

    onChange?.(name ?? '', sanitizedValue)
  }

  // Picking a suggestion chip. DsTagGroup's onChange value is typed as `any`,
  // but since it's always rendered with multi={false} below, the value is
  // always a single string/number, never an array. The first arg is the
  // DsTagGroup's own name, not this field's name, so it's ignored here.
  const handleSuggestionChange = (_: string, value: string) => {
    handleValueChange(`${value}`)
  }

  return (
    <DsFormControl
      {...FormControlProps}
      fullWidth={fullWidth}
      color={error ? 'error' : color}
      error={error}
      disabled={disabled}
      required={required}
    >
      <DsStack
        sx={{
          padding: 'var(--ds-spacing-glacial)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <DsInputBase
          type='tel'
          inputMode='tel'
          placeholder='0'
          {...InputBaseProps}
          ref={ref}
          inputRef={inputRef}
          name={name}
          value={formattedInputValue}
          onChange={event => handleValueChange(event.target.value)}
          startAdornment={
            <DsTypography
              variant={
                isSizeSmall ? 'headingBoldMedium' : 'headingBoldExtraLarge'
              }
              sx={{ color: 'var(--ds-colour-typoTertiary)' }}
            >
              {currencySymbol}
            </DsTypography>
          }
          inputProps={{
            // Auto-size the native input to the number of characters typed
            // (falls back to placeholder '0') so it hugs the currency adornment
            size: Math.max((formattedInputValue || '0').length, 1),
            ...InputBaseProps.inputProps
          }}
          sx={{
            border: 'none',
            minWidth: '200px',
            '&:hover:not(.Mui-disabled)': {
              background: 'var(--ds-colour-stateSelectedPrimaryHover)'
            },
            ...sx,
            padding: isSizeSmall
              ? 'var(--ds-spacing-glacial)'
              : 'var(--ds-spacing-bitterCold)',
            borderRadius: isSizeSmall
              ? 'var(--ds-radius-glacial)'
              : 'var(--ds-radius-frostbite)',
            background: background
              ? 'var(--ds-colour-surfaceSecondary)'
              : 'transparent',
            justifyContent: 'center',
            '& > :first-of-type + *': {
              margin: 'var(--ds-spacing-zero)',
              padding: 'var(--ds-spacing-zero)'
            },
            '& .MuiInputBase-input': {
              textAlign: 'center',
              width: 'auto',
              height: 'auto',
              ...typographyStyles
            }
          }}
        />

        {/* Optional helper/error text below the input */}
        {supportiveText && (
          <DsTypography
            variant={isSizeSmall ? 'bodyRegularSmall' : 'bodyRegularLarge'}
            {...SupportiveTextProps}
            sx={{
              ...SupportiveTextProps?.sx,
              mt: isSizeSmall
                ? 'var(--ds-spacing-quickFreeze)'
                : 'var(--ds-spacing-glacial)',
              color: error
                ? 'var(--ds-colour-supportNegative)'
                : 'var(--ds-colour-typoSecondary)'
            }}
          >
            {supportiveText}
          </DsTypography>
        )}

        {/* Quick-pick amount chips; selecting one fills the input via handleSuggestionChange */}
        {!!suggestions.length && (
          <DsStack
            sx={{
              width: '100%',
              overflowX: 'auto',
              mt: isSizeSmall
                ? 'var(--ds-spacing-bitterCold)'
                : 'var(--ds-spacing-cool)'
            }}
          >
            <DsTagGroup
              {...TagGroupProps}
              name={TagGroupProps?.name ?? 'amount-suggestions'}
              multi={false}
              value={selectedSuggestion}
              onChange={handleSuggestionChange}
              sx={{
                ...TagGroupProps?.sx,
                marginInline: 'auto'
              }}
            >
              {suggestions.map(({ value, label }) => (
                <DsTag
                  key={value}
                  value={`${value}`}
                  label={label}
                  selected={`${value}` === `${selectedSuggestion}`}
                  disabled={disabled}
                  {...TagProps}
                />
              ))}
            </DsTagGroup>
          </DsStack>
        )}
      </DsStack>
    </DsFormControl>
  )
})

DsAmountInputField.displayName = 'DsAmountInputField'
