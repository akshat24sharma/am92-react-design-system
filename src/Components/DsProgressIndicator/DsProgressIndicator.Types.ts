import { DsCircularProgressProps } from "../DsCircularProgress"
import { DsRemixIconProps } from "../DsRemixIcon"

export interface DsProgressIndicatorProps {
  'ds-variant'?: 'percentage' | 'fraction'
  steps: number
  activeStep: number

  isError?: boolean
  isSuccess?: boolean
  successIconProps?: DsRemixIconProps
  errorIconProps?: DsRemixIconProps
  color?: DsCircularProgressProps['color']
}

export const DsProgressIndicatorDefaultProps: DsProgressIndicatorProps = {
  'ds-variant': 'fraction',
  steps: 0,
  activeStep: 0
}