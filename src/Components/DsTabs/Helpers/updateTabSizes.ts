import React from "react";

/**
 * Measures all tab sizes and returns them as a Map.
 * This approach reduces repeated DOM measurements and improves performance.
 *
 * @param textFit - Whether text fitting is enabled
 * @param tabsRef - Reference to the tabs container element
 * @returns Map containing tab sizes with width and left position
 */
export const updateTabSizes = (
  textFit: boolean,
  tabsRef: React.RefObject<HTMLDivElement>
): Map<string, { textWidth: number; left: number; tabWidth: number }> => {
  if (!textFit) return new Map();

  const tabsElement = tabsRef?.current;
  if (!tabsElement) return new Map();

  const newSizes = new Map<
    string,
    { textWidth: number; left: number; tabWidth: number }
  >();
  const tabElements = tabsElement.querySelectorAll(".MuiTab-root");
  const containerRect = tabsElement.getBoundingClientRect();

  tabElements.forEach((tab: Element, index: number) => {
    const tabRect = tab.getBoundingClientRect();

    // Use canvas to measure actual text width (more accurate)
    const textContent = tab.textContent || "";
    const computedStyle = window.getComputedStyle(tab);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      context.font = `
        ${computedStyle.fontWeight}
        ${computedStyle.fontSize}
        ${computedStyle.fontFamily}
      `;
      const textWidth = context.measureText(textContent).width;

      newSizes.set(`tab-${index}`, {
        textWidth: textWidth,
        left: tabRect.left - containerRect.left,
        tabWidth: tabRect.width,
      });
    }
  });

  return newSizes;
};
