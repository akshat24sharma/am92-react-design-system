import { useEffect, useState } from 'react'
import { TContentType, TFile } from '../DsFileUploader.Types'
import { DsImage } from '../../DsImage'
import { DsRemixIcon } from '../../DsRemixIcon'

interface DsFileUploaderImagePreview {
  file: TFile<TContentType>
}

/**
 * This component is responsible for rendering a preview of an uploaded image file.
 * If the file content is valid and can be loaded, it shows the image preview.
 * Otherwise, it displays a fallback icon.
 */

export const DsFileUploaderImagePreview = ({
  file
}: DsFileUploaderImagePreview) => {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadImage = async () => {
      try {
        if (typeof file.content === 'string') {
          const img = new Image()
          img.src = file.content
          img.onload = () => isMounted && setSrc(img.src)
          img.onerror = () => isMounted && setSrc(null)
        } else if (file.content instanceof File) {
          const url = URL.createObjectURL(file.content)
          const img = new Image()
          img.src = url
          img.onload = () => isMounted && setSrc(url)
          img.onerror = () => {
            if (isMounted) setSrc(null)
            URL.revokeObjectURL(url)
          }
        }
      } catch {
        if (isMounted) setSrc(null)
      }
    }

    loadImage()

    return () => {
      isMounted = false
    }
  }, [file])

  if (src) {
    return (
      <DsImage
        srcSet={[{ src: src, alt: file.name }]}
        width='32px'
        height='32px'
        WrapperProps={{
          sx: {
            width: '32px',
            height: '32px'
          }
        }}
        style={{
          objectFit: 'cover',
          borderRadius: 'var(--ds-radius-quickFreeze)'
        }}
      />
    )
  }
  return (
    <DsRemixIcon
      sx={{
        p: 'var(--ds-spacing-quickFreeze)',
        borderRadius: 'var(--ds-radius-quickFreeze)',
        backgroundColor: 'var(--ds-colour-neutral2)',
        color: 'var(--ds-colour-actionTertiary)'
      }}
      className='ri-image-2-line'
    />
  )
}
