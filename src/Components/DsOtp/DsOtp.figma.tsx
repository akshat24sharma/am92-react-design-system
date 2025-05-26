import React from "react"
import figma from "@figma/code-connect"
import { DsRemixIcon } from "../DsRemixIcon"
import { DsOtp } from "./DsOtp.Component"


figma.connect(
  DsOtp,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=10775-24917&m=dev",
  {
    props: {
      error: figma.enum('🛠️ State', {
        Error: true,
      }),
      success: figma.enum('🛠️ State', {
        Success: true
      }),
      disabled: figma.enum('🛠️ State', {
        Disable: true
      }),
      readOnly: figma.enum('🛠️ State', {
        Display: true
      }),
      helperText: figma.enum('🛠️ State', {
        Error: figma.textContent('status_text'),
        Success: figma.textContent('status_text')
      }),
      length: figma.enum('🔢 Digit', {
        '4': 4,
        '6': 6
      }),
      size: figma.enum('📏 Size', {
        'M': 'medium',
        'S': 'small'
      })
    },
    example: (props) => <DsOtp onComplete={() => {}} {...props} />,
  },
)

