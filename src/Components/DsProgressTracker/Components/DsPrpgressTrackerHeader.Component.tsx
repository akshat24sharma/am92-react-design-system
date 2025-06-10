src/Components/DsProgressTracker/Components/DsProgressTrackerHeader.Component.tsx
import { DsLinearProgress } from '../../DsLinearProgress'
import { DsProgressIndicator } from '../../DsProgressIndicator'
import { DsRemixIcon } from '../../DsRemixIcon'
import { DsStack } from '../../DsStack'
import { DsTypography } from '../../DsTypography'
import { DsProgressTrackerProps } from '../DsProgressTracker.Types'

export const DsProgressTrackerHeader = (props: DsProgressTrackerProps) => {
  const {
    activeStep,
    steps,
    nextStepLabelPrefix,
    dense,
    onClick,
    StepperProps,
    ...wrapperProps
  } = props

  const currentStep = steps[activeStep] || {}
  const nextStepIndex = activeStep + 1
  const nextStep = steps[nextStepIndex]
  const haveNextStep = nextStepIndex <= steps.length
  const isNextStepLastStep = nextStepIndex === steps.length
  const fillPercentage = Math.round((nextStepIndex / steps.length) * 100)

  const renderStepsLabel = () => {
    return (
      <DsTypography
        component='div'
        textAlign='right'
        color='var(--ds-colour-typoTertiary)'
        variant='subheadingSemiboldDefault'
      >
        {isNextStepLastStep
          ? 'Yay! you are almost done'
          : `${nextStepLabelPrefix} ${nextStep.stepName}`}
      </DsTypography>
    )
  }

  return (
    <>
      {dense ? (
        <DsStack
          sx={{
            backgroundColor: 'var(--ds-colour-surfaceSecondary)',
            ...wrapperProps?.sx
          }}
          {...wrapperProps}
        >
          <DsStack
            direction='row'
            justifyContent='space-between'
            px='var(--ds-spacing-bitterCold)'
            pt='var(--ds-spacing-frostbite)'
            pb='calc(var(--ds-spacing-frostbite) - var(--ds-spacing-deepFreeze))'
            onClick={onClick}
          >
            <DsTypography variant='subheadingSemiboldDefault'>
              {`STEP ${activeStep + 1} OF ${steps.length}`}
            </DsTypography>
            <DsStack direction='row' spacing='var(--ds-spacing-frostbite)'>
              {haveNextStep && renderStepsLabel()}
              {props['ds-variant'] !== 'header' && (
                <DsRemixIcon
                  fontSize='bitterCold'
                  className='ri-arrow-right-s-line'
                />
              )}
            </DsStack>
          </DsStack>
          <DsLinearProgress
            color='secondary'
            value={fillPercentage}
            variant='determinate'
            sx={{
              backgroundColor: 'transparent',
              height: '2px',
              '.MuiLinearProgress-bar1Determinate	': {
                borderRadius: '1px'
              }
            }}
          />
        </DsStack>
      ) : (
        <DsStack
          sx={{
            p: 'var(--ds-spacing-bitterCold)',
            alignItems: 'center',
            borderBottom: '1px solid var(--ds-colour-strokeDefault)',
            backgroundColor: 'var(--ds-colour-surfaceBackground)',
            cursor: props['ds-variant'] === 'default' ? 'pointer' : 'unset',
            ...wrapperProps?.sx
          }}
          spacing='var(--ds-spacing-bitterCold)'
          direction='row'
          onClick={onClick}
          {...wrapperProps}
        >
          <DsProgressIndicator
            activeStep={activeStep + 1}
            steps={steps.length}
          />
          <DsStack flexGrow={1} spacing='var(--ds-spacing-quickFreeze)'>
            <DsTypography
              component='div'
              textAlign='right'
              color='var(--ds-colour-actionSecondary)'
              variant='headingBoldExtraSmall'
            >
              {currentStep.stepName}
            </DsTypography>
            {haveNextStep && renderStepsLabel()}
          </DsStack>
        </DsStack>
      )}
    </>
  )
}
