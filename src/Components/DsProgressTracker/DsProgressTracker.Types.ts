import { DsBoxProps } from '../DsBox'
import { DsStackProps } from '../DsStack'
import {
  DsProgressStepperProps,
  DsProgressStepperStepProps
} from './DsProgressStepper.Types'

export interface DsProgressTrackerProps extends DsStackProps {
  /** This property can be used to switch between different variants of Progress Indicator where Default will provide a view with expand functionality on click, setsp only provide setp names without header and header provides a header with steps indicator without expandable stepper. */
  'ds-variant': 'default' | 'header' | 'steps'
  /**
   * This prop can be used to provide steps array to the component.
   */
  steps: DsProgressStepperStepProps[]
  /**
   * This prop can be used to change the state of progress tarcker from normal to compressed.
   */
  dense?: boolean
  /**
   * This prop can be used to provide the current active step in the component.
   */
  activeStep: number
  /**
   * This prop can be used to provide props to the stepper component.
   */
  StepperProps?: Omit<DsProgressStepperProps, 'activeStep' | 'steps' | 'ref'>
  /**
   * This prop can be used to provide styles to the main element.
   */
  sx?: DsBoxProps
  /**
   * This prop can be used to provide a custom prefix string to the step label.
   */
  nextStepLabelPrefix?: React.ReactNode
}

export const DsProgressTrackerDefaultProps: DsProgressTrackerProps = {
  activeStep: 0,
  'ds-variant': 'steps',
  dense: false,
  steps: [],
  StepperProps: { orientation: 'vertical' },
  sx: {},
  nextStepLabelPrefix: 'Next Step : '
}

export interface DsProgressTrackerState {
  open: boolean
}

export const DsProgressTrackerDefaultState: DsProgressTrackerState = {
  open: false
}
