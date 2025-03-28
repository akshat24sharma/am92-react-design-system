import { styled } from '@mui/material'
import { DsBox } from '../../DsBox'
import { SwiperContainerWrapperProps } from '../DsCarousel.Types'

export const DsCarouselStyledWrapper = styled(DsBox, {
  shouldForwardProp: prop =>
    !['isAutoplayEnabled', 'transitionSpeed', 'isExternalPagination'].includes(
      prop as string
    )
})<SwiperContainerWrapperProps>(
  ({ isAutoplayEnabled, transitionSpeed, isExternalPagination, sx }) => ({
    '.swiper-pagination': {
      position: 'absolute',
      textAlign: 'center',
      transition: '300ms opacity',
      transform: 'translate3d(0, 0, 0)',
      zIndex: 1,
      '>.swiper-pagination-hidden': {
        opacity: 0
      },
      '&.swiper-pagination-disabled': {
        display: 'none !important'
      },
      '> .swiper-pagination-bullet': {
        width: '6px',
        height: '6px',
        display: 'inline-block',
        borderRadius: 'var(--ds-radius-bitterCold)',
        opacity: 1,
        margin: 'var(--ds-spacing-deepFreeze)',
        background:
          'linear-gradient(to right, var(--ds-colour-actionSecondary), var(--ds-colour-actionSecondary)) no-repeat, linear-gradient(to right, var(--ds-colour-stateUnselectedDefault), var(--ds-colour-stateUnselectedDefault)) no-repeat',
        backgroundSize: '0% 100%, 100% 100%',
        backgroundPosition: '0 0, 0 0',
        '&:only-child': {
          display: 'none !important'
        },
        '&.swiper-pagination-bullet-active': {
          width: isAutoplayEnabled ? '20px' : '16px',
          background: isAutoplayEnabled
            ? 'linear-gradient(to right, var(--ds-colour-actionSecondary), var(--ds-colour-actionSecondary)) no-repeat, linear-gradient(to right, var(--ds-colour-stateUnselectedDefault), var(--ds-colour-stateUnselectedDefault)) no-repeat'
            : 'var(--ds-colour-actionSecondary)',
          opacity: 1,
          borderRadius: 'var(--ds-radius-bitterCold)',
          backgroundSize: '100% 100%, 100% 100%',
          backgroundPosition: '0 0 , 100% 0',
          transition: `width 0.5s, background-size ${transitionSpeed / 1000}s`
        }
      },
      '&.swiper-pagination-clickable > .swiper-pagination-bullet': {
        cursor: 'pointer'
      },
      '&.swiper-pagination-bullets-dynamic': {
        overflow: 'hidden',
        fontSize: 0,
        '> .swiper-pagination-bullet': {
          transform: 'scale(0.33)',
          position: 'relative',
          '&.swiper-pagination-bullet-active': {
            transform: 'scale(1)'
          },
          '&.swiper-pagination-bullet-active-prev': {
            transform: 'scale(0.66)'
          },
          '&.swiper-pagination-bullet-active-prev-prev': {
            transform: 'scale(0.33)'
          },
          '&.swiper-pagination-bullet-active-next': {
            transform: 'scale(0.66)'
          },
          '&.swiper-pagination-bullet-active-next-next': {
            transform: 'scale(0.33)'
          }
        }
      },
      '&.swiper-pagination-horizontal.swiper-pagination-bullets': {
        bottom: !isExternalPagination
          ? 'var(--ds-spacing-frostbite)'
          : 'var(--ds-spacing-zero)',
        top: 'auto',
        left: 0,
        width: '100%',
        '&.swiper-pagination-bullets-dynamic': {
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          '> .swiper-pagination-bullet': {
            transition: '200ms transform, 200ms left',
            '&.swiper-pagination-bullet-active': {
              transition: `width 0.5s, background-size ${
                transitionSpeed / 1000
              }s, 200ms transform, 200ms left`
            }
          }
        }
      },
      ...sx
    }
  })
)
