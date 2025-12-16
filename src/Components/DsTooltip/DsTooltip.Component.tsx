import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import { DsTooltipDefaultProps, DsTooltipProps } from './DsTooltip.Types'
import { DsTypography } from '../DsTypography'

export const CustomTooltip = <
  TWrapper extends React.ElementType = React.ElementType
>(
  InProps: DsTooltipProps<TWrapper>
) => {
  const props = { ...DsTooltipDefaultProps, ...InProps }

  const renderTitle = () => {
    const { heading, description } = props

    return (
      <>
        {heading && (
          <DsTypography
            component='div'
            variant='bodyBoldMedium'
            sx={{ mb: 'var(--ds-spacing-glacial)' }}
          >
            {heading}
          </DsTypography>
        )}
        {description && (
          <DsTypography component='div' variant='bodyRegularMedium'>
            {description}
          </DsTypography>
        )}
      </>
    )
  }

  const { slots, slotProps, children, ...tooltipProps } =
    props

  const WrapperComponent = slots?.wrapper || React.Fragment
  const wrapperProps = slotProps?.wrapper || {}

  return (
    <Tooltip slots={slots} slotProps={slotProps} title={renderTitle()} {...tooltipProps}>
      <WrapperComponent {...wrapperProps}>{children || null}</WrapperComponent>
    </Tooltip>
  )
}

export const DsTooltip = CustomTooltip
