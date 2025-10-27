import { deDE } from '@mui/x-date-pickers/locales'
import { de } from 'date-fns/locale'

export const DsDatePickerLocaleDeDE = {
  components: {
    MuiLocalizationProvider: {
      defaultProps: {
        adapterLocale: de,
        localeText: {
          ...deDE.components.MuiLocalizationProvider.defaultProps.localeText,
          okButtonLabel: 'Bestätigen'
        }
      }
    }
  }
}
