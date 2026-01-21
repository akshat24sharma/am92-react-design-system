import figma from "@figma/code-connect"
import { DsTooltip } from "./DsTooltip.Component"

figma.connect(
    DsTooltip,
    "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=28499-607&m=dev",    {
        props: {
            arrow: figma.boolean("Pointer", {
                true: true,
                false: false,
            }),
            placement: figma.enum("⬆️ Placement", {
                'top-start': 'bottom-start',
                'top-center': 'bottom', 
                'top-end': 'bottom-end',

                'bottom-start': 'top-start',
                'bottom-center': 'top',
                'bottom-end': 'top-end',

                'left-start': 'right-start',
                'left-center': 'right',
                'left-end': 'right-end',

                'right-start': 'left-start',
                'right-center': 'left',
                'right-end': 'left-end',
            }),
            title: figma.boolean("🅰️ Title", {
                true: figma.textContent('title_text'),
                false: undefined
            }),
            description: figma.textContent('body_text'),
        },
        //@ts-ignore
        example: ( ...props) => {
            return (
                <DsTooltip {...props} ><></></DsTooltip>
            )
        },
    },
)