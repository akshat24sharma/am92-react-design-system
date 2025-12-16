import { frFR } from '@mui/x-date-pickers/locales'
import { fr } from 'date-fns/locale'

export const DsDatePickerLocaleFrFR = {
  components: {
    MuiLocalizationProvider: {
      defaultProps: {
        adapterLocale: fr,
        localeText: {
          ...frFR.components.MuiLocalizationProvider.defaultProps.localeText,
          okButtonLabel: 'Confirmer'
        }
      }
    }
  }
}
