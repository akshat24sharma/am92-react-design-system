import figma from "@figma/code-connect"
import { DsBreadcrumbs } from "./DsBreadcrumbs.Component"
import { DsLink } from "../DsLink"
import { DsTypography } from "../DsTypography"


figma.connect(
  DsBreadcrumbs,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=6705-3106&m=dev",
  {
    props: {
      children: figma.textContent('Breadcrumb'),
      currentChild: figma.textContent('Current page'),
      type: figma.enum('🛠️ State', {
        'Current': 'current',
        'Enabled': 'enabled',
      })

    },
    example: ({ children, currentChild, type, ...props}) => {
      return (
        <DsLink>
          {children}
        </DsLink>
      );
    },
  },
)

// Breadcrumb Group Component
figma.connect(
  DsBreadcrumbs,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=6705-3138&m=dev",
  {
    props: {
      maxItems: figma.enum('⚙️ Variant', {
        '2': 2,
        '3': 3,
        '4': 4,
        'Overflow': 5
      }),
      children: figma.children("*")
    },
    example: ({ maxItems, children }) => (
      <DsBreadcrumbs maxItems={maxItems}>
        {children}
      </DsBreadcrumbs>
    ),
  },
)

