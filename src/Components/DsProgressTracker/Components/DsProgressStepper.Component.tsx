import { FC } from 'react'
import type {
  DsProgressStepperProps,
  DsProgressStepperStepProps
} from '../DsProgressStepper.Types'
import { DsProgressStepperDefaultProps } from '../DsProgressStepper.Types'
import { DsRemixIcon } from '../../DsRemixIcon'
import { DsStep, DsStepProps } from '../../DsStep'
import { DsStepLabel, DsStepLabelProps } from '../../DsStepLabel'
import { DsStepper } from '../../DsStepper'
import { DsStepButton } from '../../DsStepButton'
import type { DsStepIconProps } from '../../DsStepIcon'

export const DsProgressStepper: FC<DsProgressStepperProps> = inProps => {
  const props = { ...DsProgressStepperDefaultProps, ...inProps }

  const renderStepIcon = (stepProps: DsStepIconProps) => {
    const { active, error, completed, icon } = stepProps

    const isWarning = typeof icon === 'string' && icon === 'warning'
    const isError = error || ( typeof icon === 'string' && icon === 'error')

    if (isError) {
      return (
        <DsRemixIcon
          className='ri-close-circle-fill'
          sx={{ color: 'var(--ds-colour-iconNegative)' }}
        />
      )
    }

    if (isWarning) {
      return (
        <DsRemixIcon
          className='ri-error-warning-fill'
          sx={{ color: 'var(--ds-colour-supportWarning)' }}
        />
      )
    }

    if (completed) {
      return (
        <DsRemixIcon
          className='ri-checkbox-circle-fill'
          sx={{ color: 'var(--ds-colour-iconPositive)' }}
        />
      )
    }

    if (active) {
      return (
        <DsRemixIcon
          className='ri-play-circle-fill'
          color='iconActionSecondary'
        />
      )
    }

    return <>{icon}</>
  }

  const renderStep = (step: DsProgressStepperStepProps, index: number) => {
    const { stepName, error, icon, optional, completed, disabled } = step
    const { onStepClick } = props // ← pull from props

    const stepProps: DsStepProps = { completed, disabled }
    const stepLabelProps: DsStepLabelProps = { error, icon, optional }

    if (icon) {
      stepLabelProps.sx = {
        '.MuiStepLabel-iconContainer.Mui-disabled ': {
          borderStyle: 'none'
        }
      }
    }

    const label = (
      <DsStepLabel
        {...stepLabelProps}
        slots={{
          stepIcon: renderStepIcon,
          ...stepLabelProps.slots
        }}
      >
        {stepName}
      </DsStepLabel>
    )

    return (
      <DsStep key={index} {...stepProps}>
        {onStepClick ? (
          <DsStepButton
            onClick={() => onStepClick(index, step)}
          >
            {label}
          </DsStepButton>
        ) : (
          label
        )}
      </DsStep>
    )
  }

  const { steps, ...stepperProps } = props

  return (
    <DsStepper
      {...stepperProps}
      alternativeLabel={stepperProps.orientation === 'horizontal'}
    >
      {steps.map(renderStep)}
    </DsStepper>
  )
}
