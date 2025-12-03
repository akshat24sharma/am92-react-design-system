import { BadgeProps } from '@mui/material'

type TDsBadgeExtendedColor = BadgeProps['color'] | 'inverse'

export interface DsBadgeProps extends Omit<BadgeProps, 'color'> {
  color?: TDsBadgeExtendedColor
  disabled?: boolean
}

export const DsBadgeDefaultProps: DsBadgeProps = {
  color: 'secondary',
  showZero: true
}
