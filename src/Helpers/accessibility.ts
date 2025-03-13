import {
  DS_TYPOGRAPHY_DEFAULT_HTML_FONT_SIZE,
  DS_TYPOGRAPHY_MIN_HTML_FONT_SIZE,
  DS_TYPOGRAPHY_MAX_HTML_FONT_SIZE
} from '../Constants'
import { DS_TYPOGRAPHY_HTML_FONT_SIZE } from '../Types'

export const getCurrentFontSize = () => {
  const htmlElement = document.documentElement
  const computedFontSize = window.getComputedStyle(htmlElement).fontSize
  if (computedFontSize) {
    const parsedFontSize = parseInt(
      computedFontSize,
      10
    ) as DS_TYPOGRAPHY_HTML_FONT_SIZE
    return parsedFontSize
  }

  return DS_TYPOGRAPHY_DEFAULT_HTML_FONT_SIZE
}

export const isValidFontSize = (fontSize: DS_TYPOGRAPHY_HTML_FONT_SIZE) => {
  return (
    fontSize >= DS_TYPOGRAPHY_MIN_HTML_FONT_SIZE &&
    fontSize <= DS_TYPOGRAPHY_MAX_HTML_FONT_SIZE
  )
}
