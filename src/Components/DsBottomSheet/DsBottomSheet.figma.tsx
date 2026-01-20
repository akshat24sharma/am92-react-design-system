import React from "react"
import figma from "@figma/code-connect"
import { DsBottomSheet } from "./DsBottomSheet.Component"


figma.connect(
  DsBottomSheet,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=51283-31501&m=dev",
  {
    props: {
      title: figma.textContent("main_heading"),
      kicker: figma.textContent("kicker"),
      description: figma.textContent("Supporting description copy goes here."),
      showClose: figma.boolean("Close Button", {
        true: true,
        false: false,
      }),
      'primaryButtonText': 'Primary Button',
      'secondaryButtonText': 'Secondary Button',
      'primaryButtonProps': { onClick: () => {} }
    },
    example: (props) => <DsBottomSheet {...props} />,
  },
)

