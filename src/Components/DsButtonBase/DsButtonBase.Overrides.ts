import { DsButtonBaseDefaultProps } from "./DsButtonBase.Types";

export const DsButtonBaseOverrides = {
    MuiButtonBase: {
        defaultProps: DsButtonBaseDefaultProps,
        styleOverrides: {
            root: {
                fontFamily: 'inherit'
            }
        }
    }
}
