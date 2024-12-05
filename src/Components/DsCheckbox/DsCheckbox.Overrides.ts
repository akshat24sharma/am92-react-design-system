import { DsCheckboxDefaultProps } from './DsCheckbox.Types'

export const DsCheckboxOverrides = {
  MuiCheckbox: {
    defaultProps: DsCheckboxDefaultProps,
    styleOverrides: {
      root: {
        color: 'var(--ds-colour-iconDefault)',
        '&.Mui-disabled': {
          color: 'var(--ds-colour-iconDisabled)'
        },
        '&:not(.Mui-checked)': {
          '&:hover': {
            backgroundColor: 'var(--ds-colour-stateUnselectedHover)'
          },
          '&:focus': {
            backgroundColor: 'var(--ds-colour-stateUnselectedHover)'
          }
        }
      },
      colorPrimary: {
        '&.Mui-checked&:not(.Mui-checked)': {
          color: 'var(--ds-colour-iconActionPrimary)'
        }
      },
      colorSecondary: {
        '&.Mui-checked&:not(.Mui-checked)': {
          color: 'var(--ds-colour-iconActionSecondary)',
          '&:hover': {
            backgroundColor: 'var(--ds-colour-stateSelectedPrimaryHover)'
          },
          '&:focus': {
            backgroundColor: 'var(--ds-colour-stateSelectedPrimaryHover)'
          }
        }
      },
      colorError: {
        '&.Mui-checked&:not(.Mui-checked)': {
          color: 'var(--ds-colour-iconNegative)'
        }
      },
      colorSuccess: {
        '&.Mui-checked&:not(.Mui-checked)': {
          color: 'var(--ds-colour-iconPositive)'
        }
      },
      colorWarning: {
        '&.Mui-checked&:not(.Mui-checked)': {
          color: 'var(--ds-colour-iconWarning)'
        }
      },
      sizeSmall: {
        fontSize: 'var(--ds-typo-fontSizeCold)'
      },
      sizeMedium: {
        fontSize: 'var(--ds-typo-fontSizeMild)'
      },
      sizeLarge: {
        fontSize: 'var(--ds-typo-fontSizeWarm)'
      }
    }
  }
}
