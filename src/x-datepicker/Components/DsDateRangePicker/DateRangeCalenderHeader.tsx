import React from 'react'

import { useThemeProps } from '@mui/system'
import type { DateView, PickersCalendarHeaderProps } from '@mui/x-date-pickers'
import { useUtils } from '@mui/x-date-pickers/internals'
import { DsButtonBase, DsIconButton, DsRemixIcon, DsStack, DsTypography } from '../../../Components'

export const DateRangeCalenderHeader = React.forwardRef(
  function PickersCalendarHeader(inProps: PickersCalendarHeaderProps) {
    const utils = useUtils()

    const props = useThemeProps({
      props: inProps,
      name: 'MuiPickersCalendarHeader'
    })

    const { currentMonth, view } = props

    const handleMonthChange = (numberOfMonths: 1 | -1 | 12 | -12) => () => {
      const { currentMonth, onMonthChange } = props
      onMonthChange(utils.addMonths(currentMonth, numberOfMonths))
    }

    const handleViewShow = (view: DateView) => () => {
      const { onViewChange } = props
      onViewChange && onViewChange(view)
    }

    const isYearNavigationDisabled = view === 'month'
    const isMonthNavigationDisabled = view === 'year'

    return (
      <DsStack
        direction='row'
        justifyContent='space-between'
        sx={{ p: 'var(--ds-spacing-frostbite)' }}
      >
        <DsStack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing='var(--ds-spacing-frostbite)'
        >
          <DsIconButton
            disabled={isYearNavigationDisabled || isMonthNavigationDisabled}
            onClick={handleMonthChange(-1)}
          >
            <DsRemixIcon className='ri-arrow-drop-left-line' />
          </DsIconButton>
          <DsButtonBase
            disabled={isMonthNavigationDisabled}
            onClick={handleViewShow('month')}
          >
            <DsTypography
              variant='bodyBoldSmall'
              color={
                isMonthNavigationDisabled ? 'text.disabled' : 'text.primary'
              }
            >
              {utils.formatByString(currentMonth, utils.formats.monthShort)}
            </DsTypography>
            <DsRemixIcon
              className='ri-arrow-drop-down-fill'
              color={isMonthNavigationDisabled ? 'iconDisabled' : 'iconDefault'}
              sx={{ mr: 'var(--ds-spacing-quickFreeze)' }}
            />
          </DsButtonBase>
          <DsIconButton
            disabled={isYearNavigationDisabled || isMonthNavigationDisabled}
            onClick={handleMonthChange(1)}
          >
            <DsRemixIcon className='ri-arrow-drop-right-line' />
          </DsIconButton>
        </DsStack>
        <DsStack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing='var(--ds-spacing-frostbite)'
        >
          <DsIconButton
            disabled={isYearNavigationDisabled || isMonthNavigationDisabled}
            onClick={handleMonthChange(-12)}
          >
            <DsRemixIcon className='ri-arrow-drop-left-line' />
          </DsIconButton>
          <DsButtonBase
            disabled={isYearNavigationDisabled}
            onClick={handleViewShow('year')}
          >
            <DsTypography
              variant='bodyBoldSmall'
              color={
                isYearNavigationDisabled ? 'text.disabled' : 'text.primary'
              }
            >
              {utils.formatByString(currentMonth, utils.formats.year)}
            </DsTypography>
            <DsRemixIcon
              className='ri-arrow-drop-down-fill'
              color={isYearNavigationDisabled ? 'iconDisabled' : 'iconDefault'}
              sx={{ mr: 'var(--ds-spacing-quickFreeze)' }}
            />
          </DsButtonBase>
          <DsIconButton
            disabled={isYearNavigationDisabled || isMonthNavigationDisabled}
            onClick={handleMonthChange(12)}
          >
            <DsRemixIcon className='ri-arrow-drop-right-line' />
          </DsIconButton>
        </DsStack>
      </DsStack>
    )
  }
)
