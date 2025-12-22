import { figma } from "@figma/code-connect";
import { DsFileUploader } from "./DsFileUploader.Component";

// COMPRESSED VERSION
figma.connect(
    DsFileUploader,
    "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=43892-39288&m=dev",
    {
        props: {
            disabled: figma.enum("⚙️ State",    {
                Disabled: true,
                Default: undefined,
            }),
            label: figma.boolean("🔠 Show Header",    {
                true: figma.textContent("label_text"),
                false: undefined,
            }),
            labelSupportText: figma.enum("🔡 Show Subtext",    {
                true: figma.textContent("helper_text"),
                false: undefined,
            }),
        },
        //@ts-ignore
        example: ({ label, labelSupportText, ...props}) => {
            return (
                <DsFileUploader 
                    InputLabelProps={{
                        label: label,
                        labelSupportText: labelSupportText
                    }}
                    name="fileUploader" 
                    onChange={() => {}} 
                    variant="COMPRESSED" 
                    {...props} 
                />
            )
        },
    },  
)

// REGULAR VERSION
figma.connect(
    DsFileUploader,
    "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=39036-3723&m=dev",
    {
        props: {
            disabled: figma.enum("⚙️ Variant",    {
                'Not Uploaded': undefined,
                'Upload Disabled': true,
            }),
        },
        //@ts-ignore
        example: ({ ...props}) => {
            return (
                <DsFileUploader 
                    slotProps={{
                        DropZone: {
                            title: 'Upload document',
                            description: 'Click to browse or drop here to upload',
                        }
                    }}
                    name="fileUploader" 
                    onChange={() => {}} 
                    {...props} 
                />
            )
        },
    },  
)