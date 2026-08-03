import type React from 'react'
import type { DsFormControlProps } from '../DsFormControl/DsFormControl.Types'
import type { DsInputBaseProps } from '../DsInputBase/DsInputBase.Types'
import type { DsTagGroupProps } from '../DsTagGroup/DsTagGroup.Types'
import type { DsTagProps } from '../DsTag/DsTag.Types'
import type { DsTypographyProps } from '../DsTypography/DsTypography.Types'

export type DsAmountSuggestionValue = string | number

/** A single quick-pick amount chip rendered below the input. */
export interface DsAmountSuggestion {
  /** Display label shown on the chip (e.g. '₹500'). */
  label: React.ReactNode
  /** Raw value applied to the input when this chip is selected. */
  value: DsAmountSuggestionValue
}

export interface DsAmountInputFieldProps
  extends Omit<DsInputBaseProps, 'size' | 'onChange' | 'ref'> {
  /** Props forwarded to the wrapping DsFormControl (excludes layout/state props managed internally). */
  FormControlProps?: Omit<
    DsFormControlProps,
    'fullWidth' | 'color' | 'error' | 'disabled'
  >
  /** Helper or error text displayed below the input. */
  supportiveText?: string
  /** Props forwarded to the supportive text DsTypography node. */
  SupportiveTextProps?: DsTypographyProps
  /** Renders the input and supportive text in error state when true. */
  error?: boolean
  /** Controls input size: 'small' uses headingBoldExtraLarge typography; 'large' uses displayBoldMedium. */
  size?: 'small' | 'large'
  /** Applies the surfaceSecondary background fill to the input when true. */
  background?: boolean
  /** Quick-pick amount chips shown below the input; selecting one fills the field. */
  suggestions?: Array<DsAmountSuggestion>
  /** Props forwarded to the DsTagGroup wrapping the suggestion chips (excludes value/onChange/children). */
  TagGroupProps?: Omit<DsTagGroupProps, 'children' | 'onChange' | 'value'>
  /** Props forwarded to each individual DsTag chip (excludes label/selected/value). */
  TagProps?: Omit<DsTagProps, 'label' | 'selected' | 'value'>
  /** Currency prefix rendered as a start adornment (default: '₹'). */
  currencySymbol?: string
  /** Formats the raw digits-only value for display. Defaults to en-IN locale grouping (e.g. '100000' → '1,00,000'). */
  currencyFormatter?: (rawValue: string) => string
  /** Called with the field's `name` and the sanitized digits-only value on every change,
   *  whether typed directly or picked from a suggestion chip. */
  onChange?: (name: string, value: string) => void
}

export const DsAmountInputFieldDefaultProps: DsAmountInputFieldProps = {
  size: 'small',
  background: false,
  suggestions: [],
  currencySymbol: '₹',
  fullWidth: true
}
