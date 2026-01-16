import React from "react"
import figma from "@figma/code-connect"
import { DsSearchbar } from "./DsSearchbar.Component"


figma.connect(
  DsSearchbar,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=16048-179&m=dev",
  {
    props: {
      // this is an example
      options: [{ label: 'Option 1' }, { label: 'Option 2' }, { label: 'Option 3' }]
    },
    example: (props) => <DsSearchbar {...props} />,
  },
)

