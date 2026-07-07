import { FC } from 'react'
import {
  DsProgressIndicatorDefaultProps,
  DsProgressIndicatorProps
} from './DsProgressIndicator.Types'
import { DsBox } from '../DsBox'
import { DsCircularProgress } from '../DsCircularProgress'
import { DsTypography } from '../DsTypography'
import { DsRemixIcon } from '../DsRemixIcon'

export const DsProgressIndicator: FC<DsProgressIndicatorProps> = (inProps) => {
  const props = { ...DsProgressIndicatorDefaultProps, ...inProps }

  const getFillText = () => {
    const { activeStep, steps, isSuccess, isError, successIconProps, errorIconProps } = props

    if (isSuccess) {
      return (
        <DsRemixIcon
          className={'ri-check-line'}
          {...successIconProps}
          sx={{ color: 'var(--ds-colour-iconPositive)',...successIconProps?.sx }}
        />
      )
    }

    if (isError) {
      return (
        <DsRemixIcon
          className={'ri-close-fill'}
          {...errorIconProps}
          sx={{ color: 'var(--ds-colour-iconNegative)',...errorIconProps?.sx }}
        />
      )
    }

    if (props['ds-variant'] === 'fraction') {
      return (
        <DsTypography variant='subheadingSemiboldDefault'>
          {`${activeStep}/${steps}`}
        </DsTypography>
      )
    }

    return (
      <DsTypography variant='subheadingSemiboldDefault'>
        {`${Math.round((activeStep / steps) * 100)}%`}
      </DsTypography>
    )
  }

    const { activeStep, steps, isSuccess, isError } = props
    const squareSize = props['ds-variant'] === 'fraction' ? '48px' : '32px'
    const fillPercentage = Math.round((activeStep / steps) * 100)
    const fillColor = isSuccess ? "success" : isError ? "error" : props?.color ?? "secondary"

    return (
      <DsBox
        sx={{
          display: "flex",
          position: "relative",
          height: squareSize,
          width: squareSize
        }}
      >
        <DsCircularProgress
          variant="determinate"
          value={100}
          sx={{ color: 'var(--ds-colour-stateDisabledSurface)' }}
          size={squareSize}
          thickness={4}
        />
        <DsCircularProgress
          variant="determinate"
          color={fillColor}
          value={fillPercentage}
          size={squareSize}
          thickness={4}
          style={{
            position: 'absolute'
          }}
        />
        <DsBox
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {getFillText()}
        </DsBox>
      </DsBox>
    );
}
