import React from "react";

/**
 * Updates the tab indicator position and width based on cached tab sizes.
 * This creates a more precise indicator that fits the text rather than the full tab width.
 *
 * @param textFit - Whether text fitting is enabled
 * @param tabsRef - Reference to the tabs container element
 * @param tabSizes - Map containing cached tab sizes
 * @param fallbackUpdateSizes - Function to call if measurements aren't ready
 */
export const updateIndicator = (
  textFit: boolean,
  tabsRef: React.RefObject<HTMLDivElement>,
  tabSizes: Map<string, { textWidth: number; left: number; tabWidth: number }>,
  fallbackUpdateSizes: () => void
): void => {
  if (!textFit) return;

  const tabsElement = tabsRef?.current;
  if (!tabsElement) return;

  const indicator = tabsElement.querySelector(
    ".MuiTabs-indicator"
  ) as HTMLElement;
  const activeTab = tabsElement.querySelector(".Mui-selected") as HTMLElement;

  if (!indicator || !activeTab) return;

  // Get the index of the active tab
  const tabElements = Array.from(tabsElement.querySelectorAll(".MuiTab-root"));
  const activeTabIndex = tabElements.indexOf(activeTab);
  const activeTabSize = tabSizes.get(`tab-${activeTabIndex}`);

  if (indicator && activeTabSize) {
    indicator.style.width = `${activeTabSize.textWidth}px`;

    // Center the indicator under the text using fully cached data
    const tabCenter = activeTabSize.left + activeTabSize.tabWidth / 2;
    const indicatorLeft = tabCenter - activeTabSize.textWidth / 2;
    indicator.style.left = `${indicatorLeft}px`;
  } else if (indicator) {
    // Fallback: if measurements aren't ready, remeasure immediately
    fallbackUpdateSizes();
  }
};
