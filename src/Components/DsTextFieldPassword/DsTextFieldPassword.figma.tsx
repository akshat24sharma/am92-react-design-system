import React from "react"
import figma from "@figma/code-connect"
import { DsTextFieldPassword } from "./DsTextFieldPassword.Component"


figma.connect(
  DsTextFieldPassword,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=10769-24094&m=dev",
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
      isVisible: figma.boolean('🔁 Show/Hide', {
        'false': false,
        'true': true
      })
    },
    example: (props) => <DsTextFieldPassword {...props} />,
  },
)

