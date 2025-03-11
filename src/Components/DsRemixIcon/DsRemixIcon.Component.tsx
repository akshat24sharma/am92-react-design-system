import { FC } from 'react'
import { DsIcon, DsIconDefaultProps } from '../DsIcon'
import { DsRemixIconProps } from './DsRemixIcon.Types'

export const DsRemixIcon: FC<DsRemixIconProps> = (inProps) => {
  const props = { ...DsIconDefaultProps, ...inProps }

    return <DsIcon baseClassName="" {...props} />
}
