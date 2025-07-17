import { DsBox } from '../DsBox'
import { DsStack } from '../DsStack'
import { DsTypography } from '../DsTypography'
import {
  DsFileUploaderDefaultProps,
  TContentType,
  type IDsFileUploaderItemSegmentProps,
  type TFile
} from './DsFileUploader.Types'
import { DsFileUploaderPreview } from './DsFileUploaderPreview/DsFileUploaderPreview.Component'
import { humanizeFileSize } from './helpers'

const FileUploaderFiles = (inProps: IDsFileUploaderItemSegmentProps) => {
  const mergedSlotProps = {
    ...DsFileUploaderDefaultProps.slots,
    ...inProps.slots
  }

  const props = { ...inProps, slots: mergedSlotProps }

  const {
    files,
    onPreview,
    onDelete,
    onDownload,
    showDeleteIcon,
    showDownloadIcon,
    showPreviewIcon,
    slots = {}
  } = props

  const { DownloadButton, PreviewButton, DeleteButton } = slots

  if (!files) {
    return null
  }

  const renderFile = (file: TFile<TContentType>, index: number) => {
    return (
      <DsStack
        key={`${file?.name}-${index}`}
        direction='row'
        spacing='var(--ds-spacing-bitterCold)'
        alignItems='center'
        sx={{
          p: 'var(--ds-spacing-bitterCold)',
          borderRadius: 'var(--ds-radius-glacial)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--ds-colour-strokeDefault)',
          backgroundColor: 'var(--ds-colour-surfacePrimary)',
          cursor: 'pointer',
          '&:hover:not(:has(.delete-icon:hover, .action-icon:hover))': {
            borderColor: 'var(--ds-colour-strokeSecondarySelected)',
            backgroundColor: 'var(--ds-colour-stateSelectedSecondaryHover)'
          }
        }}
      >
        <DsFileUploaderPreview file={file} />
        <DsBox
          sx={{
            display: 'flex',
            flexGrow: 1,
            minWidth: 0,
            flexDirection: 'column'
          }}
        >
          <DsTypography component='div' variant='bodyBoldSmall' noWrap>
            {file.name}
          </DsTypography>
          <DsTypography
            component='div'
            variant='bodyRegularSmall'
            noWrap
            sx={{
              color: 'var(--ds-colour-typoTertiary)'
            }}
          >
            {humanizeFileSize(file.size)}
          </DsTypography>
        </DsBox>
        {showDownloadIcon && DownloadButton && (
          <DownloadButton
            IconProps={{ className: 'ri-download-line' }}
            onClick={() => onDownload && onDownload(file.name, file)}
          />
        )}
        {showPreviewIcon && PreviewButton && (
          <PreviewButton
            IconProps={{ className: 'ri-eye-line' }}
            onClick={() => onPreview && onPreview(file.name, file)}
          />
        )}

        {showDeleteIcon && DeleteButton && (
          <DeleteButton
            IconProps={{ className: 'ri-delete-bin-line' }}
            onClick={() => onDelete && onDelete(file.name, file)}
          />
        )}
      </DsStack>
    )
  }

  if (!Array.isArray(files)) {
    return renderFile(files, 0)
  }

  return files?.map(renderFile)
}

export default FileUploaderFiles
