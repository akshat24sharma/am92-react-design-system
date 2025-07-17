import { DsStack } from '../../DsStack'
import { DsTypography } from '../../DsTypography'
import {
  DsFileUploaderDefaultProps,
  TDsFileUploaderSlotProps
} from '../DsFileUploader.Types'
import { cloneElement, isValidElement } from 'react'

/**
 * DsFileUploaderSelectedFilesSegment
 *
 * This component is a wrapper to render a labeled section
 * for displaying uploaded files in a scrollable container.
 *
 * It supports slot-level customization via props and merges them with default values.
 */
export const DsFileUploaderUploadedFilesSegment = (
  inProps: TDsFileUploaderSlotProps['UploadedItemSegment']
) => {
  const props = {
    ...DsFileUploaderDefaultProps.slotProps?.UploadedItemSegment,
    ...inProps
  }

  const { label, children } = props
  return (
    <DsStack spacing='var(--ds-spacing-frostbite)'>
      <DsTypography
        py='var(--ds-spacing-glacial)'
        variant='subheadingSemiboldDefault'
        color='var(--ds-colour-typoSecondary)'
      >
        {label}
      </DsTypography>
      <DsStack
        spacing='var(--ds-spacing-frostbite)'
        sx={{ maxHeight: '440px', overflowY: 'auto' }}
      >
        {isValidElement(children) && cloneElement(children, { ...props })}
      </DsStack>
    </DsStack>
  )
}
