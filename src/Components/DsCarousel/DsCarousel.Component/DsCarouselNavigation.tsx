import * as React from 'react'

import { DsCarouselNavigationProps } from '../DsCarousel.Types'
import { DsIconButton } from '../../DsIconButton'
import { DsRemixIcon } from '../../DsRemixIcon'
import { DsBox } from '../../DsBox'

const DsCarouselNavigation: React.FC<DsCarouselNavigationProps> = props => {
  const { isEnabled, NavigationProps = {} } = props
  if (!isEnabled) {
    return false
  }

  const {
    PrevButtonProps = {},
    NextButtonProps = {},
    NavigationWrapperProps
  } = NavigationProps

  const { IconProps: PrevIconProps, ...PrevIconButtonProps } = PrevButtonProps
  const { IconProps: NextIconProps, ...NextIconButtonProps } = NextButtonProps

  return (
    <DsBox
      sx={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 'inherit',
        px: 'var(--ds-spacing-mild)',
        '> .MuiIconButton-root': {
          p: 'var(--ds-spacing-quickFreeze)',
          borderRadius: 'var(--ds-radius-bitterCold)',
          backgroundColor: 'var(--ds-colour-surfaceSecondary)',
          zIndex: 1,
          '&:hover': {
            backgroundColor: 'var(--ds-colour-stateSelectedPrimaryHover)'
          },
          '&.Mui-disabled': {
            pointerEvents: 'unset'
          }
        },
        ...NavigationWrapperProps?.sx
      }}
      {...NavigationWrapperProps}
    >
      <DsIconButton
        className={`swiper-button-prev-custom`}
        {...PrevIconButtonProps}
      >
        <DsRemixIcon className='ri-arrow-left-s-line' {...PrevIconProps} />
      </DsIconButton>
      <DsIconButton
        className={`swiper-button-next-custom`}
        {...NextIconButtonProps}
      >
        <DsRemixIcon className='ri-arrow-right-s-line' {...NextIconProps} />
      </DsIconButton>
    </DsBox>
  )
}

export default DsCarouselNavigation
