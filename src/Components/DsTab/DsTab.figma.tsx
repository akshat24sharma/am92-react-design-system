import React from "react"
import figma from "@figma/code-connect"
import { DsTab } from "./DsTab.Component"


figma.connect(
  DsTab,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=60929-4793&m=dev",
  {
    props: {
      label: figma.textContent("tab-name"),
    },
    example: (props) => <DsTab  {...props} />,
  },
)

figma.connect(
  DsTab,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=60929-4890&m=dev",
  {
    props: {
      label: figma.textContent("tab-name"),
    },
    example: (props) => <DsTab  {...props} />,
  },
)