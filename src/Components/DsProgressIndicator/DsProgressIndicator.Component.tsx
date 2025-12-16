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
    const { activeStep, steps, isSuccess, isError } = props

    if (isSuccess) {
      return (
        <DsRemixIcon
          sx={{ color: 'var(--ds-colour-iconPositive)' }}
          className="ri-check-line"
        />
      )
    }

    if (isError) {
      return (
        <DsRemixIcon
          sx={{ color: 'var(--ds-colour-iconNegative)' }}
          className="ri-error-warning-line"
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
    const fillColor = isSuccess ? 'success' : isError ? 'error' : 'secondary'

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
        <DsTypography
          variant="subheadingSemiboldDefault"
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)'
          }}
        >
          {getFillText()}
        </DsTypography>
      </DsBox>
    )
}
