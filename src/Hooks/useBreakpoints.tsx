// import type { Breakpoint } from '@am92/react-design-system'
// import { useMediaQuery, useTheme } from '@am92/react-design-system'
import type { Breakpoint } from '@mui/system'
import { useMediaQuery } from '@mui/system'
import { useTheme } from '../styles'
type BreakpointsMap = { [key in Breakpoint]?: boolean }

export interface IwithBreakpoint {
  breakpoints: BreakpointsMap
}

export function useBreakpoints(): IwithBreakpoint {
  const theme = useTheme()
  const { keys } = theme.breakpoints

  const breakpoints: BreakpointsMap = {}

  keys.forEach((key: Breakpoint) => {
    breakpoints[key] = useMediaQuery(theme.breakpoints.only(key))
  })

  return {
    breakpoints
    // breakpointsValues: theme.breakpoints
  }
}
