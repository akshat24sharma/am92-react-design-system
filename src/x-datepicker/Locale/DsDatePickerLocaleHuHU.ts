import { huHU } from '@mui/x-date-pickers/locales'
import { hu } from 'date-fns/locale'

export const DsDatePickerLocaleHuHU = {
  components: {
    MuiLocalizationProvider: {
      defaultProps: {
        adapterLocale: hu,
        localeText: {
          ...huHU.components.MuiLocalizationProvider.defaultProps.localeText,
          okButtonLabel: 'Megerősít'
        }
      }
    }
  }
}
