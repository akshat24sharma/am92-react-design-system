import React from "react"
import figma from "@figma/code-connect"
import { DsProgressTracker } from "./DsProgressTracker.Component"


figma.connect(
  DsProgressTracker,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=5058-32759&m=dev",
  {
    props: {
      'progressVariant': figma.enum("🛠️ State", {
        Default: 'default',
        Header: 'header',
        Steps: 'steps',
      })
    },
    example: ({ progressVariant,  ...props}) => <DsProgressTracker ds-variant={progressVariant} steps={[{ stepName: 'Verification' }, { stepName: 'Shipping' }, { stepName: 'Payment' }, { stepName: 'Review' }]} activeStep={0} {...props} />,
  },
)

figma.connect(
  DsProgressTracker,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=34789-998&m=dev",
  {
    props: {
      stepLabelVisible: figma.boolean("🅰️ Step name", {
        true: true,
        false: false,
      }),
    },
    example: (props) => <DsProgressTracker ds-variant="default" dense steps={[]} activeStep={0} {...props} />,
  },
)

