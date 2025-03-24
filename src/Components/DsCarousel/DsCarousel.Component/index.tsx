import React from "react";
// Import Swiper React components
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

import {
  DsCaroselPaginationSettings,
  DsCarouselProps,
  SWIPER_AUTOPLAY_SETTINGS,
  SWIPER_NAVIGATION_SETTINGS,
  SWIPER_PAGINATION_SETTINGS,
} from "../DsCarousel.Types";
import DsCarouselNavigation from "./DsCarouselNavigation";
import { DsCarouselWrapper } from "./DsCarouselWrapper";

export const DsCarousel = (props: DsCarouselProps) => {
    
  const _isPaginationEnabled = () => {
    const { pagination } = props;

    return !(
      pagination === false ||
      (pagination &&
        typeof pagination !== "boolean" &&
        pagination.enabled === false)
    );
  };

  const _getPaginationSettings = ():
    | DsCaroselPaginationSettings
    | undefined => {
    const { pagination } = props;
    const isEnabled = _isPaginationEnabled();

    const defaultSettings = {
      ...SWIPER_PAGINATION_SETTINGS,
    };

    if (typeof pagination !== "boolean") {
      return isEnabled ? { ...defaultSettings, ...pagination } : undefined;
    }

    return (isEnabled && { ...defaultSettings }) || undefined;
  };

  const _isAutoplayEnabled = () => {
    const { autoplay } = props;
    return autoplay ? !((autoplay as boolean) === false) : false;
  };

  const _isNavigationEnabled = () => {
    const { navigation } = props;
    return !(
      navigation === false ||
      (navigation &&
        typeof navigation !== "boolean" &&
        navigation.enabled === false)
    );
  };

  const _getAutoPlaySettings = (): DsCarouselProps["autoplay"] | undefined => {
    const { autoplay } = props;
    const isEnabled = _isAutoplayEnabled();

    if (typeof autoplay !== "boolean") {
      return isEnabled
        ? { ...SWIPER_AUTOPLAY_SETTINGS, ...autoplay }
        : undefined;
    }

    return (isEnabled && { ...SWIPER_AUTOPLAY_SETTINGS }) || undefined;
  };

  const _sanitizeModuleProps = (
    modules: SwiperProps["modules"]
  ): SwiperProps["modules"] => {
    let sanitizedModule =
      modules?.filter(
        (module) => !["Pagination", "Navigation"].includes(module.name)
      ) || [];

    const isNavigationEnabled = _isNavigationEnabled();
    if (isNavigationEnabled) {
      sanitizedModule = [...sanitizedModule, Navigation];
    }

    const isPaginationEnabled = _isPaginationEnabled();
    if (isPaginationEnabled) {
      sanitizedModule = [...sanitizedModule, Pagination];
    }

    const isAutoplayEnabled = _isAutoplayEnabled();
    if (isAutoplayEnabled) {
      sanitizedModule = [...sanitizedModule, Autoplay];
    }

    return sanitizedModule;
  };

  const _getNavigationSettings = ():
    | DsCarouselProps["navigation"]
    | undefined => {
    const { navigation } = props;
    const isEnabled = _isNavigationEnabled();
    const defaultSettings = {
      ...SWIPER_NAVIGATION_SETTINGS,
      nextEl: `${SWIPER_NAVIGATION_SETTINGS.nextEl}`,
      prevEl: `${SWIPER_NAVIGATION_SETTINGS.prevEl}`,
    };

    if (typeof navigation !== "boolean") {
      return isEnabled ? { ...defaultSettings, ...navigation } : undefined;
    }

    return (isEnabled && { ...defaultSettings }) || undefined;
  };

  const paginationSettings = _getPaginationSettings();

  const {
    PaginationWrapperProps,
    SwiperConatinerWrapperProps,
    SwiperConatinerStyles,
    children,
    NavigationProps,
    PaginationProps,
    pagination,
    navigation,
    autoplay,
    modules,
    ...swiperProps
  } = props;

  let transitionSpeed = 0;
  const isAutoplayEnabled = _isAutoplayEnabled();

  if (isAutoplayEnabled) {
    const autoplaySettings = _getAutoPlaySettings();
    transitionSpeed =
      (typeof autoplaySettings !== "boolean" && autoplaySettings?.delay) ||
      3000;
  }

  return (
    <DsCarouselWrapper
      isAutoplayEnabled={isAutoplayEnabled}
      transitionSpeed={transitionSpeed}
      isExternalPagination={paginationSettings?.mode === "external"}
      {...SwiperConatinerWrapperProps}
    >
      <Swiper
        pagination={_getPaginationSettings()}
        navigation={_getNavigationSettings()}
        modules={_sanitizeModuleProps(modules)}
        autoplay={_getAutoPlaySettings()}
        style={{
          paddingBottom:
            paginationSettings?.mode === "external" ? "44px" : undefined,
          ...SwiperConatinerStyles,
        }}
        {...swiperProps}
        // Vertical mode not supported
        direction="horizontal"
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={`${name}-${index}`}>{child}</SwiperSlide>
        ))}
        <DsCarouselNavigation
          isExternalPagination={paginationSettings?.mode === "external"}
          isEnabled={_isNavigationEnabled()}
          NavigationProps={NavigationProps}
        />
      </Swiper>
    </DsCarouselWrapper>
  );
};
