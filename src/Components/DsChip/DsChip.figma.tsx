import React from "react";
import figma from "@figma/code-connect";
import { DsChip } from "./DsChip.Component";
import { DsRemixIcon } from "../DsRemixIcon";

figma.connect(
  DsChip,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=3766-18176&m=dev",
  {
    props: {
      type: figma.enum("🔬 Modifier", {
        // Status: "status",
        Nudge: "nudge",
      }),
      color: figma.enum("⚙️ Variant", {
        Default: "default",
        Info: "info",
        Success: "success",
        Error: "error",
        Warning: "warning",
      }),
      icon: figma.enum("💡 Leading icon", {
        true: <DsRemixIcon className='ri-star-fill' />
      }),
      label: figma.textContent('body_text')
    },
    example: (props) => <DsChip {...props} />,
  }
);
