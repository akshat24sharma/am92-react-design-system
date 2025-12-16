import type React from 'react'
import type { DragEventHandler } from 'react'
import { useEffect, useState } from 'react'

import type {
  DsFileUploaderProps,
  TContentType,
  TErrorFile,
  TErrorValue,
  TFile,
  TMultiple,
  TFileValue
} from './DsFileUploader.Types'
import { DsFileUploaderDefaultProps } from './DsFileUploader.Types'
import FileUploaderFiles from './FileUploaderFiles'
import { getDefaultValue, getValidProcessedFile, mergeProps } from './helpers'
import { DsFileUploaderDropZone } from './Slots/DsFileUploaderDropZone'
import { DsStack } from '../DsStack'
import { DsInputLabel } from '../DsInputLabel'

export const DsFileUploader = <
  Multiple extends TMultiple,
  ContentType extends TContentType
>(
  inProps: DsFileUploaderProps<Multiple, ContentType>
) => {
  // Merge user props with default props, handling nested slots and slotProps gracefully
  const props = mergeProps<DsFileUploaderProps<Multiple, ContentType>>(
    inProps,
    DsFileUploaderDefaultProps as DsFileUploaderProps<Multiple, ContentType>
  )
  const defaultValue = getDefaultValue<Multiple, ContentType>(props)

  const [files, setFiles] = useState<TFileValue<Multiple, ContentType> | null>(
    defaultValue
  )

  const {
    InputLabelProps,
    name,
    value,
    uploadedValue,
    accept = '*',
    minSize,
    maxSize,
    onChange,
    onError,
    onDelete,
    onPreview,
    onDownload,
    multiple,
    slotProps = {},
    variant,
    contentType,
    canDeleteFile,
    slots = {}
  } = props

  // Effective file type accept string — pulled from DropZone slotProps or `accept`
  const allowedFiles =
    (slotProps?.DropZone && slotProps?.DropZone.InputProps?.accept) || accept

  useEffect(() => {
    if (value !== undefined) {
      setFiles(value)
    }
  }, [value])

  // Handles selected or dropped files after validation
  const handleFiles = (processedFiles: {
    valid: TFileValue<Multiple, ContentType> | null
    invalid: TErrorValue<Multiple, ContentType>
  }) => {
    const { valid, invalid } = processedFiles

    // If not controlled, update internal state
    if (value === undefined) {
      setFiles(valid)
    }

    if (onChange && typeof onChange === 'function') {
      onChange(name, valid as TFileValue<Multiple, ContentType>)
    }

    if (invalid !== null) {
      if (invalid && onError && typeof onError === 'function') {
        onError(name, invalid)
      }
    }
  }

  // Triggered when a user selects files via the input element
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { target } = event
    const { files: selectedFiles } = target

    if (!multiple && uploadedValue) {
      if (onDelete && typeof onDelete === 'function') {
        onDelete(name, uploadedValue as TFile<ContentType>)
      }
    }

    if (selectedFiles) {
      const processedFiles = await getValidProcessedFile<Multiple, ContentType>(
        selectedFiles,
        files ?? null,
        accept,
        minSize,
        maxSize,
        contentType
      )

      handleFiles(processedFiles)
    }
  }

  // Triggered when a user drops files into the drop zone
  const handleDropFile: DragEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = async event => {
    event.preventDefault()
    const { dataTransfer } = event

    if (dataTransfer) {
      const { files: selectedFiles } = dataTransfer

      if (!multiple && uploadedValue) {
        if (onDelete && typeof onDelete === 'function') {
          onDelete(name, uploadedValue as TFile<ContentType>)
        }
      }

      if (files) {
        const processedFiles = await getValidProcessedFile<
          Multiple,
          ContentType
        >(selectedFiles, files ?? null, accept, minSize, maxSize)
        handleFiles(processedFiles)
      }
    }
  }

  // Prevent default behavior to allow dropping
  const handleDragOverHandler: DragEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = event => {
    event.preventDefault()
  }

  // Triggered when a user removes a file
  const handleRemoveFile = async (name: string, file: TFile<TContentType>) => {
    // Async handler for delete operations
    if (canDeleteFile && typeof canDeleteFile === 'function') {
      const canDelete = await canDeleteFile(name, file)
      if (!canDelete) return
    }

    if (onDelete && typeof onDelete === 'function') {
      onDelete(name, file)
    }

    // Update internal state after deletion
    if (Array.isArray(files)) {
      const newFiles = files.filter(f => f !== file) as TFileValue<
        Multiple,
        ContentType
      >
      const valid = newFiles
      const invalid: TErrorFile<ContentType>[] = []

      handleFiles({
        valid: valid,
        invalid: invalid as TErrorValue<Multiple, ContentType>
      })
    } else {
      handleFiles({
        valid: null,
        invalid: null as TErrorValue<Multiple, ContentType>
      })
    }
  }

  // Preview handler
  const handlePreviewFileAction = (name: string, file: TFile<TContentType>) => {
    if (onPreview && typeof onPreview === 'function') {
      onPreview(name, file)
    }
  }

  // Download handler
  const handleDownloadFileAction = (
    name: string,
    file: TFile<TContentType>
  ) => {
    if (onDownload && typeof onDownload === 'function') {
      onDownload(name, file)
    }
  }

  // Visibility conditions for selected and uploaded sections
  const isSelectedSegmentVisible = multiple
    ? Array.isArray(files) && files.length > 0
    : files
  const isUploadedSegmentVisible = multiple
    ? Array.isArray(uploadedValue) && uploadedValue.length > 0
    : uploadedValue

  const { SelectedItemSegment, UploadedItemSegment } = slots

  return (
    <DsStack
      direction="column"
      sx={{
        gap: 'var(--ds-spacing-bitterCold)',
        width: '100%',
        p: 'var(--ds-spacing-bitterCold)'
      }}
    >
      <DsInputLabel
        sx={{ mb: 'var(--ds-spacing-zero)', ...InputLabelProps?.sx }}
        {...InputLabelProps}
      />
      <DsFileUploaderDropZone
        variant={variant}
        {...slotProps?.DropZone}
        InputProps={{
          accept: allowedFiles || accept,
          multiple: multiple,
          onChange: handleFileSelect,
          onDrop: handleDropFile,
          onDragOver: handleDragOverHandler,
          ...slotProps?.DropZone?.InputProps
        }}
      />
      {isSelectedSegmentVisible && SelectedItemSegment && (
        <SelectedItemSegment
          onPreview={handlePreviewFileAction}
          onDownload={handleDownloadFileAction}
          onDelete={handleRemoveFile}
          {...slotProps?.SelectedItemSegment}
        >
          <FileUploaderFiles
            slots={slots}
            slotProps={slotProps}
            files={files || undefined}
          />
        </SelectedItemSegment>
      )}
      {isUploadedSegmentVisible && UploadedItemSegment && (
        <UploadedItemSegment
          onPreview={handlePreviewFileAction}
          onDownload={handleDownloadFileAction}
          onDelete={handleRemoveFile}
          {...slotProps?.UploadedItemSegment}
        >
          <FileUploaderFiles
            slots={slots}
            slotProps={slotProps}
            files={uploadedValue || undefined}
          />
        </UploadedItemSegment>
      )}
    </DsStack>
  )
}
