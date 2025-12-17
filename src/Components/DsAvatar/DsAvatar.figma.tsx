import React from "react"
import figma from "@figma/code-connect"
import { DsAvatar } from "./DsAvatar.Component"


figma.connect(
  DsAvatar,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=38781-35292&m=dev",
  {
    props: {
      'ds-size': figma.enum('📏 Size', {
       'S': 'S',
        'M': 'M',
        'L': 'L',
        'XL': 'XL',
        'XXL': 'XXL',
        '3XL': '3XL',
      }),
      'ds-variant': figma.enum('⚙️ Type', {
        'Avatar-Icon': 'icon',
        'Avatar-Image': 'icon',
        'Avatar-Text': 'text',
      })

    },
    example: (props) => <DsAvatar {...props} />,
  },
)

