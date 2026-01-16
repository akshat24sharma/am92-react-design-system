import React from "react";
import figma from "@figma/code-connect";
import { DsTag } from "./DsTag.Component";

figma.connect(
  DsTag,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=4161-26660&m=dev",
  {
    props: {
      selected: figma.enum("State", {
        Selected: true,
      }),
      value: figma.textContent('text')
    },
    example: (props) => <DsTag {...props} />,
  }
);
