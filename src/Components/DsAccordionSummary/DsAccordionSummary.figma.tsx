import React from "react"
import figma from "@figma/code-connect"
import { DsAccordionSummary } from "./DsAccordionSummary.Component"

figma.connect(
  DsAccordionSummary,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=14212-943&m=dev",
  {
    props: {
      header: figma.textContent('heading_text'),
      summary: figma.textContent('body-text'),
      children: figma.children('*')
    },
    //@ts-ignore
    example: (props) => <DsAccordionSummary >{props.header}</DsAccordionSummary>,
  },
)
