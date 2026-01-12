import React from "react";
import figma from "@figma/code-connect";
import { DsRadio } from "./DsRadio.Component";
import { DsFormControlLabel } from "../DsFormControlLabel";
import { DsFormControl } from "../DsFormControl";
import { DsFormLabel } from "../DsFormLabel";
import { DsTypography } from "../DsTypography";

figma.connect(
  DsRadio,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=3027-14472&m=dev",
  {
    props: {
      checked: figma.boolean("🟢 Selected"),
      disabled: figma.enum("🛠️ State", {
        Disable: true,
      }),
    },
    example: (props) => <DsRadio label={undefined} {...props} />,
  }
);

figma.connect(
  DsRadio,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=3027-14295&m=dev",
  {
    props: {
      checked: figma.boolean("🟢 Selected"),
      disabled: figma.enum("🛠️ State", {
        Disable: true,
      }),
      label: figma.enum("🔤 Text", {
        true: figma.textContent("radio-button-text"),
      }),
    },
    example: ({ label, ...radioProps }) => {
      return (
        <DsFormControlLabel
          control={<DsRadio label={label} {...radioProps} />}
          label={label}
        />
      );
    },
  }
);

figma.connect(
  DsRadio,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=3027-14452&m=dev",
  {
    props: {
      listHeading: figma.textContent("radio-list-heading"),
      children: figma.children("*"),
    },
    example: ({ listHeading, children }) => {
      return (
        <DsFormControl>
          <DsFormLabel>
            <DsTypography color={"var(--ds-colour-typoPrimary)"}>
              {listHeading}
            </DsTypography>
          </DsFormLabel>
          {children}
        </DsFormControl>
      );
    },
  }
);
