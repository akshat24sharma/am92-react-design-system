import React from 'react'

import { DatePickerToolbarProps, usePickerTranslations } from '@mui/x-date-pickers'
import { useUtils } from '@mui/x-date-pickers/internals'
import { useThemeProps } from '@mui/system'
import {
  DsStack,
  DsTypography,
  DsIconButton,
  DsRemixIcon
} from '../../../Components'

export const DefaultToolbar = React.forwardRef(function DatePickerToolbar(
  inProps: DatePickerToolbarProps & { ownerState?: any },
  ref: React.Ref<HTMLDivElement>
) {
  const props = useThemeProps({ props: inProps, name: 'MuiDatePickerToolbar' })
  const { ownerState } = props
  const { value, onCancel } = ownerState

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
        <DsIconButton onClick={onCancel}>
          <DsRemixIcon className="ri-close-line" />
        </DsIconButton>
      </DsTypography>
    </DsStack>
  )
})
