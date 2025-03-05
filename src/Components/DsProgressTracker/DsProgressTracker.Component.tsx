import React, { FC, PureComponent, useState } from 'react'
import {
  DsProgressTrackerDefaultProps,
  DsProgressTrackerProps,
  DsProgressTrackerState
} from './DsProgressTracker.Types'
import { DsProgressStepper } from './DsProgressStepper.Component'
import { DsProgressIndicator } from '../DsProgressIndicator'
import { DsCollapse } from '../DsCollapse'
import { DsBox } from '../DsBox'
import { DsTypography } from '../DsTypography'
import { DsStack } from '../DsStack'

export const DsProgressTracker: FC<
  DsProgressTrackerProps
> = (inProps) => {
const props = {...DsProgressTrackerDefaultProps, ...inProps}
const [open, setOpen] = useState<DsProgressTrackerState['open']>(props['ds-variant'] === 'steps' ? true : false)

 const getMergedProps = () => {
    return {
      ...DsProgressTrackerDefaultProps,
      ...props,
      StepperProps: {
        ...DsProgressTrackerDefaultProps?.StepperProps,
        ...props?.StepperProps
      }
    }
  }

  const handleToggleCollapse = () => setOpen(!open)

  const renderStepper = () => {
    const mergedProps = getMergedProps()
    // Don Not Render steps if variant is `header`
    if (mergedProps['ds-variant'] === 'header') {
      return null
    }

    const { StepperProps, activeStep, steps } = mergedProps

    return (
      <DsCollapse in={open}>
        <DsProgressStepper
          activeStep={activeStep}
          steps={steps}
          {...StepperProps}
        />
      </DsCollapse>
    )
  }

  const renderHeader = () => {
    const mergedProps = getMergedProps()

    // Don Not Render Header if variant is `steps`
    if (mergedProps['ds-variant'] === 'steps') {
      return null
    }

    const { activeStep, steps, nextStepLabelPrefix } = mergedProps
    const currentStep = steps[activeStep] || {}
    const nextStepIndex = activeStep + 1
    const nextStep = steps[nextStepIndex]
    const haveNextStep = nextStepIndex <= steps.length
    const isNextStepLastStep = nextStepIndex === steps.length

    return (
      <DsStack
        sx={{
          p: 'var(--ds-spacing-bitterCold)',
          alignItems: 'center',
          borderBottom: '1px solid var(--ds-colour-strokeDefault)',
          backgroundColor: 'var(--ds-colour-surfaceBackground)',
          cursor: mergedProps['ds-variant'] === 'default' ? 'pointer' : 'unset'
        }}
        spacing="var(--ds-spacing-bitterCold)"
        direction="row"
        onClick={handleToggleCollapse}
      >
        <DsProgressIndicator activeStep={activeStep + 1} steps={steps.length} />
        <DsStack
          flexGrow={1}
          direction="column"
          spacing="var(--ds-spacing-quickFreeze)"
        >
          <DsTypography
            component="div"
            textAlign="right"
            color="var(--ds-colour-actionSecondary)"
            variant="headingBoldExtraSmall"
          >
            {currentStep.stepName}
          </DsTypography>
          {haveNextStep && (
            <DsTypography
              component="div"
              textAlign="right"
              color="var(--ds-colour-typoTertiary)"
              variant="subheadingSemiboldDefault"
            >
              {isNextStepLastStep
                ? 'Yay! you are almost done'
                : `${nextStepLabelPrefix}${nextStep.stepName}`}
            </DsTypography>
          )}
        </DsStack>
      </DsStack>
    )
  }

    const mergedProps = props
    const { sx } = mergedProps
    return (
      <DsBox sx={{ width: '100%', ...sx }}>
        {renderHeader()}
        {renderStepper()}
      </DsBox>
    )
}
