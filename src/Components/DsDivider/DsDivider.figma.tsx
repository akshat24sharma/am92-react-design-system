import React from "react";
import { DsDivider } from "./DsDivider.Component";
import figma from "@figma/code-connect";

figma.connect(
  DsDivider,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=6185-2913&m=dev",
  {
    props: {
      orientation: figma.enum("Direction", {
        Horizontal: "horizontal",
        Vertical: "vertical",
      }),
      "ds-size": figma.enum("Size", {
        L: "L",
        M: "M",
      }),
    },
    example: (props) => <DsDivider {...props} />,
  }
);
