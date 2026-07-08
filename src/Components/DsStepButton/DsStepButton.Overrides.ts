import { CSSObject } from "@mui/system";
import { DsStepButtonDefaultProps } from "./DsStepButton.Types";

export const DsStepButtonOverrides = {
    MuiStepButton: {
        defaultProps: DsStepButtonDefaultProps,
        styleOverrides: {
            root: {
                width: 'unset', 
                boxSizing:"border-box" 
            } as CSSObject
        }
    }
}
