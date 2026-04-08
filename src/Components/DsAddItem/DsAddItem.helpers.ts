import { DEFAULT_STEP_VALUE } from './DsAddItem.Types'

export type DsAddItemOperation = 'add' | 'subtract'

export const isBelowMinValue = (value: number, minValue?: number): boolean => {
  return minValue !== undefined && value < minValue
}

export const calculateNewValue = (
  countValue: number,
  step: number | undefined,
  operation: DsAddItemOperation
): number => {
  const stepValue = step ?? DEFAULT_STEP_VALUE
  return operation === 'add' ? countValue + stepValue : countValue - stepValue
}