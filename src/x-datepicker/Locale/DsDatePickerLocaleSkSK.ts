import { skSK } from '@mui/x-date-pickers/locales'
import { sk } from 'date-fns/locale'

export const DsDatePickerLocaleSkSK = {
  components: {
    MuiLocalizationProvider: {
      defaultProps: {
        adapterLocale: sk,
        localeText: {
          ...skSK.components.MuiLocalizationProvider.defaultProps.localeText,
          okButtonLabel: 'Potvrdiť'
        }
      }
    }
  }
}
