import figma from "@figma/code-connect"
import { DsDialog } from "./DsDialog.Component"

figma.connect(
    DsDialog,
    "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=55817-6293&m=dev",
    {
        props: {
            color: figma.enum("Kicker", {
                Primary: 'primary',
                Close: 'default',
                Default: 'secondary'
            }),
            title: figma.textContent('title-text'),
            description: figma.boolean("Sub-Heading", {
                true: figma.textContent('subtitle-text'),
                false: undefined,
            }),
            kicker: figma.boolean("Kicker", {
                true: figma.textContent('kicker-text'),
                false: undefined,
            }),
            showClose: figma.boolean("Close button", {
                true: true,
                false: false,
            }),
            'primaryButtonText': 'Button',
            'secondaryButtonText': 'Close',
            'primaryButtonProps': { onClick: () => {} }
        },
        //@ts-ignore
        example: ( props) => {
            return (
                <DsDialog open {...props}>

                </DsDialog>
            )
        },
    },
)