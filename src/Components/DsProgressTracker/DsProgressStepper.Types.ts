import { DsStepProps } from '../DsStep'
import { DsStepLabelProps } from '../DsStepLabel'
import { DsStepperProps } from '../DsStepper'

export interface DsProgressStepperStepProps {
  stepName?: string
  error?: DsStepLabelProps['error']
    /**
   * Icon to display for the step. Can be a standard icon or special values:
   * - 'warning': Shows a warning icon with warning color
   * - 'error': Shows an error icon
   */
  icon?: Exclude<DsStepLabelProps['icon'], string>
  | 'warning'
  | 'error'
  optional?: DsStepLabelProps['optional']
  completed?: DsStepProps['completed']
  disabled?: DsStepProps['disabled']
}

export interface DsProgressStepperProps
  extends Pick<DsStepperProps, 'activeStep' | 'orientation' | 'sx'> {
  steps: DsProgressStepperStepProps[]
  /** Optional callback that is called when a step button is clicked.
   *  If this prop is supplied the stepper renders clickable buttons.
   */
  onStepClick?: (stepIndex: number, step: DsProgressStepperStepProps) => void

  /** Force the stepper to render as clickable even if `onStepClick` is not
   *  provided (useful for a "read‑only" clickable UI). */
  clickable?: boolean
}

export const DsProgressStepperDefaultProps: DsProgressStepperProps = {
  activeStep: 0,
  orientation: 'vertical',
  steps: []
}
