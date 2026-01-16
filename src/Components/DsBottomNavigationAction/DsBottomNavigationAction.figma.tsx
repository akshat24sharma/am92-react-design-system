import React from "react"
import figma from "@figma/code-connect"
import { DsRemixIcon } from "../DsRemixIcon"
import { DsBottomNavigationAction } from "./DsBottomNavigationAction.Component"

figma.connect(
  DsBottomNavigationAction,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=6518-2978&m=dev",
  {
    props: {
      icon: <DsRemixIcon className="ri-star-fill" />,
      label: figma.textContent("label_text"),
    },
    example: ({ icon, label }) => (
      <DsBottomNavigationAction
        icon={icon}
        label={label}
      />
    ),
  },
)

