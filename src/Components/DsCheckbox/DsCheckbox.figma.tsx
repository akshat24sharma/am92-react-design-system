import React from "react"
import figma from "@figma/code-connect"
import { DsCheckbox } from "./DsCheckbox.Component"
import { DsFormControlLabel } from "../DsFormControlLabel"
import { DsTypography } from "../DsTypography"
import { DsFormControl } from "../DsFormControl"
import { DsFormLabel } from "../DsFormLabel"


figma.connect(
  DsCheckbox,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=4492-28389&m=dev",
  {
    props: {
      checked: figma.boolean('✅ Checked', {
        true: true,
        false: false
      }),
      disabled: figma.enum('🛠️ State', {
        Disabled: true
      })
    },
    example: (props) => <DsCheckbox {...props} />,
  },
)

figma.connect(
  DsCheckbox,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=4492-28344&m=dev",
  {
    props: {
      checked: figma.boolean('✅ Checked', {
        true: true,
        false: false
      }),
      disabled: figma.enum('🛠️ State', {
        Disable: true
      }),
      label: figma.enum('🔤 Checkbox-text', {
        true: figma.textContent('checkbox-text')
      })
    },
    example: ({ label, ...checkboxProps }) =>{
      return <DsFormControlLabel control={<DsCheckbox {...checkboxProps} />} label={label} />},
  },
)

figma.connect(
  DsCheckbox,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=4492-28369&m=dev",
  {
    props: {
      listHeading: figma.textContent('checkbox-list-heading'),
      children: figma.children('*')
    },
    example: ({ listHeading,children }) =>{
      return (<DsFormControl>
      <DsFormLabel>
        <DsTypography color={'var(--ds-colour-typoPrimary)'}>
          {listHeading}
        </DsTypography>
      </DsFormLabel>
      {children}
    </DsFormControl>)},
  },
)

