import React from "react"
import figma from "@figma/code-connect"
import { DsTextArea } from "./DsTextArea.Component"


figma.connect(
  DsTextArea,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=14412-658&m=dev",
  {
    props: {
      error: figma.enum('🛠️ State', {
        Error: true
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
      maxLength: figma.enum("🔢 Character counter", {
        true: 320
      }),
      helperText: figma.enum('📝 Helper text', {
        true: figma.textContent('status_text')
      }),
      label: figma.textContent('label_text')
    },
    example: (props) => <DsTextArea {...props} />,
  },
)

