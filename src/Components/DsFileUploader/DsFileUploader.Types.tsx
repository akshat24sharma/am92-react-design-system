import type { ElementType } from 'react'
import { DsInputLabelProps } from '../DsInputLabel'
import { DsRemixIconProps } from '../DsRemixIcon'
import { DsStackProps } from '../DsStack'
import { DsInputProps } from '../DsInput'
import { DsIconButtonProps } from '../DsIconButton'
import { DsFileUploaderActionButton } from './Slots/DsFileUploaderActionButton.Component'
import { DsFileUploaderDropZone } from './Slots/DsFileUploaderDropZone'
import { DsFileUploaderSelectedFilesSegment } from './Slots/DsFileUploaderSelectedFilesSegment'
import { DsFileUploaderUploadedFilesSegment } from './Slots/DsFileUploaderUploadedFilesSegment'

export enum CONTENT_TYPE {
  FILE = 'FILE',
  BASE64 = 'BASE64'
}

export enum VARIANT {
  FULL = 'FULL',
  COMPRESSED = 'COMPRESSED'
}

export type TMultiple = boolean | undefined
export type TContentType = keyof typeof CONTENT_TYPE
export type TVariant = keyof typeof VARIANT
export type TFileType<TContentType> = TContentType extends 'FILE'
  ? File
  : string

export type TFile<TContentType> = {
  /**
   * Name of the file selected or dropped.
   */
  name: string
  /**
   * mime-type of the file selected or dropped.
   */
  type: string
  /**
   * size in bytes of the file selected or dropped.
   */
  size: number
  /**
   * content of the file selected or dropped.
   */
  content: TFileType<TContentType>
  /**
   * Unique Identifier for the file.
   */
  id?: string
  /**
   * Extra content required to be displayed with the file name and size
   */
  subText?: string
}

export type TValue<Multiple, TContentType> = Multiple extends false
  ? TFile<TContentType> | null | undefined
  : TFile<TContentType>[] | undefined

export type TProcessFile<TMultiple, TContentType> = {
  valid: TValue<TMultiple, TContentType>
  invalid: TErrorValue<TMultiple, TContentType>
}

export enum ERROR_CODES {
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
  MAX_FILE_SIZE_EXCEEDED = 'MAX_FILE_SIZE_EXCEEDED',
  FILE_SIZE_BELOW_MIN = 'FILE_SIZE_BELOW_MIN'
}

export type TErrorCodes = keyof typeof ERROR_CODES

export type TErrorFile<CONTENT_TYPE> = {
  file: TFile<CONTENT_TYPE>
  errorCode: TErrorCodes
}

export type TErrorValue<Multiple, CONTENT_TYPE> = Multiple extends false
  ? TErrorFile<CONTENT_TYPE> | null
  : TErrorFile<CONTENT_TYPE>[]

export interface IDsFileUploaderProps<
  Multiple extends TMultiple = true,
  ContentType extends TContentType = 'FILE'
