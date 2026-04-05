import React from "react";
import figma from "@figma/code-connect";
import { DsTag } from "./DsTag.Component";
import { DsRemixIcon } from "../DsRemixIcon";

figma.connect(
  DsTag,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=3027-14879&m=dev",
  {
    props: {
      selected: figma.enum("State", {
        Selected: true,
      }),
      disabled: figma.enum("State", {
        Disabled: true,
      }),
      icon: figma.boolean("Leading Icon", {
        true: <DsRemixIcon className="ri-poker-hearts-fill" />,
        false: undefined
      }),
      onDelete: figma.boolean("Trailing Icon", {
        true: () => {},
        false: undefined
      }),
      value: figma.textContent('text'),
      label: figma.textContent('text'),
    },
    example: (props) => <DsTag {...props} />,
  }
);
