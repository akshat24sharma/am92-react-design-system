import React, { FC, useEffect } from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { register, SwiperContainer } from 'swiper/element'
import { SwiperProps } from 'swiper/swiper-react'

import {
  CAROUSEL_DEFAULT_SETTINGS,
  DsCaroselPaginationSettings,
  DsCarouselProps,
  SWIPER_AUTOPLAY_SETTINGS,
  SWIPER_NAVIGATION_SETTINGS,
  SWIPER_PAGINATION_SETTINGS
} from '../DsCarousel.Types'
import DsCarouselNavigation from './DsCarouselNavigation'
import DsCarouselPagination from './DsCarouselPagination'
import { DsBox } from '../../DsBox'

if (register && typeof register === 'function') {
  register()
}

const generateUid = () => {
  const random = Math.trunc((Math.random() + 1) * 1000000)
  return `${random.toString(36)}`
}

export const DsCarousel: FC<DsCarouselProps> = (props) => {
  let SwiperContainer: SwiperContainer | null = null
  const uid: string = generateUid()


  useEffect(() => {
    initialize()
  }, [])

  const _isNavigationEnabled = () => {
    const { navigation } = props
    return !(
      navigation === false ||
      (navigation &&
        typeof navigation !== 'boolean' &&
        navigation.enabled === false)
    )
  }

  const _isPaginationEnabled = () => {
    const { pagination } = props

    return !(
      pagination === false ||
      (pagination &&
        typeof pagination !== 'boolean' &&
        pagination.enabled === false)
    )
  }

  const _isAutoplayEnabled = () => {
    const { autoplay } = props
    return !(autoplay === false)
  }

  const _getNavigationSettings = (): DsCarouselProps['navigation'] | undefined => {
    const { navigation } = props
    const isEnabled = _isNavigationEnabled()
    const defaultSettings = {
      ...SWIPER_NAVIGATION_SETTINGS,
      nextEl: `${SWIPER_NAVIGATION_SETTINGS.nextEl}-${uid}`,
      prevEl: `${SWIPER_NAVIGATION_SETTINGS.prevEl}-${uid}`
    }

    if (typeof navigation !== 'boolean') {
      return isEnabled ? { ...defaultSettings, ...navigation } : undefined
    }

    return (isEnabled && { ...defaultSettings }) || undefined
  }

  const _getPaginationSettings = (): DsCaroselPaginationSettings | undefined => {
    const { pagination } = props
    const isEnabled = _isPaginationEnabled()

    const defaultSettings = {
      ...SWIPER_PAGINATION_SETTINGS,
      el: `${SWIPER_PAGINATION_SETTINGS.el}-${uid}`
    }

    if (typeof pagination !== 'boolean') {
      return isEnabled ? { ...defaultSettings, ...pagination } : undefined
    }

    return (isEnabled && { ...defaultSettings }) || undefined
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

  const initialize = () => {
    const {
      children,
      PaginationProps,
      NavigationProps,
      PaginationWrapperProps,
      SwiperConatinerStyles,
      SwiperConatinerWrapperProps,
      modules,
      ...swiperProps
    } = props

    const sanitizedModule = _sanitizeModuleProps(modules)

    // swiper parameters
    const swiperParams: SwiperProps = {
      ...CAROUSEL_DEFAULT_SETTINGS,
      ...swiperProps,
      // Vertical mode not supported
      direction: 'horizontal',
      modules: sanitizedModule,
      navigation: _getNavigationSettings() || false,
      pagination: _getPaginationSettings() || false,
      autoplay: _getAutoPlaySettings() || false
    }

    // swiperParams = handleNavigationModule(swiperParams)

    // now we need to assign all parameters to Swiper element
    Object.assign(SwiperContainer || {}, swiperParams)

    // and now initialize it
    SwiperContainer?.initialize()

    // set the default theme
    document.documentElement.style.setProperty(
      '--swiper-theme-color',
      'var(--ds-colour-actionSecondary)'
    )
  }

  const setRef = (swiperRef: unknown) => {
    SwiperContainer = swiperRef as SwiperContainer
  }

    const {
      PaginationWrapperProps,
      SwiperConatinerWrapperProps,
      SwiperConatinerStyles,
      children,
      NavigationProps,
      PaginationProps
    } = props

    const paginationSettings = _getPaginationSettings()

    return (
      <DsBox
        {...PaginationWrapperProps}
        sx={{
          position: 'relative',
          pb: paginationSettings?.mode === 'external' ? '44px' : undefined,
          ...PaginationWrapperProps?.sx
        }}
      >
        <DsBox
          {...SwiperConatinerWrapperProps}
          sx={{
            position: 'relative',
            ...SwiperConatinerWrapperProps?.sx
          }}
        >
          <swiper-container
            ref={setRef}
            init={false}
            style={{
              ...SwiperConatinerStyles
            }}
          >
            {React.Children.map(children, (child, index) => {
              return (
                <swiper-slide key={`${name}-${index}`}>{child}</swiper-slide>
              )
            })}
          </swiper-container>
          <DsCarouselNavigation
            uid={uid}
            isEnabled={_isNavigationEnabled()}
            NavigationProps={NavigationProps}
          />
        </DsBox>
        <DsCarouselPagination
          uid={uid}
          isEnabled={_isPaginationEnabled()}
          isAutoplayEnabled={_isAutoplayEnabled()}
          AutoplaySettings={_getAutoPlaySettings()}
          PaginationSettings={paginationSettings}
          PaginationProps={PaginationProps}
        />
      </DsBox>
    )
}
