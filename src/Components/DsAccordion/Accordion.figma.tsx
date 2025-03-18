import React from "react"
import { DsAccordion } from "./DsAccordion.Component"
import figma from "@figma/code-connect"

figma.connect(
  DsAccordion,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=14212-943&m=dev",
  {
    props: {
      header: figma.textContent('heading_text'),
      summary: figma.textContent('body-text'),
      // children: figma.children(['header', 'body'])
    },
    //@ts-ignore
    example: (props) => <DsAccordion header={props.header} summary={props.summary}/>,
  },
)
