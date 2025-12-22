import figma from "@figma/code-connect"
import { DsMenuItem } from "./DsMenuItem.Component"
import { DsMenu } from "../DsMenu/"

figma.connect(
    DsMenuItem,
    "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=5055-29817&m=dev",
    {
        props: {
            selected: figma.enum("🛠️ State", {
                Default: false,
                Hover: false,
                Pressed: false,
                Selected: true,
            }),
            text: figma.textContent('menu_item_text'),
        },
        //@ts-ignore
        example: ({ text, ...props}) => {
            return (
                <DsMenuItem {...props}>{text}</DsMenuItem>
            )
        },
    },
)

figma.connect(
    DsMenu,
    "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=5055-29828&m=dev",
    {
        props: {
            children: figma.children('*'),
        },
        //@ts-ignore
        example: ({ children, ...props}) => {
            return (
                <DsMenu open {...props}>{children}</DsMenu>
            )
        },
    },
)
