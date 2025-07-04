import React, { DragEvent, FC, useRef, useState } from 'react'

import { DsBox } from '../DsBox'
import { DsButton } from '../DsButton'
import { DsIconButton } from '../DsIconButton'
import { DsInput } from '../DsInput'
import { DsRemixIcon } from '../DsRemixIcon'
import { DsStack } from '../DsStack'
import { DsTypography } from '../DsTypography'

import {
  DsFileUploaderDefaultProps,
  DsFileUploaderDefaultState,
  DsFileUploaderProps,
  DsFileUploaderState
} from './DsFileUploader.Types'

export const DsFileUploader: FC<
  DsFileUploaderProps
> = (inProps) => {
  const props = {  ...DsFileUploaderDefaultProps, ...inProps}
  const inputRef = useRef<HTMLInputElement>()
  const [files, setFiles] = useState<DsFileUploaderState['files']>([])

  const humaniseSize = (bytes: number, decimals: number = 2) => {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  const getFileIconClass = (mimeType: string) => {
    if (mimeType.includes('image/')) {
      return 'ri-image-2-line'
    }

    if (mimeType.includes('video/')) {
      return 'ri-video-line'
    }

    return 'ri-file-list-2-line'
  }

  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    inputRef?.current?.click()
  }

  const handleRemoveFile = (index: number) => () => {
    const { onChange, name } = props
    const tempFiles = [...files]
    tempFiles.splice(index, 1)
     setFiles(tempFiles)

    if (onChange && typeof onChange === 'function') {
      onChange(name, [...tempFiles]);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, name } = props
    const stateFiles = files
    const { target } = event
    const { files: selectedFiles } = target
    if (selectedFiles) {
      const newFiles = [...stateFiles, ...selectedFiles]
      setFiles(newFiles)

      if (onChange && typeof onChange === 'function') {
        onChange(name, newFiles)
      }
    }
  }

  const handleDrop = (event: DragEvent) => {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault()

    const { InputProps = {}, onChange, name } = props
    const { accept, multiple } = InputProps

    if (!event.dataTransfer) {
      return
    }

    let files: File[] = []
    const items = event.dataTransfer.items
      ? [...event.dataTransfer.items]
      : [...event.dataTransfer.files]

    items.forEach(item => {
      let file

      if (!multiple && files.length) {
        return
      }

      if (item instanceof DataTransferItem) {
        if (item.kind === 'file') {
          file = item.getAsFile()
        }
      } else {
        file = item
      }

      if (!file) {
        return
      }

      const { type } = file
      const astrerikType = `${type.split('/')[0]}/*`

      if (accept.includes(type) || accept.includes(astrerikType)) {
        files.push(file)
      }
    })

    const stateFiles = files
    const newFiles = multiple
      ? [...stateFiles, ...files]
      : (files[0] && [files[0]]) || (stateFiles[0] && [stateFiles[0]]) || []

   setFiles(newFiles)

    if (onChange && typeof onChange === 'function') {
      onChange(name, newFiles)
    }
  }

  const handleDragOverHandler = (event: DragEvent) => {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault()
  }

  const renderFiles = () => {

    if (!files.length) {
      return false
    }

    const Files: React.ReactElement[] = []

    for (let index = 0; index < files.length; index++) {
      const file: File = files[index]

      Files.push(
        <DsStack
          key={`${file.name}-${index}`}
          direction="row"
          spacing="var(--ds-spacing-bitterCold)"
          sx={{
            alignItems: 'center',
            p: 'var(--ds-spacing-bitterCold)',
            borderRadius: 'var(--ds-radius-glacial)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'var(--ds-colour-strokeDefault)',
            backgroundColor: 'var(--ds-colour-surfacePrimary)',
            cursor: 'pointer',
            '&:hover': {
              borderColor: 'var(--ds-colour-strokeSecondarySelected)',
              backgroundColor: 'var(--ds-colour-stateSelectedSecondaryHover)'
            }
          }}
        >
          <DsRemixIcon
            sx={{
              p: 'var(--ds-spacing-quickFreeze)',
              borderRadius: 'var(--ds-radius-quickFreeze)',
              backgroundColor: 'var(--ds-colour-neutral2)',
              color: 'var(--ds-colour-actionTertiary)'
            }}
            className={getFileIconClass(file.type)}
          />
          <DsBox
            sx={{
              display: 'flex',
              flexGrow: 1,
              minWidth: 0,
              flexDirection: 'column'
            }}
          >
            <DsTypography
              component="div"
              variant="subheadingSemiboldDefault"
              noWrap
            >
              {file.name}
            </DsTypography>
            <DsTypography
              component="div"
              variant="bodyRegularSmall"
              noWrap
              sx={{
                color: 'var(--ds-colour-typoTertiary)'
              }}
            >
              {humaniseSize(file.size)}
            </DsTypography>
          </DsBox>
          <DsIconButton onClick={handleRemoveFile(index)}>
            <DsRemixIcon className="ri-close-line" />
          </DsIconButton>
        </DsStack>
      )
    }

    return (
      <DsStack
        sx={{
          mt: 'var(--ds-spacing-warm)',
          width: '100%'
        }}
        spacing="var(--ds-spacing-glacial)"
        direction="column"
      >
        {Files}
      </DsStack>
    )
  }

    const {
      IconProps,
      titleButtonText,
      TitleButtonProps,
      descriptionTypograpghyText,
      DescriptionTypograpghyProps,
      InputProps
    } = props
    return (
      <>
        <DsStack
          sx={{
            width: '100%',
            position: 'relative',
            p: 'var(--ds-spacing-bitterCold)',
            borderRadius: 'var(--ds-radius-glacial)',
            borderWidth: '1px',
            borderStyle: 'dashed',
            borderColor: 'var(--ds-colour-strokeDefault)',
            backgroundColor: 'var(--ds-colour-surfacePrimary)',
            cursor: 'pointer',
            '&:hover': {
              borderColor: 'var(--ds-colour-strokeSecondarySelected)',
              backgroundColor: 'var(--ds-colour-stateSelectedSecondaryHover)'
            }
          }}
          direction="column"
          spacing="var(--ds-spacing-glacial)"
        >
          <DsRemixIcon
            className="ri-upload-cloud-2-line"
            color="secondary"
            {...IconProps}
          />
          <DsButton variant="text" color="secondary" {...TitleButtonProps}>
            {titleButtonText}
          </DsButton>
          <DsTypography
            variant="bodyRegularSmall"
            align="center"
            {...DescriptionTypograpghyProps}
            sx={{
              color: 'var(--ds-colour-typoTertiary)',
              ...DescriptionTypograpghyProps?.sx
            }}
          >
            {descriptionTypograpghyText}
          </DsTypography>
          <DsInput
            type="file"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              opacity: 0,
              cursor: 'pointer',
              margin: 'var(--ds-spacing-zero) !important'
            }}
            onChange={handleChange}
            onDrop={handleDrop}
            onDragOver={handleDragOverHandler}
            disableUnderline
            inputProps={{
              title: titleButtonText as string,
              ref: inputRef,
              value: '',
              ...InputProps,
              style: {
                height: '100%',
                width: '100%',
                cursor: 'pointer',
                ...InputProps?.style
              }
            }}
          />
        </DsStack>
        {renderFiles()}
      </>
    )
}
