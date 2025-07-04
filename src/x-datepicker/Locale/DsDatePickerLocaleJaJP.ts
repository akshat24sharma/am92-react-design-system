import { jaJP } from '@mui/x-date-pickers/locales'
import { ja } from 'date-fns/locale'

export const DsDatePickerLocaleJaJP = {
  components: {
    MuiLocalizationProvider: {
      defaultProps: {
        adapterLocale: ja,
        localeText: {
          ...jaJP.components.MuiLocalizationProvider.defaultProps.localeText,
          okButtonLabel: '確認'
        }
      }
    }
  }
}
