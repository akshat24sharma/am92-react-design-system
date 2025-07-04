import { FC } from 'react'
import {
  DsProgressStepperDefaultProps,
  DsProgressStepperProps,
  DsProgressStepperStepProps
} from '../DsProgressStepper.Types'
import { StepIconProps } from '@mui/material'
import { DsRemixIcon } from '../../DsRemixIcon'
import { DsStep, DsStepProps } from '../../DsStep'
import { DsStepLabel, DsStepLabelProps } from '../../DsStepLabel'
import { DsStepper } from '../../DsStepper'

export const DsProgressStepper: FC<DsProgressStepperProps> = inProps => {
  const props = { ...DsProgressStepperDefaultProps, ...inProps }

  const renderStepIcon = (stepProps: StepIconProps) => {
    const { active, error, completed, icon } = stepProps

    if (error) {
      return (
        <DsRemixIcon
          className='ri-close-circle-fill'
          sx={{ color: 'var(--ds-colour-iconNegative)' }}
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

    const stepProps: DsStepProps = { completed, disabled }
    const stepLabelProps: DsStepLabelProps = { error, icon, optional }

    if (icon) {
      stepLabelProps.sx = {
        '.MuiStepLabel-iconContainer.Mui-disabled ': {
          borderStyle: 'none'
        }
      }
    }
    return (
      <DsStep key={index} {...stepProps}>
        <DsStepLabel
          {...stepLabelProps}
          slots={{
            stepIcon: renderStepIcon,
            ...stepLabelProps.slots
          }}
        >
          {stepName}
        </DsStepLabel>
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
