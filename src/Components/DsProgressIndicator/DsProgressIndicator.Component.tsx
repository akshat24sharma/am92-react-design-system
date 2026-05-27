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
    const { activeStep, steps, isSuccess, isError, successIconProps, errorIconProps, color } = props

    if (isSuccess) {
      return (
        <DsRemixIcon
          color={color ?? 'success'}
          className={successIconProps?.className || 'ri-check-line'}
          {...successIconProps}
        />
      )
    }

    if (isError) {
      return (
        <DsRemixIcon
          color={color ?? 'error'}
          className={errorIconProps?.className || 'ri-close-fill'}
          {...errorIconProps}
        />
      )
    }

    if (props['ds-variant'] === 'fraction') {
      return `${activeStep}/${steps}`
    }

    return `${Math.round((activeStep / steps) * 100)}%`
  }

    const { activeStep, steps, isSuccess, isError } = props
    const squareSize = props['ds-variant'] === 'fraction' ? '48px' : '32px'
    const fillPercentage = Math.round((activeStep / steps) * 100)
    const fillColor = props.color
      ? props.color
      : isSuccess
        ? "success"
        : isError
          ? "error"
          : "secondary"

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
          {isSuccess || isError ? (
            getFillText()
          ) : (
            <DsTypography variant="subheadingSemiboldDefault">
              {getFillText()}
            </DsTypography>
          )}
        </DsBox>
      </DsBox>
    );
}
