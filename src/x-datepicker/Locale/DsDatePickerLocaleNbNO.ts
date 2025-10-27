import { nbNO } from '@mui/x-date-pickers/locales'
import { nb } from 'date-fns/locale'

export const DsDatePickerLocaleNbNO = {
  components: {
    MuiLocalizationProvider: {
      defaultProps: {
        adapterLocale: nb,
        localeText: {
          ...nbNO.components.MuiLocalizationProvider.defaultProps.localeText,
          okButtonLabel: 'Bekreft'
        }
      }
    }
  }
}
