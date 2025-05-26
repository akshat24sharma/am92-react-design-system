import React from "react"
import figma from "@figma/code-connect"
import { DsRemixIcon } from "../DsRemixIcon"
import { DsSelect } from "./DsSelect.Component"


figma.connect(
  DsSelect,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=14013-2323&m=dev",
  {
    props: {
      error: figma.enum('🛠️ State', {
        Error: true,
      }),
      success: figma.enum('🛠️ State', {
        Success: true
      }),
      disabled: figma.enum('🛠️ State', {
        Disabled: true
      }),
      readOnly: figma.enum('🛠️ State', {
        Display: true
      }),
      helperText: figma.enum('🛠️ State', {
        Error: figma.textContent('status_text'),
        Success: figma.textContent('status_text')
      }),
      label: figma.textContent('label_text'),
      options: [{ label: 'Menu Item', value: 'menu item' }],
      placeholder: figma.textContent('input_text'),
    },
    example: (props) => <DsSelect {...props} />,
  },
)

