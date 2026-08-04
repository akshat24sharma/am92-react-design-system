import { Breakpoint, useTheme } from '@mui/material/styles'
import { Subtract } from 'utility-types'
import { useBreakPoints } from '../Hooks'

type BreakpointsMap = { [key in Breakpoint]?: boolean }
type BreakpointsValues = { [key in Breakpoint]?: number }

/**
 * Basic Interface to extend in components wrapping the below HOC.
 *
 * @export
 * @interface IwithBreakpoints
 */
export interface IwithBreakpoints {
  breakpoints: BreakpointsMap
  breakpointsValues: BreakpointsValues
}

/**
 * HOC to provide breakpoints features
 *
 * @template P
 * @param Child
 * @returns
 */
export function withBreakpoints<P extends IwithBreakpoints>(
  Child: React.ComponentType<P>
) {
  return (props: Subtract<P, IwithBreakpoints>): React.JSX.Element => {
    const theme = useTheme()
    const { breakpoints } = useBreakPoints()

    return (
      <Child
        {...(props as P)}
        breakpointsValues={theme.breakpoints}
        breakpoints={breakpoints}
      />
    )
  }
}
