import React, { FC } from 'react'
import { DsAccordionProps } from './DsAccordion.Types'
import Accordion from '@mui/material/Accordion'
import { useThemeProps } from '@mui/system'
import { DsAccordionDetails } from '../DsAccordionDetails'
import { DsAccordionSummary } from '../DsAccordionSummary'
import { DsRemixIcon } from '../DsRemixIcon'

export const DsAccordion: FC<DsAccordionProps> = inProps => {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiAccordion'
  })

  const {
    header,
    HeaderProps,
    summary,
    SummaryProps,
    expandIcon = (
      <DsRemixIcon className="ri-arrow-down-s-line" fontSize="bitterCold" />
    ),
    ...AccordionProps
  } = props

  return (
    <Accordion {...AccordionProps}>
      <DsAccordionSummary expandIcon={expandIcon} {...HeaderProps}>
        {header}
      </DsAccordionSummary>
      {summary && (
        <DsAccordionDetails {...SummaryProps}>{summary}</DsAccordionDetails>
      )}
    </Accordion>
  )
}
