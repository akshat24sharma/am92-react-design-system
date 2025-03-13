import { useState, useEffect, useCallback } from 'react'
import {
  DS_TYPOGRAPHY_DEFAULT_HTML_FONT_SIZE,
  DS_TYPOGRAPHY_MAX_HTML_FONT_SIZE,
  DS_TYPOGRAPHY_MIN_HTML_FONT_SIZE
} from '../Constants'
import { getCurrentFontSize, isValidFontSize } from '../Helpers'
import { DS_TYPOGRAPHY_HTML_FONT_SIZE } from '../Types'

export const useFontSizeAccessibility = () => {
  let currentFontSize = getCurrentFontSize()
  if (!isValidFontSize(currentFontSize)) {
    currentFontSize = DS_TYPOGRAPHY_DEFAULT_HTML_FONT_SIZE
  }

  const [fontSize, setFontSize] =
    useState<DS_TYPOGRAPHY_HTML_FONT_SIZE>(currentFontSize)

  useEffect(() => {
    const htmlElement = document.documentElement
    htmlElement.style.fontSize = `${fontSize}px`
  }, [fontSize, document.documentElement.style.fontSize])

  const setValidFontSize = useCallback(
    (newFontSize: DS_TYPOGRAPHY_HTML_FONT_SIZE) => {
      if (isValidFontSize(newFontSize)) {
        setFontSize(newFontSize)
      }
    },
    []
  )

  const deltaChangeFontSize = (delta: 1 | -1) => () => {
    const newFontSize = (fontSize + delta) as DS_TYPOGRAPHY_HTML_FONT_SIZE
    if (isValidFontSize(newFontSize)) {
      setFontSize(newFontSize)
    }
  }

  let disableIncrease = fontSize >= DS_TYPOGRAPHY_MAX_HTML_FONT_SIZE
  let disableDecrease = fontSize <= DS_TYPOGRAPHY_MIN_HTML_FONT_SIZE

  return {
    fontSize,
    disableDecrease,
    disableIncrease,
    increaseFontSize: deltaChangeFontSize(1),
    decreaseFontSize: deltaChangeFontSize(-1),
    setFontSize: setValidFontSize
  }
}
