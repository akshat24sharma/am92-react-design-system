import React, { FC } from 'react'
import Tooltip from '@mui/material/Tooltip'
import { DsTooltipProps } from './DsTooltip.Types'
import { DsTypography } from '../DsTypography'
import { DsLink } from '../DsLink'
import { useThemeProps } from '@mui/system'

export const DsTooltip: FC<DsTooltipProps> = (props) =>  {
  
  const renderTitle = () => {
    const { heading, description, buttonGroup } = props

    const tooltipButtonGroup = buttonGroup
      ? React.cloneElement(buttonGroup, {
          size: 'small',
          fullWidth: true,
          noPadding: true,
          sx: { bgcolor: 'transparent', mt: 'var(--ds-spacing-bitterCold)' }
        })
      : false

    return (
      <>
        {heading && (
          <DsTypography
            component="div"
            variant="bodyBoldMedium"
            sx={{ mb: 'var(--ds-spacing-glacial)' }}
          >
            {heading}
          </DsTypography>
        )}
        {description && (
          <DsTypography component="div" variant="bodyRegularMedium">
            {description}
          </DsTypography>
        )}
        {tooltipButtonGroup}
      </>
    )
  }


    const {
      heading,
      description,
      buttonGroup,

      children,
      ...tooltipProps
    } = props

    return (
      <Tooltip title={renderTitle()} {...tooltipProps}>
        <DsLink
          component="span"
          underline="always"
          color="inherit"
          variant="inherit"
          sx={{ textDecorationColor: 'inherit' }}
        >
          {children}
        </DsLink>
      </Tooltip>
    )
}
