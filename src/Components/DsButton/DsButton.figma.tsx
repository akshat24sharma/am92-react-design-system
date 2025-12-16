import React from "react"
import { DsButton } from "./DsButton.Component"
import figma from "@figma/code-connect"
import { DsRemixIcon } from "../DsRemixIcon"

figma.connect(
  DsButton,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=3536-16589&m=dev",
  {
    props: {
      endIcon: figma.enum("➡️ Trailing icon", {
        true: <DsRemixIcon className="ri-add-line" />
      }),
      startIcon: figma.enum("⬅️ Leading icon", {
        true: <DsRemixIcon className="ri-add-line" />
      }),
      label: figma.textContent('button-text'),
      color: figma.enum("⚙️ Variant", {
        Primary: 'primary',
        Secondary: 'secondary',
        Flushed: 'primary'
      }),
      disabled: figma.enum("🛠️ State", {
        Disabled: true
      }),
      size: figma.enum("📏 Size", {
        L: "large",
        M: "medium",
        S: "small",
      }),
      onClick: () => {}
    },
    //@ts-ignore
    example: (props) => <DsButton {...props} >{props.label}</DsButton>,
  },
)

