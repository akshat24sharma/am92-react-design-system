import React, { useMemo } from 'react'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

import {
  DsCaroselPaginationSettings,
  DsCarouselProps,
  SWIPER_AUTOPLAY_SETTINGS,
  SWIPER_NAVIGATION_SETTINGS,
  SWIPER_PAGINATION_SETTINGS
} from '../DsCarousel.Types'
import DsCarouselNavigation from './DsCarouselNavigation'
import { DsCarouselStyledWrapper } from './DsCarouselStyledWrapper'

export const DsCarousel = (props: DsCarouselProps) => {
  const _isPaginationEnabled = () => {
    const { pagination } = props

    return !(
      pagination === false ||
      (pagination &&
        typeof pagination !== 'boolean' &&
        pagination.enabled === false)
    )
  }

  const _getPaginationSettings = ():
    | DsCaroselPaginationSettings
    | undefined => {
    const { pagination } = props
    const isEnabled = _isPaginationEnabled()

    const defaultSettings = {
      ...SWIPER_PAGINATION_SETTINGS
    }

    if (typeof pagination !== 'boolean') {
      return isEnabled ? { ...defaultSettings, ...pagination } : undefined
    }

    return (isEnabled && { ...defaultSettings }) || undefined
  }

  const _isAutoplayEnabled = () => {
    const { autoplay } = props
    return autoplay ? !((autoplay as boolean) === false) : false
  }

  const _isNavigationEnabled = () => {
    const { navigation } = props
    return !(
      navigation === false ||
      (navigation &&
        typeof navigation !== 'boolean' &&
        navigation.enabled === false)
    )
  }

  const _getAutoPlaySettings = (): DsCarouselProps['autoplay'] | undefined => {
    const { autoplay } = props
    const isEnabled = _isAutoplayEnabled()

    if (typeof autoplay !== 'boolean') {
      return isEnabled
        ? { ...SWIPER_AUTOPLAY_SETTINGS, ...autoplay }
        : undefined
    }

    return (isEnabled && { ...SWIPER_AUTOPLAY_SETTINGS }) || undefined
  }

  const _sanitizeModuleProps = (
    modules: SwiperProps['modules']
  ): SwiperProps['modules'] => {
    let sanitizedModule =
      modules?.filter(
        module => !['Pagination', 'Navigation'].includes(module.name)
      ) || []

    const isNavigationEnabled = _isNavigationEnabled()
    if (isNavigationEnabled) {
      sanitizedModule = [...sanitizedModule, Navigation]
    }

    const isPaginationEnabled = _isPaginationEnabled()
    if (isPaginationEnabled) {
      sanitizedModule = [...sanitizedModule, Pagination]
    }

    const isAutoplayEnabled = _isAutoplayEnabled()
    if (isAutoplayEnabled) {
      sanitizedModule = [...sanitizedModule, Autoplay]
    }

    return sanitizedModule
  }

  const _getNavigationSettings = ():
    | DsCarouselProps['navigation']
    | undefined => {
    const { navigation } = props
    const isEnabled = _isNavigationEnabled()
    const defaultSettings = {
      ...SWIPER_NAVIGATION_SETTINGS
    }

    if (typeof navigation !== 'boolean') {
      return isEnabled ? { ...defaultSettings, ...navigation } : undefined
    }

    return (isEnabled && { ...defaultSettings }) || undefined
  }

  const {
    SwiperContainerWrapperProps,
    SwiperContainerStyles,
    children,
    NavigationProps,
    pagination,
    navigation,
    autoplay,
    modules,
    ...swiperProps
  } = props

  const paginationSettings = useMemo(
    () => _getPaginationSettings(),
    [pagination]
  )
  const navigationSettings = useMemo(
    () => _getNavigationSettings(),
    [navigation]
  )
  const autoPlaySettings = useMemo(() => _getAutoPlaySettings(), [autoplay])
  const moduleSettings = useMemo(() => _sanitizeModuleProps(modules), [modules])

  let transitionSpeed = 0
  const isAutoplayEnabled = _isAutoplayEnabled()

  if (isAutoplayEnabled) {
    transitionSpeed =
      (typeof autoPlaySettings !== 'boolean' && autoPlaySettings?.delay) || 3000
  }

  const isExternalPagination = paginationSettings?.mode === 'external'

  return (
    <DsCarouselStyledWrapper
      isAutoplayEnabled={isAutoplayEnabled}
      transitionSpeed={transitionSpeed}
      isExternalPagination={isExternalPagination}
      {...SwiperContainerWrapperProps}
    >
      <Swiper
        pagination={paginationSettings}
        navigation={navigationSettings}
        modules={moduleSettings}
        autoplay={autoPlaySettings}
        style={{
          paddingBottom: isExternalPagination ? '44px' : undefined,
          ...SwiperContainerStyles
        }}
        {...swiperProps}
        // Vertical mode not supported
        direction='horizontal'
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={`${name}-${index}`}>{child}</SwiperSlide>
        ))}
        <DsCarouselNavigation
          isEnabled={_isNavigationEnabled()}
          NavigationProps={NavigationProps}
        />
      </Swiper>
    </DsCarouselStyledWrapper>
  )
}