> {
  InputLabelProps?: Omit<
    DsInputLabelProps,
    'ref' | 'error' | 'success' | 'htmlFor' | 'disabled'
  >
  /**
   * Name attribute of the input element.
   */
  name: string
  /**
   * @param {TVariant} variant The variant of file uploader component.
   * @default 'FULL'
   */
  variant?: TVariant
  /**
   * The `input` value. Value should be array of `TFile<TContentType>` type objects. If you have multiple false then value would be null
   * @default []
   */
  value?: TValue<Multiple, ContentType> | null
  /**
   * The `input` uploadedValue. uploadedValue should be array of `TFile<TContentType>` type objects of your previously uploaded files. If you have multiple false then uploadedValue would be null
   * @default []
   */
  uploadedValue?: TValue<Multiple, ContentType>
  /**
   * validate the minimum file size (in bytes).
   *
   * If file size is below the provided value then file will be passed back in `onError` callback.
   */
  minSize?: number
  /**
   * The `content` type in the file object returned in callbacks for newly selected files.
   * @default 'FILE'
   */
  contentType?: TContentType
  /**
   * validate the maximum file size (in bytes).
   *
   * If file size exceeds the provided value then file will be passed back in `onError` callback.
   */
  maxSize?: number
  /**
   * The `accept` attribute of the input element.
   *
   * This will allow to restrict user to only upload specific type of files.
   *
   * If you want to allow only images then use `accept='image/*'` and so on.
   *
   * By default it will allow any file.
   * @default '*'
   */
  accept?: string
  /**
   * The `multiple` attribute of the input element.
   *
   * If `false` then user can upload only single file.
   * @default false
   */
  multiple?: Multiple
  /**
   * To override icon associated to each file type. Called in loop for all selected files
   *
   * @param {string} name The name provided to the component.
   * @param {TFile<ContentType>} [file] This would be the valid `TFile<ContentType>` type objects selected with its content value depending on `contentType` props or as provided in value.
   */
  FileIconMapper?: (file: TFile<ContentType>) => DsRemixIconProps['className']
  /**
   * Callback fired when a invalid file is selected or dropped.
   *
   * @param {string} name The name provided to the component.
   * @param { TErrorValue<Multiple, ContentType>} [files] This would be the valid `T_ERROR_FILE` type objects selected with its content as `FILE` type or as provided in value with the error code.
   */

  onError?: (name: string, files: TErrorValue<Multiple, ContentType>) => void
  /**
   * Callback fired when a file is selected or dropped.
   *
   * @param {string} name The name provided to the component.
   * @param {TValue<Multiple, ContentType>} [files] This would be the valid `T_FILE_UPLOADER` type objects selected with its content value depending on `contentType` props or as provided in value.
   */
  onChange: (name: string, files: TValue<Multiple, ContentType>) => void
  /**
   * Callback fired when an existing file is removed.
   *
   * @param {string} name The name provided to the component.
   * @param {TFile<ContentType>} [file] This would be the valid `TFile<ContentType>` type objects selected with its content value depending on `contentType` props or as provided in value.
   */
  onDelete?: (name: string, file: TFile<ContentType>) => void

  /**
   * This is a handler that user can use to pass boolean if delete operation is async/API driven.
   *
   * @param {string} name The name provided to the component.
   * @param {TFile<ContentType>} [file] This would be the valid `TFile<ContentType>` type objects selected with its content value depending on `contentType` props or as provided in value.
   */
  canDeleteFile?: (name: string, file: TFile<ContentType>) => Promise<boolean>

  /**
   * Callback fired when an preview button is clicked for an existing file.
   *
   * @param {string} name The name provided to the component.
   * @param {TFile<ContentType>} [file] This would be the valid `TFile<ContentType>` type objects selected with its content value depending on `contentType` props or as provided in value.
   */
  onPreview?: (name: string, file: TFile<ContentType>) => void
  /**
   * Callback fired when an download button is clicked for an existing file.
   *
   * @param {string} name The name provided to the component.
   * @param {TFile<ContentType>} [file] This would be the valid `TFile<ContentType>` type objects selected with its content value depending on `contentType` props or as provided in value.
   */
  onDownload?: (name: string, file: TFile<ContentType>) => void
  /**
   slots prop is used to provide custom slots components to the file uploader
   */
  slots?: TDsFileUploaderSlots
  /**
   slotProps prop is used to provide custom props to the individual slots of the file uploader
   */
  slotProps?: TDsFileUploaderSlotProps
}

export interface IDsFileUploaderDropZoneProps extends DsStackProps {
  /**
   * @param {TFileUploaderVariant} variant The variant of file uploader component.
   * @default 'FULL'
   */
  variant?: IDsFileUploaderProps['variant']
  /**
   * The `iconProps` component to be used for the file uploader.
   */
  IconProps?: Omit<DsRemixIconProps, 'ref'>
  /**
   * To override title text in dropbox.
   */
  title?: string
  /**
   * To override description text in dropbox.
   */
  description?: string | string[]
  /**
   * To override props passed to input element
   */
  InputProps?: DsInputProps['inputProps']
  /**
   * This prop can be used to toggle the disabled state of the file uploaded.
   */
  disabled?: boolean
}

export interface IDsFileUploaderItemSegmentProps extends DsStackProps {
  /**
   * This prop is used to provide custom label to the segments
   */
  label?: string
  /**
   * This prop is used to switch the visibility of delete button in a particular segment
   */
  showDeleteIcon?: boolean
  /**
   * This prop is used to switch the visibility of preview button in a particular segment
   */
  showPreviewIcon?: boolean
  /**
   * This prop is used to switch the visibility of download button in a particular segment
   */
  showDownloadIcon?: boolean

