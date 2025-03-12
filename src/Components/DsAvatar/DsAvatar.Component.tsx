import { FC } from 'react'
import Avatar from '@mui/material/Avatar'
import { DsAvatarProps } from './DsAvatar.Types'

export const DsAvatar: FC<DsAvatarProps> = props => {
  return <Avatar {...props} />
}
