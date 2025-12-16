import React from 'react'

import { SwiperProps } from 'swiper/swiper-react'
import { DsBoxProps } from '../DsBox'
import { DsIconButtonProps } from '../DsIconButton'
import { DsRemixIconProps } from '../DsRemixIcon'

export interface DsCarouselNavigationButtonProps extends DsIconButtonProps {

  /** This Propperty can be used to pass icon props to the navigation buttons. */
  IconProps?: Omit<DsRemixIconProps, 'ref'>
}

export interface DsCarouselNavigationProps {
  isEnabled: boolean
  /** This Property can be used to pass Navigation props
   * @enum  PrevButtonProps, NextButtonProps, NavigationWrapperProps
  */
  NavigationProps?: {

    /** This property can be used to provide props to Icon navigation buttons
     * @default DsIconButtonProps
     */
    PrevButtonProps?: DsCarouselNavigationButtonProps

    /** This property can be used to provide props to Icon navigation buttons
    * @default DsIconButtonProps
    */
    NextButtonProps?: DsCarouselNavigationButtonProps
    
    /** This property can be used to provide navigation wrapper props as DsBoxProps */
    NavigationWrapperProps?: DsBoxProps
  }
}

type DsCarouselPaginationMode = 'internal' | 'external'

export type DsCaroselPaginationSettings = SwiperProps['pagination'] & {

  /** This property can be used to prove the position mode for pagination */
  mode?: DsCarouselPaginationMode
}

export interface DsCarouselProps
  extends Omit<SwiperProps, 'direction' | 'pagination'>,
    Omit<DsCarouselNavigationProps, | 'isEnabled'> {

    /** This property can be used to pass Swiper Wrapper props which is BoxProps  */
    SwiperContainerWrapperProps?: Omit<SwiperContainerWrapperProps, 'transitionSpeed' | 'isAutoplayEnabled' | 'isExternalPagination'>

  /** This property can be used to add container styled to Swiper element  */
  SwiperContainerStyles?: React.CSSProperties

  // Vertical mode not supported
  /** This property can be used to provide swiper direction  */
  direction?: 'horizontal'

  /** This property can be used to provide pagination props 
   * @enum mode
  */
  pagination?: DsCaroselPaginationSettings
}

export interface SwiperContainerWrapperProps extends DsBoxProps {
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
