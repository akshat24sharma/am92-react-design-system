import React from 'react'

import { SwiperProps } from 'swiper/swiper-react'
import { DsBoxProps } from '../DsBox'
import { DsIconButtonProps } from '../DsIconButton'
import { DsRemixIconProps } from '../DsRemixIcon'

export interface DsCarouselNavigationButtonProps extends DsIconButtonProps {
  IconProps?: Omit<DsRemixIconProps, 'ref'>
}

export interface DsCarouselNavigationProps {
  isExternalPagination: boolean
  isEnabled: boolean
  NavigationProps?: {
    PrevButtonProps?: DsCarouselNavigationButtonProps
    NextButtonProps?: DsCarouselNavigationButtonProps
  }
}

export interface DsCarouselPaginationProps {
  isEnabled: boolean
  isAutoplayEnabled: boolean
  AutoplaySettings: DsCarouselProps['autoplay']
  PaginationSettings?: DsCarouselProps['pagination']
  PaginationProps?: DsBoxProps
}

type DsCarouselPaginationMode = 'internal' | 'external'

export type DsCaroselPaginationSettings = SwiperProps['pagination'] & {
  mode?: DsCarouselPaginationMode
}

export interface DsCarouselProps
  extends Omit<SwiperProps, 'direction' | 'pagination'>,
    Omit<DsCarouselNavigationProps, 'isExternalPagination' | 'uid' | 'isEnabled'>,
    Omit<
      DsCarouselPaginationProps,
      'uid' | 'isEnabled' | 'isAutoplayEnabled' | 'AutoplaySettings'
    > {
  PaginationWrapperProps?: DsBoxProps
  SwiperConatinerWrapperProps?: SwiperConatinerWrapperProps
  SwiperConatinerStyles?: React.CSSProperties
  // Vertical mode not supported
  direction?: 'horizontal'
  pagination?: DsCaroselPaginationSettings
}

export interface SwiperConatinerWrapperProps extends DsBoxProps {
  transitionSpeed: number
  isAutoplayEnabled: boolean
  isExternalPagination: boolean
}

export const CAROUSEL_DEFAULT_SETTINGS: DsCarouselProps = {
  edgeSwipeDetection: true,
  grabCursor: true,
  keyboard: true,
  virtual: true
}

export const DsCarouselDefaultProps: DsCarouselProps = CAROUSEL_DEFAULT_SETTINGS

export const SWIPER_NAVIGATION_SETTINGS = {
  enabled: true,
  nextEl: '.swiper-button-next-custom',
  prevEl: '.swiper-button-prev-custom',
  disabledClass: 'Mui-disabled',
  navigationDisabledClass: 'Mui-disabled'
}

export const SWIPER_PAGINATION_SETTINGS = {
  enabled: true,
  mode: 'internal' as DsCarouselPaginationMode
}

export const SWIPER_AUTOPLAY_SETTINGS = {
  delay: 3000,
  pauseOnMouseEnter: true
}
