import { CSSInterpolation } from '@mui/system'

export const DsStepConnectorOverrides = {
  MuiStepConnector: {
    styleOverrides: {
      horizontal: {
        left: 'calc(-50% + 13px)',
        right: 'calc(50% + 11px)'
      } as CSSInterpolation,
      lineVertical: {
        borderLeftWidth: '2px',
        borderLeftStyle: 'solid',
        borderLeftColor: 'var(--ds-colour-strokeDefault)',
        minHeight: 'var(--ds-rules-stepperConnectorMinHeight)',
        marginLeft: '15px'
      } as CSSInterpolation,
      lineHorizontal: {
        borderTopWidth: '2px',
        borderTopStyle: 'solid',
        borderColor: 'var(--ds-colour-strokeDefault)',
        minHeight: 'var(--ds-rules-stepperConnectorMinHeight)'
      } as CSSInterpolation
    }
  }
}
