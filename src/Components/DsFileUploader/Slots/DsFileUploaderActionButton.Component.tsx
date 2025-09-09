import React from 'react'
import { IDsFileUploaderActionButtonProps } from '../DsFileUploader.Types'
import { DsIconButton } from '../../DsIconButton'
import { DsRemixIcon } from '../../DsRemixIcon'

/**
 * DsFileUploaderActionButton
 *
 * A reusable icon button component used within the FileUploader for actions like
 * delete, download, preview, etc. It wraps a `DsRemixIcon` inside a `DsIconButton`
 * and accepts customization through props.
 */
export const DsFileUploaderActionButton: React.FC<
  IDsFileUploaderActionButtonProps
> = ({ onClick, IconProps, ...iconButtonProps }) => {
  return (
    <DsIconButton
      onClick={onClick}
      sx={{
        p: 'var(--ds-spacing-glacial)',
        borderRadius: 'var(--ds-radius-quickFreeze)',
        backgroundColor: 'var(--ds-colour-surfaceSecondary)',
        ...iconButtonProps.sx
      }}
      {...iconButtonProps}
    >
      <DsRemixIcon fontSize='bitterCold' {...IconProps} />
    </DsIconButton>
  )
}