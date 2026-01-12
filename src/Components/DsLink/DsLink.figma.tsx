import figma from "@figma/code-connect"
import { DsLink } from "./DsLink.Component"

figma.connect(
    DsLink,
    "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=5055-29652&m=dev",
    {
        props: {
            underline: figma.enum("⚙️ Variant", {
                Text: 'hover',
                'Inline Text': 'always',
            }),
            disabled: figma.enum("🛠️ State", {
                Disabled: true,
                Hover: undefined,
                Active: undefined,
                Focus: undefined,
                Visited: undefined,
            }),
            // FIXME: text layer doent have a name in figma, so we use children as a workaround
            children: figma.children('*'),
        },
        //@ts-ignore
        example: ({ children, ...props}) => {
            return (
                <DsLink {...props}>{children}</DsLink>
            )
        },
    },
)
