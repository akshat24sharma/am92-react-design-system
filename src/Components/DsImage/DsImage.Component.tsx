import { FC, useState } from 'react'
import { DsBox } from '../DsBox'
import { DsFade } from '../DsFade'
import { DsRemixIcon } from '../DsRemixIcon'
import { DsSkeleton } from '../DsSkeleton'
import {
  DsImageProps,
  DsImageState,
  DEFULT_ERROR_ICON_PROPS,
  INNER_COMPONENT_STYLE
} from './DsImage.Types'

export const DsImage: FC<DsImageProps> = (props) => {
  const [stage, setStage] = useState<DsImageState['stage']>('LOADING')

  const handleSetLoadedStage = () => setStage('LOADED')
  const handleSetErrorStage = () => setStage('ERROR')

  const checkHasSource = () => {
    const { srcSet = [] } = props
    return srcSet && srcSet.length > 0
  }

  const renderLoadingComponent = () => {
    const { aspectRatio, LoaderProps } = props
    const hasSource = checkHasSource()
    const isLoading = hasSource && stage === 'LOADING'

    if (!isLoading) {
      return false
    }

    return (
      <DsSkeleton
        variant="rectangular"
        width="100%"
        height="100%"
        {...LoaderProps}
        sx={{
          ...(aspectRatio ? INNER_COMPONENT_STYLE : {}),
          ...LoaderProps?.sx
        }}
      />
    )
  }

  const renderErrorComponent = () => {
    const { aspectRatio, ErrorIconProps } = props
    const hasSource = checkHasSource()
    const isError = !hasSource || stage === 'ERROR'

    if (!isError) {
      return false
    }

    return (
      <DsRemixIcon
        color="iconDisabled"
        fontSize="inherit"
        {...DEFULT_ERROR_ICON_PROPS}
        {...ErrorIconProps}
        sx={{
          ...(aspectRatio ? INNER_COMPONENT_STYLE : {}),
          ...ErrorIconProps?.sx
        }}
      />
    )
  }

  const renderPictureComponent = () => {
    const { srcSet, aspectRatio, ErrorIconProps, WrapperProps, ...ImageProps } = props
    const hasSource = checkHasSource()

    if (!hasSource) {
      return <></>
    }

    return (
      <picture
        onLoad={handleSetLoadedStage}
        onError={handleSetErrorStage}
      >
        {srcSet?.map((src, index) => {
          const { src: imageSrc, style, ...restProps } = src
          const isLast = index === srcSet.length - 1

          if (isLast) {
            return (
              <img
                key={index}
                src={imageSrc}
                {...restProps}
                {...ImageProps}
                style={{
                  ...(aspectRatio ? INNER_COMPONENT_STYLE : {}),
                  display: 'block',
                  maxWidth: '100%',
                  ...ImageProps?.style
                }}
              />
            )
          }

          return <source key={index} srcSet={imageSrc} {...restProps} />
        })}
      </picture>
    )
  }

    const { srcSet, aspectRatio, WrapperProps } = props
    const hasSource = srcSet && srcSet.length > 0
    const isError = !hasSource || stage === 'ERROR'

    const isLoading = !isError && stage === 'LOADING'

    return (
      <DsBox
        {...WrapperProps}
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          ...((aspectRatio && {
            aspectRatio: `${aspectRatio} auto`,
            overflow: 'hidden',
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            [`@supports not (aspect-ratio: ${aspectRatio})`]: {
              paddingTop: `calc((1 / ${aspectRatio}) * 100%)`,
              height: 0
            }
          }) ||
            {}),
          ...WrapperProps?.sx
        }}
      >
        {renderLoadingComponent()}
        {renderErrorComponent()}
        <DsFade in={!isLoading && !isError}>
          {renderPictureComponent()}
        </DsFade>
      </DsBox>
    )
}
