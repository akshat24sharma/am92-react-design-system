import { AccordionProps } from '@mui/material'
import { DsAccordionSummaryProps } from '../DsAccordionSummary'
import { DsAccordionDetailsProps } from '../DsAccordionDetails'
import { DsRemixIcon } from '../DsRemixIcon'

// TODO: 1. Provide headerIcon props.
//       2. Convert header, summary and headerIcon to slot and slotProps
export interface DsAccordionProps extends Omit<AccordionProps, 'children'> {
  header: string | React.ReactElement
  HeaderProps?: DsAccordionSummaryProps
  summary: string | React.ReactElement
  SummaryProps?: DsAccordionDetailsProps
  expandIcon?: React.ReactNode
}

export const DsAccordionDefaultProps: DsAccordionProps = {
  elevation: -1,
  header: '',
  summary: '',
  disableGutters: true
}
