import React from "react"
import figma from "@figma/code-connect"
import { DsSlider } from "./DsSlider.Component"


figma.connect(
  DsSlider,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=14798-833&m=dev",
  {
    props: {
      disabled: figma.enum("🛠️ State", {
        'Disable': true
      }),
      valueLabelDisplay: figma.boolean("ℹ️ Slider tooltip", {
        true: "on",
        false: "off",
      })
    },
    example: (props) => <DsSlider marks={[
    {
      label: 'xxxx',
      value: 0
    },
    {
      label: 'xxxx',
      value: 50
    },
    {
      label: 'xxxx',
      value: 100
    }
  ]} {...props} />,
  },
)

figma.connect(
  DsSlider,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=14798-1114&m=dev",
  {
    props: {
      disabled: figma.enum("🛠️ State", {
        'Disable': true
      }),
      step: figma.enum("🔢 Indicator", {
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
      })
    },
    example: (props) => <DsSlider marks={[
    {
      label: 'xxxx',
      value: 0
    },
    {
      label: 'xxxx',
      value: 50
    },
    {
      label: 'xxxx',
      value: 100
    }
  ]} {...props} />,
  },
)