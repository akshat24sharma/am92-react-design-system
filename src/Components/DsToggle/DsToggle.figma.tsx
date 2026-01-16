import React from "react";
import figma from "@figma/code-connect";
import { DsToggle } from "./DsToggle.Component";

figma.connect(
  DsToggle,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=3027-14714&m=dev",
  {
    props: {
      value: figma.boolean("🟢 Selected", {
        true: true,
        false: false,
      }),
      disabled: figma.enum("🛠️ State", {
        'Disable': true,
      }),
    },
    example: ({ value, ...props }) => (
      <DsToggle value={value} name="toggle" onChange={() => {}} {...props} />
    ),
  }
);
