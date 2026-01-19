import React, { useCallback, useEffect, useRef, useState } from "react";
import { Tabs } from "@mui/material";
import { DsTabsProps, DsTabsDefaultProps } from "./DsTabs.Types";
import {
  updateTabSizes as updateTabSizesHelper,
  updateIndicator as updateIndicatorHelper,
} from "./Helpers";

export const DsTabs = React.forwardRef<HTMLDivElement, DsTabsProps>(
  (inProps, ref) => {
    const props = { ...DsTabsDefaultProps, ...inProps };
    const { "ds-variant": dsVariant, ...otherProps } = props;
    const { textFit = false } = props;

    const internalRef = useRef<HTMLDivElement>(null);
    const tabsRef = ref || internalRef;

    // State to store measured tab sizes for better performance
    const [tabSizes, setTabSizes] = useState<
      Map<string, { textWidth: number; left: number; tabWidth: number }>
    >(new Map());

    // Function to measure tab sizes
    const updateTabSizes = useCallback(() => {
      const newSizes = updateTabSizesHelper(
        textFit,
        tabsRef as React.RefObject<HTMLDivElement>
      );
      setTabSizes(newSizes);
    }, [textFit]);

    // Update indicator style based on active tab
    const updateIndicator = useCallback(() => {
      updateIndicatorHelper(
        textFit,
        tabsRef as React.RefObject<HTMLDivElement>,
        tabSizes,
        updateTabSizes
      );
    }, [textFit, tabSizes, updateTabSizes]);

    /**
     * Main effect: Sets up MutationObserver to watch for tab changes
     * and handles the initial indicator width update.
     */
    useEffect(() => {
      if (!textFit) return;

      const tabsElement = (tabsRef as React.RefObject<HTMLDivElement>)?.current;
      if (!tabsElement) return;

      // Watch for DOM changes that might indicate a tab switch
      const observer = new MutationObserver((mutations) => {
        // Only update if a tab's class actually changed (indicating tab selection change)
        const hasTabClassChange = mutations.some((mutation) => {
          const target = mutation.target as HTMLElement;

          return (
            (mutation.attributeName === "class" &&
              target.classList.contains("MuiTab-root")) ||
            (mutation.attributeName === "style" &&
              target.classList.contains("MuiTabs-indicator"))
          );
        });

        if (hasTabClassChange) {
          requestAnimationFrame(() => {
            updateTabSizes();
          });
        }
      });

      // Observe the entire tabs container and its children
      observer.observe(tabsElement, {
        attributes: true,
        attributeFilter: ["class", "style"], // Only watch for class and style changes
        subtree: true, // Watch children too (individual tabs)
      });
      // Initial measurement
      updateTabSizes();

      // Cleanup: disconnect observer and remove event listener
      return () => {
        observer.disconnect();
      };
    }, [textFit, updateTabSizes]);

    // Update when tab sizes change
    useEffect(() => {
      updateIndicator();
    }, [updateIndicator]);

    return (
      <Tabs
        ref={tabsRef}
        ds-variant={dsVariant}
        textFit={textFit}
        {...otherProps}
      />
    );
  }
);
