import { FC, useState } from 'react'
import {
  DsProgressTrackerDefaultProps,
  DsProgressTrackerProps,
  DsProgressTrackerState
} from './DsProgressTracker.Types'
import { DsCollapse } from '../DsCollapse'
import { DsBox } from '../DsBox'
import { DsProgressTrackerHeader } from './Components/DsPrpgressTrackerHeader.Component'
import { DsProgressStepper } from './Components/DsProgressStepper.Component'

export const DsProgressTracker: FC<DsProgressTrackerProps> = inProps => {
  const props = { ...DsProgressTrackerDefaultProps, ...inProps }
  const [open, setOpen] = useState<DsProgressTrackerState['open']>(
    props['ds-variant'] === 'steps' ? true : false
  )

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

    const { onClick } = mergedProps

    return (
      <>
        <DsProgressTrackerHeader
          {...mergedProps}
          onClick={
            typeof onClick === 'function' ? onClick : handleToggleCollapse
          }
        />
      </>
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
