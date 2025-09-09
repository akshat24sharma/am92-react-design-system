import { DsBox } from '../../DsBox'
import { DsButton } from '../../DsButton'
import { DsInput } from '../../DsInput'
import { DsRemixIcon } from '../../DsRemixIcon'
import { DsStack, DsStackProps } from '../../DsStack'
import { DsTypography } from '../../DsTypography'
import {
  DsFileUploaderDropzoneDefaultProps,
  IDsFileUploaderDropZoneProps
} from '../DsFileUploader.Types'

/**
 * DsFileUploaderDropZone
 *
 * This component renders a drop zone area where users can drag & drop files
 * or click to upload using a hidden input field. It supports two layout variants:
 * - 'DEFAULT': Large button with drag and drop space area
 * - 'COMPRESSED': Smaller area and button size to save space
 */
export const DsFileUploaderDropZone = (
  inProps: IDsFileUploaderDropZoneProps
) => {
  const props = {
    ...DsFileUploaderDropzoneDefaultProps,
    ...inProps
  }
  const {
    variant,
    IconProps,
    title,
    description,
    InputProps,
    disabled,
    ...restDsStackProps
  } = props

  const isCompressed = variant === 'COMPRESSED'

  const renderDescription = () => {
    if (!description) return null

    const isArray = Array.isArray(description)
    const isString = typeof description === 'string'
    const shouldRenderCompressedArray = isArray && isCompressed
    const shouldRenderString = isString

    if (!shouldRenderCompressedArray && !shouldRenderString) return null

    const color = `var(--ds-colour-${isCompressed ? 'typoPrimary' : 'typoTertiary'})`
    const containerProps: DsStackProps = {
      direction: isCompressed ? 'row' : undefined,
      justifyContent: isCompressed
        ? isArray && description.length > 1
          ? 'space-between'
          : 'center'
        : 'center',
      alignItems: isCompressed ? 'center' : undefined,
      textAlign: isCompressed ? 'center' : undefined,
      pb: isCompressed ? undefined : 'var(--ds-spacing-bitterCold)',
      sx: isCompressed
        ? {
            py: 'var(--ds-spacing-quickFreeze)',
            px: 'var(--ds-spacing-glacial)',
            backgroundColor: 'var(--ds-colour-surfaceSecondary)',
            borderRadius: 'var(--ds-radius-quickFreeze)'
          }
        : undefined
    }

    const renderTypographies = () => {
      const descList = isString ? [description] : description
      return descList.map((desc, index) => (
        <DsTypography
          key={index}
          variant='bodyRegularSmall'
          align='center'
          color={color}
        >
          {desc}
        </DsTypography>
      ))
    }

    return (
      <DsStack key='dropzone-description' {...containerProps}>
        {renderTypographies()}
      </DsStack>
    )
  }

  return [
    <DsBox
      key='dropzone-box'
      sx={{
        width: '100%',
        position: 'relative',
        borderRadius: 'var(--ds-radius-glacial)',
        borderWidth: '1px',
        borderStyle: 'dashed',
        borderColor: 'var(--ds-colour-strokeDefault)',
        backgroundColor: disabled
          ? 'var(--ds-colour-stateDisabledSurface)'
          : 'var(--ds-colour-surfacePrimary)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        '&:hover': {
          borderColor: disabled
            ? 'var(--ds-colour-strokeDefault)'
            : 'var(--ds-colour-strokeSecondarySelected)',
          '.dropzone-content-wrapper': {
            backgroundColor: disabled
              ? 'var(--ds-colour-stateDisabledSurface)'
              : isCompressed
                ? 'var(--ds-colour-surfaceSecondary)'
                : 'var(--ds-colour-stateSelectedSecondaryHover)'
          }
        }
      }}
    >
      <DsStack
        className='dropzone-content-wrapper'
        flexDirection={isCompressed ? 'row' : 'column'}
        gap='var(--ds-spacing-quickFreeze)'
        justifyContent='center'
        alignItems='center'
        {...restDsStackProps}
        sx={{
          borderRadius: isCompressed
            ? 'var(--ds-radius-quickFreeze)'
            : 'var(--ds-radius-glacial)',
          m: isCompressed
            ? 'var(--ds-spacing-frostbite)'
            : 'var(--ds-spacing-zero)',
          px: isCompressed
            ? 'var(--ds-spacing-glacial)'
            : 'var(--ds-spacing-bitterCold)',
          pt: isCompressed
            ? 'var(--ds-spacing-zero)'
            : 'var(--ds-spacing-bitterCold)',
          backgroundColor: disabled
            ? 'var(--ds-colour-stateDisabledSurface)'
            : isCompressed
              ? 'var(--ds-colour-surfaceSecondary)'
              : 'var(--ds-colour-surfacePrimary)',
          '&:hover': {
            backgroundColor: isCompressed
              ? 'var(--ds-colour-surfaceSecondary)'
              : 'var(--ds-colour-stateSelectedSecondaryHover)'
          },
          ...restDsStackProps?.sx
        }}
      >
        <DsRemixIcon
          className={isCompressed ? 'ri-upload-line' : 'ri-upload-cloud-2-line'}
          fontSize={isCompressed ? 'frostbite' : 'mild'}
          color={disabled ? 'disabled' : 'secondary'}
          {...IconProps}
        />
        <DsButton disabled={disabled} variant='text' color='secondary'>
          {title}
        </DsButton>
        {!isCompressed && renderDescription()}
      </DsStack>

      <DsInput
        type='file'
        slot='input'
        disabled={disabled}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          opacity: 0,
          margin: 'var(--ds-spacing-zero) !important'
        }}
        onChange={InputProps?.onChange}
        onDrop={InputProps?.onDrop as React.DragEventHandler<HTMLInputElement>}
        onDragOver={
          InputProps?.onDragOver as React.DragEventHandler<HTMLInputElement>
        }
        disableUnderline
        inputProps={{
          title,
          value: '',
          ...InputProps,
          accept: InputProps?.accept,
          multiple: InputProps?.multiple,
          style: {
            height: '100%',
            width: '100%',
            cursor: disabled ? 'not-allowed' : 'pointer',
            ...InputProps?.style
          }
        }}
      />
    </DsBox>,
    isCompressed && renderDescription()
  ]
}
