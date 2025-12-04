import { PickersDay } from '@mui/x-date-pickers'
import { isAfter, isSameDay, isWithinInterval } from 'date-fns'

import type { IDateRangePickerDayProps } from './DsDateRangePicker.Types'
import { DsBox } from '../../../Components'

export const DateRangePickerDay = ({
  day,
  startDate,
  endDate,
  onDateClick,
  activeField,
  ...other
}: IDateRangePickerDayProps) => {
  const isStart = !!startDate && isSameDay(day, startDate)
  const isEnd = !!endDate && isSameDay(day, endDate)
  const isSingleDay = isStart && isEnd
  const isInRange =
    startDate && endDate && !isAfter(startDate, endDate)
      ? isWithinInterval(day, { start: startDate, end: endDate })
      : false

  const isToday = isSameDay(day, new Date())

  let background: string | undefined

  if (isSingleDay) {
    background = 'var(--ds-colour-stateSelectedPrimaryHover)'
  } else if (isStart) {
    background =
      'linear-gradient(to left, var(--ds-colour-stateSelectedPrimaryHover) 50%, transparent 50%)'
  } else if (isEnd) {
    background =
      'linear-gradient(to right, var(--ds-colour-stateSelectedPrimaryHover) 50%, transparent 50%)'
  } else if (isInRange) {
    background = 'var(--ds-colour-stateSelectedPrimaryHover)'
  }

  const resolvedBackground = startDate && !endDate ? 'none' : background

  return (
    <DsBox
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        background: resolvedBackground
      }}
    >
      <PickersDay
        {...other}
        day={day}
        onClick={() => onDateClick(day, activeField)}
        selected={isStart || isEnd}
        sx={{
          ...(isToday && {
            borderRadius: '50%'
          })
        }}
      />
    </DsBox>
  )
}
