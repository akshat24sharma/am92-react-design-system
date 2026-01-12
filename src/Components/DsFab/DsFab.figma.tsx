import figma from "@figma/code-connect"
import { DsFab } from "./DsFab.Component"

figma.connect(
    DsFab,
    "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=4557-28741&m=dev",
    {
        props: {
            color: figma.enum("🛠️ Status", {
                Primary: 'primary',
                Close: 'default',
                Default: 'secondary'
            }),
            size: figma.enum("📏 Size", {
                M: "medium",
                S: "small",
            }),
            text: figma.boolean("🔤 Text", {
                true: figma.textContent('button_text'),
                false: undefined,
            }),
            icon: figma.boolean("💡 Icon", {
                true: figma.children('remix-icons*'),
                false: undefined,
            }),
        },
        //@ts-ignore
        example: ({ text, icon, ...props}) => {
            return (
                <DsFab {...props}>
                    {icon}
                    {text}
                </DsFab>
            )
        },
    },
)