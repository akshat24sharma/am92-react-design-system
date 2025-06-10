import { TooltipProps } from '@mui/material'
import { DsLink } from '../DsLink'

type DsTooltipSlots<TWrapper extends React.ElementType = React.ElementType> =
  TooltipProps['slots'] & {
    /** This is a slot is used to provide custom component to the wrapping parent of the tooltip children */
    wrapper?: TWrapper
  }

type DsTooltipSlotProps<
  TWrapper extends React.ElementType = React.ElementType
> = TooltipProps['slotProps'] & {
  /** This is a slot is used to provide props to the custom wrapping parent of the tooltip children */
  wrapper?: React.ComponentProps<TWrapper>
}

export type DsTooltipProps<
  TWrapper extends React.ElementType = React.ElementType
> = Omit<TooltipProps, 'title' | 'slots' | 'slotProps'> & {
  /** This prop can be used to provide a heading to the tooltip */
  heading?: string
  /** This prop can be used to provide a description to the tooltip */
  description?: string
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots?: DsTooltipSlots<TWrapper>
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps?: DsTooltipSlotProps<TWrapper>
}

export const DsTooltipDefaultProps: DsTooltipProps<typeof DsLink> = {
  arrow: true,
  placement: 'top',
  enterTouchDelay: 0,
  leaveTouchDelay: 4000,
  children: <></>,
  slots: {
    wrapper: DsLink
  },
  slotProps: {
    wrapper: {
      color: 'inherit',
      variant: 'inherit',
      sx: { textDecoration: 'inherit' }
    }
  }
}
