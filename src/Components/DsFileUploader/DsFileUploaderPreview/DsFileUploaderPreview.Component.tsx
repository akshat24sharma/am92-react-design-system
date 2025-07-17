import { DsRemixIcon } from '../../DsRemixIcon'
import { TContentType, TFile } from '../DsFileUploader.Types'
import { DsFileUploaderImagePreview } from './DsFileUploaderImagePreview.Component'

interface IDsFileUploaderPreviewProps {
  file: TFile<TContentType>
}

/**
 * DsFileUploaderPreview is a functional component that renders an appropriate preview
 * based on the MIME type of the uploaded file.
 *
 * - For image files (e.g., image/jpeg, image/png), it shows an actual image preview.
 * - For video files, it shows a video icon.
 * - For all other file types, it shows a generic file icon.
 */
export const DsFileUploaderPreview = ({
  file
}: IDsFileUploaderPreviewProps) => {
  const { type: mimeType } = file
  const IMAGE_REGEX = new RegExp('^image/.*')
  const VIDEO_REGEX = new RegExp('^video/.*')

  if (IMAGE_REGEX.test(mimeType)) {
    return <DsFileUploaderImagePreview file={file} />
  }
  const iconName = VIDEO_REGEX.test(mimeType)
    ? 'ri-video-line'
    : 'ri-file-list-2-line'
  return (
    <DsRemixIcon
      sx={{
        p: 'var(--ds-spacing-quickFreeze)',
        borderRadius: 'var(--ds-radius-quickFreeze)',
        backgroundColor: 'var(--ds-colour-neutral2)',
        color: 'var(--ds-colour-actionTertiary)'
      }}
      className={iconName}
    />
  )
}
