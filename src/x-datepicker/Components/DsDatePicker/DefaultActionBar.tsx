import { usePickerTranslations, usePickerContext } from '@mui/x-date-pickers'
import { DsButtonGroup, DsButton } from '../../../Components'

export const DefaultActionBar = () => {
  const { clearValue, acceptValueChanges, value, view } = usePickerContext()

  const actions = view === 'day' ? ['clear', 'accept'] : [];

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
        borderRadius: '0px 0px 16px 16px '
      }}
      justifyContent="space-between"
      size="medium"
    >
      {isClearVisible && (
        <DsButton
          sx={{
            py: 'var(--ds-spacing-glacial)',
            px: 'var(--ds-spacing-pleasant)'
          }}
          variant="text"
          size="medium"
          color="secondary"
          onClick={clearValue}
          disabled={!value}
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
          variant="text"
          size="medium"
          color="secondary"
          onClick={acceptValueChanges}
          disabled={!value}
        >
          {translations.okButtonLabel}
        </DsButton>
      )}
    </DsButtonGroup>
  )
}

DefaultActionBar.displayName = 'DefaultActionBar'