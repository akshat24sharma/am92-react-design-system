import React from 'react'

import { DatePickerToolbarProps, usePickerContext, usePickerTranslations } from '@mui/x-date-pickers'
import { useUtils } from '@mui/x-date-pickers/internals'
import {
  DsStack,
  DsTypography,
  DsIconButton,
  DsRemixIcon
} from '../../../Components'

export const DefaultToolbar = React.forwardRef(function DatePickerToolbar(
  inProps: DatePickerToolbarProps,
  ref: React.Ref<HTMLDivElement>
) {
  const { value, cancelValueChanges } = usePickerContext()

  const translations = usePickerTranslations()
  const utils = useUtils()
  const dateText =
    (value && `: ${utils.formatByString(value, utils.formats.fullDate)}`) || ''

  return (
    <DsStack
      sx={{
        backgroundColor: 'var(--ds-colour-surfaceSecondary)',
        padding: 'var(--ds-spacing-cool) var(--ds-spacing-bitterCold)',
        gridArea: '1 / 2 / auto / 4',
        borderRadius: '16px 16px 0px 0px',
        borderBottom: '1px solid var(--ds-colour-strokeDefault)'
      }}
    >
      <DsTypography
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        variant="headingBoldExtraSmall"
      >
        {`${translations.datePickerToolbarTitle}${dateText}`}
        <DsIconButton onClick={cancelValueChanges}>
          <DsRemixIcon className="ri-close-line" />
        </DsIconButton>
      </DsTypography>
    </DsStack>
  )
})