import type {
  DsFileUploaderProps,
  TContentType,
  TErrorFile,
  TErrorValue,
  TFile,
  TMultiple,
  TFileValue
} from './DsFileUploader.Types'
import { DsFileUploaderImagePreview } from './DsFileUploaderPreview/DsFileUploaderImagePreview.Component'
import { getFileValidator } from './validator'
import { fileToFileUploader } from './converter'
import { DsRemixIcon } from '../DsRemixIcon'

export const mergeProps = <T extends Record<string, any>>(
  inProps: Partial<T>,
  defaultProps: T
): T => {
  return {
    ...defaultProps,
    ...inProps,
    slots: {
      ...defaultProps.slots,
      ...inProps.slots
    },
    slotProps: {
      ...defaultProps.slotProps,
      ...inProps.slotProps,
      SelectedItemSegment: {
        ...defaultProps.slotProps?.SelectedItemSegment,
        ...inProps.slotProps?.SelectedItemSegment
      },
      UploadedItemSegment: {
        ...defaultProps.slotProps?.UploadedItemSegment,
        ...inProps.slotProps?.UploadedItemSegment
      },
      DropZone: {
        ...defaultProps?.slotProps?.DropZone,
        ...inProps.slotProps?.DropZone
      }
    }
  }
}

export const getFileTypeIcon = <ContentType extends TContentType>(
  file: TFile<ContentType>
) => {
  const { type: mimeType } = file
  const IMAGE_REGEX = new RegExp('^image/.*')
  const VIDEO_REGEX = new RegExp('^video/.*')

  if (IMAGE_REGEX.test(mimeType)) {
    return <DsFileUploaderImagePreview file={file} />
  } else if (VIDEO_REGEX.test(mimeType)) {
    return <DsRemixIcon className="ri-video-line" />
  } else {
    return <DsRemixIcon className="ri-file-list-2-line" />
  }
}

export const humanizeFileSize = (bytes: number, decimals: number = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const getDefaultValue = <
  Multiple extends TMultiple,
  ContentType extends TContentType
>(
  props: DsFileUploaderProps<Multiple, ContentType>
): TFileValue<Multiple, ContentType> | null => {
  const { value, multiple } = props
  if (value) {
    return value
  }

  if (multiple) {
    return [] as TFile<ContentType>[] as DsFileUploaderProps<
      Multiple,
      ContentType
    >['value']
  }

  return null
}

export const getValidProcessedFile = async <
  Multiple extends TMultiple,
  ContentType extends TContentType
>(
  filesToProcess: FileList,
  files: TFileValue<Multiple, ContentType> | null,
  accept: string,
  minSize?: number,
  maxSize?: number,
  contentType?: TContentType
): Promise<{
  valid: TFileValue<Multiple, ContentType>
  invalid: TErrorValue<Multiple, ContentType>
}> => {
  const validator = getFileValidator(accept, minSize, maxSize)

  const isMultiple = Array.isArray(files)
  const validFiles = isMultiple ? [...files] : []
  const invalidFiles: TErrorValue<true, ContentType> = []

  const fileList = [...filesToProcess]

  for (const file of fileList) {
    const fileUploader = await fileToFileUploader(file, contentType || 'FILE')
    const errorCode = validator(file)
    if (!errorCode) {
      validFiles.unshift(fileUploader)
    } else {
      const temp: TErrorFile<ContentType> = {
        file: fileUploader,
        errorCode
      }
      invalidFiles.push(temp)
    }
  }

  const valid = isMultiple ? validFiles : validFiles[0]

  const invalid = (isMultiple ? invalidFiles : invalidFiles[0]) as TErrorValue<
    Multiple,
    ContentType
  >

  return { valid, invalid }
}