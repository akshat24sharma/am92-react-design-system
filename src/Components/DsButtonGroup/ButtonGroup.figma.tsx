import React from "react"
import { DsButtonGroup } from "./DsButtonGroup.Component"
import figma from "@figma/code-connect"

figma.connect(
  DsButtonGroup,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=39951-3923",
  {
    props: {
      children: figma.children('*'),
      direction: figma.enum('⚙️ Type', {
        Vertical: 'row',
        Hortizontal: 'column'
      })
    },
    example: (props) => <DsButtonGroup direction={props.direction} >{props.children}</DsButtonGroup>,
  },
)
