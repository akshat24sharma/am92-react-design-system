import React from "react";
import figma from "@figma/code-connect";
import { DsToast } from "./DsToast.Component";

figma.connect(
  DsToast,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=4483-27089&m=dev",
  {
    props: {
      color: figma.enum("🛠️ State", {
        'Default': 'default',
        'Success': 'success',
        'Warning': 'warning',
        'Error': 'error',
      }),
      
    },
    example: (props) => <DsToast {...props} />,
  }
);
