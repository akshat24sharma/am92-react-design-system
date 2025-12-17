import React from "react"
import figma from "@figma/code-connect"
import { DsBadge } from "./DsBadge.Component"


figma.connect(
  DsBadge,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=6861-3122&m=dev",
  {
    props: {
      badgeContent: figma.enum('Type', {
        'Default': '',
        'Single digit': figma.textContent('3'),
        'Double digit': figma.textContent('32'),
        'Overflow': figma.textContent('99+'),
      })

    },
    example: (props) => <DsBadge {...props} />,
  },
)

