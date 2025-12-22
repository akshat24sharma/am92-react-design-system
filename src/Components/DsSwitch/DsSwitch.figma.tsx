import React from "react";
import figma from "@figma/code-connect";

import { DsSwitch } from "../DsSwitch/DsSwitch.Component";

figma.connect(
  DsSwitch,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=3027-15685&m=dev",
  {
    props: {
      checked: figma.boolean("🟢 Yes"),
      disabled: figma.enum("🛠️ State", {
        Disable: true,
      }),
    },
    //@ts-ignore
    example: (props) => <DsSwitch {...props} />,
  }
);
