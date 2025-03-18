import React from "react"
import figma from "@figma/code-connect"
import { DsAccordionDetails } from "./DsAccordionDetails.Component"

figma.connect(
  DsAccordionDetails,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=14212-943&m=dev",
  {
    props: {
      summary: figma.textContent('body-text'),
    },
    //@ts-ignore
    example: (props) => <DsAccordionDetails >{props.summary}</DsAccordionDetails>,
  },
)
