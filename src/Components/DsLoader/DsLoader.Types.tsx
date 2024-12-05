import type { CSSProperties } from 'react'

import type { DsColorTokens } from '../../Types'
import type { DsBackdropProps } from '../DsBackdrop'
import type { DsBoxProps } from '../DsBox'
import { ThreeDotLoader } from './ThreeDotLoader'
import { SingleDotLoader } from './SingleDotLoader'

type TVariant = 'threeDot' | 'singleDot'
type TPosition = 'absolute' | 'fixed'

export interface DsLoaderProps extends DsBoxProps {
  'ds-variant'?: TVariant
  position?: TPosition
  backdrop?: boolean
  BackdropProps?: DsBackdropProps
  color?: DsColorTokens | CSSProperties['color']
}

export const DS_LOADER_DEFAULT_PROPS: DsLoaderProps = {
  'ds-variant': 'threeDot',
  position: 'fixed',
  backdrop: true,
  sx: { maxheight: '100px', maxWidth: '100px' }
}

export const LOADER_MAP: Record<TVariant, React.ElementType> = {
  singleDot: SingleDotLoader,
  threeDot: ThreeDotLoader
}
