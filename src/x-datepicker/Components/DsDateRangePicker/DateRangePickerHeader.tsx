import React from 'react'

import { useThemeProps } from '@mui/system'
import {
  usePickerActionsContext,
  usePickerTranslations
} from '@mui/x-date-pickers'
import { useUtils } from '@mui/x-date-pickers/internals'

import type { IDateRangePickerHeaderProps } from './DsDateRangePicker.Types'
import { DsButtonBase, DsIconButton, DsRemixIcon, DsStack, DsTypography } from '../../../Components'

export const DateRangePickerHeader = React.forwardRef(
  function DatePickerToolbar<TDate extends Date>(
    inProps: IDateRangePickerHeaderProps<TDate>,
    ref: React.Ref<HTMLDivElement>
  ) {
    const props = useThemeProps({
      props: inProps,
      name: 'MuiDatePickerToolbar'
    })

    const { startDate, endDate, activeField, onFieldChange } = props
    const { cancelValueChanges } = usePickerActionsContext()

    const translations = usePickerTranslations()
    const utils = useUtils()

    return (
      <DsStack
        ref={ref}
        sx={{
          gridArea: '1 / 2 / auto / 4',
          borderBottom: '1px solid var(--ds-colour-strokeDefault)'
        }}
      >
        <DsStack
          sx={{
            borderRadius:
              'var(--ds-spacing-bitterCold) var(--ds-spacing-bitterCold) var(--ds-spacing-zero) var(--ds-spacing-zero)',
            backgroundColor: 'var(--ds-colour-surfaceSecondary)',
            padding: 'var(--ds-spacing-cool) var(--ds-spacing-bitterCold)'
          }}
        >
          <DsTypography
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
            variant='headingBoldExtraSmall'
          >
            {translations.datePickerToolbarTitle}
            <DsIconButton onClick={cancelValueChanges}>
              <DsRemixIcon className='ri-close-line' />
            </DsIconButton>
          </DsTypography>
        </DsStack>
        <DsStack
          direction='row'
          sx={{
            width: '100%',
            borderTop: '1px solid var(--ds-colour-strokeDefault)'
          }}
        >
          <DsButtonBase
            onClick={() => onFieldChange('start')}
            sx={{
              flex: 1,
              justifyContent: 'flex-start',
              py: 'var(--ds-spacing-bitterCold)',
              pl: 'var(--ds-spacing-bitterCold)',
              borderBottom:
                activeField === 'start'
                  ? '1px solid var(--ds-colour-actionSecondary)'
                  : undefined,
              backgroundColor:
                activeField === 'start'
                  ? 'var(--ds-colour-surfacePrimary) !important'
                  : 'var(--ds-colour-surfaceSecondary) !important',
              borderRadius: 0
            }}
          >
            <DsTypography
              color='var(--ds-colour-typoPrimary)'
              variant='bodyBoldSmall'
              sx={{
                marginRight: 'var(--ds-spacing-glacial)'
              }}
            >
              Start
            </DsTypography>
            <DsTypography
              variant='bodyBoldSmall'
              color='var(--ds-colour-typoPrimary)'
            >
              {startDate
                ? utils.formatByString(startDate, utils.formats.fullDate)
                : 'Pick a Date'}
            </DsTypography>
          </DsButtonBase>

          <DsButtonBase
            onClick={() => startDate && onFieldChange('end')}
            sx={{
              flex: 1,
              justifyContent: 'flex-start',
              py: 'var(--ds-spacing-bitterCold)',
              pl: 'var(--ds-spacing-bitterCold)',
              borderBottom:
                activeField === 'end'
                  ? '1px solid var(--ds-colour-actionSecondary)'
                  : undefined,
              backgroundColor: startDate
                ? activeField === 'end'
                  ? 'var(--ds-colour-surfacePrimary) !important'
                  : 'var(--ds-colour-surfaceSecondary) !important'
                : 'var(--ds-colour-stateDisabledSurface)',
              borderRadius: 0,
              '&.MuiButton-containedPrimary:disabled': {
                backgroundColor: 'var(--ds-colour-stateDisabledSurface)'
              }
            }}
            disabled={!startDate}
          >
            <DsTypography
              variant='bodyBoldSmall'
              color='var(--ds-colour-typoPrimary)'
              sx={{
                marginRight: 'var(--ds-spacing-glacial)'
              }}
            >
              End
            </DsTypography>
            <DsTypography
              variant='bodyBoldSmall'
              color='var(--ds-colour-typoPrimary)'
            >
              {endDate
                ? utils.formatByString(endDate, utils.formats.fullDate)
                : 'Pick a Date'}
            </DsTypography>
          </DsButtonBase>
        </DsStack>
      </DsStack>
    )
  }
)
