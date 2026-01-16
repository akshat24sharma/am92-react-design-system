import React from "react"
import figma from "@figma/code-connect"
import { DsRemixIcon } from "../DsRemixIcon"
import { DsBottomNavigation } from "./DsBottomNavigation.Component"

figma.connect(
  DsBottomNavigation,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=6518-2948&m=dev",
  {
    props: {
      children: figma.children("*")
    },
    example: ({ children, ...props }) => <DsBottomNavigation {...props}>{children}</DsBottomNavigation>,
  },
)

