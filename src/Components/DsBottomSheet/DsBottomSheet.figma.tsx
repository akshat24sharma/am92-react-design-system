import React from "react"
import figma from "@figma/code-connect"
import { DsBottomSheet } from "./DsBottomSheet.Component"


figma.connect(
  DsBottomSheet,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=51314-1715&m=dev",
  {
    props: {
      title: figma.textContent("main_heading")
    },
    example: (props) => <DsBottomSheet {...props} />,
  },
)