  /**
   * This prop is used to supply files to the segment
   */
  files?: TFile<TContentType> | TFile<TContentType>[]
  /**
   * Callback fired when an preview button is clicked for an existing file.
   *
   * @param {string} name The name provided to the component.
   * @param {TFile<TContentType>} [file] This would be the valid `TFile<TContentType>` type objects selected with its content value depending on `contentType` props or as provided in value.
   */
  onPreview?: IDsFileUploaderProps['onPreview']
  /**
   * Callback fired when an existing file is removed.
   *
   * @param {string} name The name provided to the component.
   * @param {TFile<TContentType>} [file] This would be the valid `TFile<TContentType>` type objects selected with its content value depending on `contentType` props or as provided in value.
   */
  onDelete?: IDsFileUploaderProps['onDelete']
  /**
   * Callback fired when an download button is clicked for an existing file.
   *
   * @param {string} name The name provided to the component.
   * @param {TFile<TContentType>} [file] This would be the valid `TFile<TContentType>` type objects selected with its content value depending on `contentType` props or as provided in value.
   */
  onDownload?: IDsFileUploaderProps['onDownload']
  /**
   slots prop is used to provide custom slots components to the file uploader
   */
  slots?: IDsFileUploaderProps['slots']
  /**
   slotPros used to provide custom props to the individual slots of the file uploader
   */
  slotProps?: IDsFileUploaderProps['slotProps']
}

export interface IDsFileUploaderActionButtonProps extends DsIconButtonProps {
  /**
   * To override delete icon in files
   */
  IconProps?: Omit<DsRemixIconProps, 'ref'>
}

export type TDsFileUploaderSlots = {
  /**
   This prop is used to provide custom slot component to the drop zone of the component
   */
  DropZone?: ElementType<IDsFileUploaderDropZoneProps>
  /**
   This prop is used to provide custom slot component to the selected segment of the component
   */
  SelectedItemSegment?: ElementType<IDsFileUploaderItemSegmentProps>
  /**
   This prop is used to provide custom slot component to the uploaded segment of the component
   */
  UploadedItemSegment?: ElementType<IDsFileUploaderItemSegmentProps>
  /**
   This prop is used to provide custom slot component to the delete button of the component
   */
  DeleteButton?: ElementType<IDsFileUploaderActionButtonProps>
  /**
   This prop is used to provide custom slot component to the preview button of the component
   */
  PreviewButton?: ElementType<IDsFileUploaderActionButtonProps>
  /**
   This prop is used to provide custom slot component to the download button of the component
   */
  DownloadButton?: ElementType<IDsFileUploaderActionButtonProps>
}

export type TDsFileUploaderSlotProps = {
  /**
   This prop is used to provide custom props drop zone of the component
   */
  DropZone?: IDsFileUploaderDropZoneProps
  /**
   This prop is used to provide custom props selected segment of the component
   */
  SelectedItemSegment?: IDsFileUploaderItemSegmentProps
  /**
   This prop is used to provide custom props uploaded segment of the component
   */
  UploadedItemSegment?: IDsFileUploaderItemSegmentProps
  /**
   This prop is used to provide custom props delete button of the component
   */
  DeleteButton?: IDsFileUploaderActionButtonProps
  /**
   This prop is used to provide custom props preview button of the component
   */
  PreviewButton?: IDsFileUploaderActionButtonProps
  /**
   This prop is used to provide custom props download button of the component
   */
  DownloadButton?: IDsFileUploaderActionButtonProps
}

export const DsFileUploaderDefaultProps: IDsFileUploaderProps<
  TMultiple,
  'FILE'
> = {
  name: '',
  onChange: () => {},
  value: undefined,
  accept: '*',
  variant: 'FULL',
  multiple: true,
  slots: {
    DropZone: DsFileUploaderDropZone,
    UploadedItemSegment: DsFileUploaderUploadedFilesSegment,
    SelectedItemSegment: DsFileUploaderSelectedFilesSegment,
    DeleteButton: DsFileUploaderActionButton,
    PreviewButton: DsFileUploaderActionButton,
    DownloadButton: DsFileUploaderActionButton
  },
  slotProps: {
    SelectedItemSegment: {
      label: 'Selected Documents',
      showDeleteIcon: true
    },
    UploadedItemSegment: {
      label: 'Uploaded documents',
      showDeleteIcon: true
    }
  }
}

export const DsFileUploaderDropzoneDefaultProps: IDsFileUploaderDropZoneProps =
  {
    variant: DsFileUploaderDefaultProps.variant,
    title: 'Upload document',
    description: 'Click to browse or drop here to upload'
  }
