import React from "react"
import figma from "@figma/code-connect"
import { DsTextField } from "./DsTextField.Component"
import { DsRemixIcon } from "../DsRemixIcon"
import { DsTextFieldProps } from "./DsTextField.Types"


figma.connect(
  DsTextField,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=1882-12581&m=dev",
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
      endAdornment: figma.enum('➡️ Trailing icon', {
        true: <DsRemixIcon className="ri-close-fill" />
      })
    },
    example: (props) => <DsTextField {...props} />,
  },
)

