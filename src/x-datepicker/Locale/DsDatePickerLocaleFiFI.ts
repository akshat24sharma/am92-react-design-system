import { fiFI } from '@mui/x-date-pickers/locales'
import { fi } from 'date-fns/locale'

export const DsDatePickerLocaleFiFI = {
  components: {
    MuiLocalizationProvider: {
      defaultProps: {
        adapterLocale: fi,
        localeText: {
          ...fiFI.components.MuiLocalizationProvider.defaultProps.localeText,
          okButtonLabel: 'Vahvista'
        }
      }
    }
  }
}
