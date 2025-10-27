import { ptBR as PtBR } from '@mui/x-date-pickers/locales'
import { ptBR } from 'date-fns/locale'

export const DsDatePickerLocalePtBR = {
  components: {
    MuiLocalizationProvider: {
      defaultProps: {
        adapterLocale: ptBR,
        localeText: {
          ...PtBR.components.MuiLocalizationProvider.defaultProps.localeText,
          okButtonLabel: 'Confirmar'
        }
      }
    }
  }
}
