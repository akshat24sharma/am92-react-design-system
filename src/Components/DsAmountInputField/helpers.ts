const DS_EN_IN_NUMBER_FORMATTER = new Intl.NumberFormat('en-IN')

// Default display formatter for DsAmountInputField: formats a digits-only
// string as a locale-grouped number (e.g. "100000" -> "1,00,000" for en-IN).
// Falls back to the raw value if it isn't numeric, and to '' when empty.
export const defaultCurrencyFormatter = (rawValue: string): string => {
  if (!rawValue) {
    return ''
  }

  const asNumber = Number(rawValue)
  if (Number.isNaN(asNumber)) {
    return rawValue
  }

  return DS_EN_IN_NUMBER_FORMATTER.format(asNumber)
}

// Normalizes unknown input into a digits-only string.
// Accepts string/number and strips all non-digit characters.
export const getSanitizedDigits = (nextValue: unknown): string => {
  if (typeof nextValue === 'string' || typeof nextValue === 'number') {
    return String(nextValue).replace(/\D/g, '')
  }

  return ''
}
