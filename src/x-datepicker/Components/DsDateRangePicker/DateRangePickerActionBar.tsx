import {
  usePickerActionsContext,
  usePickerContext,
  usePickerTranslations
} from '@mui/x-date-pickers'

import type { IDateRangePickerActionBarProps } from './DsDateRangePicker.Types'
import { DsButton, DsButtonGroup } from '../../../Components'

export function DateRangePickerActionBar(
  props: IDateRangePickerActionBarProps
) {
  const { acceptValueChanges } = usePickerActionsContext()
  const { view } = usePickerContext()
  const { startDate, endDate, onClear } = props

  const actions = view === 'day' ? ['clear', 'accept'] : []

  if (actions == null || actions?.length === 0) {
    return null
  }

  const translations = usePickerTranslations()

  const isClearVisible = actions.includes('clear')
  const isConfirmVisible = actions.includes('accept')

  return (
    <DsButtonGroup
      sx={{
        gridArea: '3 / 1 / auto / 4',
        backgroundColor: 'var(--ds-colour-surfaceSecondary)',
        px: 'var(--ds-spacing-mild)',
        borderTop: '1px solid var(--ds-colour-strokeDefault)',
        borderRadius:
          'var(--ds-spacing-zero) var(--ds-spacing-zero) var(--ds-spacing-bitterCold) var(--ds-spacing-bitterCold) '
      }}
      justifyContent='space-between'
      size='medium'
    >
      {isClearVisible && (
        <DsButton
          sx={{
            py: 'var(--ds-spacing-glacial)',
            px: 'var(--ds-spacing-pleasant)'
          }}
          variant='text'
          size='medium'
          color='secondary'
          onClick={onClear}
          disabled={!startDate}
        >
          {translations.clearButtonLabel}
        </DsButton>
      )}
      {isConfirmVisible && (
        <DsButton
          sx={{
            py: 'var(--ds-spacing-glacial)',
            px: 'var(--ds-spacing-pleasant)'
          }}
          variant='text'
          size='medium'
          color='secondary'
          onClick={acceptValueChanges}
          disabled={!startDate || !endDate}
        >
          {translations.okButtonLabel}
        </DsButton>
      )}
    </DsButtonGroup>
  )
}
