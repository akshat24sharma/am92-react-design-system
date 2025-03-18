import React from "react"
import figma from "@figma/code-connect"
import { DsRemixIcon } from "../DsRemixIcon"
import { DsAppBar } from "./DsAppBar.Component"

figma.connect(
  DsAppBar,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=3027-15491&m=dev",
  {
    props: {
      color: figma.enum("🔬 Modifier", {
        Burgundy: 'primary',
        White: 'default'
      }),
      appBarTitle: figma.enum("⚙️ Variant", {
        Primary: figma.textContent('header-text'),
        Secondary: figma.textContent('header-text'),
        Tertiary: figma.textContent('header-text'),
      }),
      navigation: figma.enum("⚙️ Variant", {
        Primary: <DsRemixIcon className="ri-menu-line" />,
        Secondary: <DsRemixIcon className="ri-arrow-left-line" />,
        Tertiary: <DsRemixIcon className="ri-arrow-left-line" />,
      }),
      actions: figma.enum("⚙️ Variant", {
        Primary: [<DsRemixIcon className="ri-chat-4-line" />,
        <DsRemixIcon className="ri-notification-3-line" />],
        Secondary: [<DsRemixIcon className="ri-chat-4-line" />,
        <DsRemixIcon className="ri-notification-3-line" />],
      }),
    },
    example: (props) => <DsAppBar {...props} />,
  },
)

