import React from "react"
import figma from "@figma/code-connect"
import { DsDatePicker } from "./DsDatePicker.Component"


figma.connect(
  DsDatePicker,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=28145-2253&m=dev",
  {
    props: {
     },
    example: (props) => <DsDatePicker name='datepicker' onChange={()=> {}} {...props} />,
  },
)

