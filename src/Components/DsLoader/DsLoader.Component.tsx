import React, { FC } from 'react'

import {
  DS_LOADER_DEFAULT_PROPS,
  DsLoaderProps,
  LOADER_MAP
} from './DsLoader.Types'
import { SystemStyleObject } from '@mui/system'
import { DsBackdrop } from '../DsBackdrop'
import { DsBox } from '../DsBox'
import { Theme } from '@mui/material'

export const DsLoader: FC<DsLoaderProps> = inProps => {
  const props = { ...DS_LOADER_DEFAULT_PROPS, ...inProps }
  const {
    'ds-variant': loaderVariant = 'threeDot',
    color,
    position,
    backdrop,
    BackdropProps,
    ...boxProps
  } = props

  const LoaderElement = LOADER_MAP[loaderVariant]
  const { sx: wrapperStyleProps, ...restBoxProps } = boxProps

  return (
    <DsBackdrop {...BackdropProps} open={true} invisible={!backdrop}>
      <DsBox
        sx={[
          {
            position,
            color: `var(--ds-colour-${color}, var(--ds-colour-dotLoader))`
          },
          backdrop
            ? {
                color: `var(--ds-colour-${color}, var(--palette-common-white))`
              }
            : {},
          {
            color: color
          },
          (wrapperStyleProps as SystemStyleObject<Theme>) || {}
        ]}
        {...restBoxProps}
      >
        <LoaderElement />
      </DsBox>
    </DsBackdrop>
  )
}
