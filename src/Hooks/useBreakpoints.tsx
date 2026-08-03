import type { Breakpoint } from '@mui/system'
import { useMediaQuery } from '@mui/system'
import { useTheme } from '../styles'
type BreakpointsMap = { [key in Breakpoint]?: boolean }

export interface IwithBreakpoint {
  breakpoints: BreakpointsMap
}

export function useBreakPoints(): IwithBreakpoint {
  const theme = useTheme()
  const { keys } = theme.breakpoints

  const breakpoints: BreakpointsMap = {}

  // This is a known anti pattern, but used so that implementor can override at thier own end.
  keys.forEach((key: Breakpoint) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    breakpoints[key] = useMediaQuery(theme.breakpoints.only(key))
  })

  return {
    breakpoints
  }
}