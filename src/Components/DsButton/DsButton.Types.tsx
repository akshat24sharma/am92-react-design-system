import { ButtonProps } from '@mui/material'
import { DsBox } from '../DsBox'
import { ThreeDotLoader } from '../DsLoader'

export interface DsButtonProps extends ButtonProps {}

export const DsButtonDefaultProps: DsButtonProps = {
  variant: 'contained',
  size: 'small',
  color: 'primary',
  disableElevation: true,
  loadingPosition: 'end',
  loadingIndicator: (
      <DsBox
        sx={{
          width: '100%'
        }}
      >
        <ThreeDotLoader />
      </DsBox>
  )
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    flushed: true
  }
}
