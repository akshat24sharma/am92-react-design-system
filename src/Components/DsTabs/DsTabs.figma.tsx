import React from "react";
import figma from "@figma/code-connect";
import { DsTabs } from "./DsTabs.Component";

figma.connect(
  DsTabs,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=4161-26660&m=dev",
  {
    props: {
      children: figma.children("*"),
      "tabVariant": figma.enum("Style", {
        Default: "default",
        Contained: "contained",
      }),
      variant: figma.enum("Type", {
        'Fixed': 'fullWidth'
      })
    },
    example: ({ children, tabVariant, ...props }) => (
      <DsTabs {...props} ds-variant={tabVariant}>
        {children}
      </DsTabs>
    ),
  }
);
