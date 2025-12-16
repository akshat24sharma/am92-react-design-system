import { daDK } from '@mui/x-date-pickers/locales'
import { da } from 'date-fns/locale'

export const DsDatePickerLocaleDaDK = {
  components: {
    MuiLocalizationProvider: {
      defaultProps: {
        adapterLocale: da,
        localeText: {
          ...daDK.components.MuiLocalizationProvider.defaultProps.localeText,
          okButtonLabel: 'Bekræft'
        }
      }
    }
  }
}
