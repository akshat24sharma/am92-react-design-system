import React, { useEffect, useState } from 'react'
import { DsImage, DsStack, DsTypography } from '../../../Components'

import type {
  IDsOtpStatusProps,
  StatusDetailType
} from '../DsOtpVerification.Types'
import { SOMETHING_WENT_WRONG } from '../../Assets/OTP_VERIFICATION'

const DsOtpStatusContent: React.FC<IDsOtpStatusProps> = props => {
  const { title, description, image } = props.status as Extract<
    StatusDetailType,
    { type: 'fullPage' }
  >
  const { srcSet, style, ...restImageProps } = image
  const hasTitle = Boolean(title?.length)
  const hasDescription = Boolean(description?.length)

  const [currentImage, setCurrentImage] = useState(srcSet)

  const handleImageError = () => {
    console.warn(
      `Image failed to load for status "${props.status?.type}". Falling back to default error image.`
    )
    setCurrentImage(SOMETHING_WENT_WRONG)
  }

  useEffect(() => {
    setCurrentImage(srcSet)
  }, [props])

  return (
    <DsStack
      sx={{
        height: '100%',
        textAlign: 'center',
        alignItems: 'center',
        gap: 'var(--ds-spacing-mild)',
        justifyContent: 'center'
      }}
    >
      {!props.hideIllustration && (
        <DsImage
          srcSet={currentImage}
          WrapperProps={{ sx: { width: 200, height: 200 } }}
          {...restImageProps}
          aspectRatio={1 / 1}
          loading='lazy'
          onError={handleImageError}
        />
      )}
      <DsStack
        sx={{
          gap: 'var(--ds-spacing-glacial)'
        }}
      >
        {hasTitle && (
          <DsTypography variant='headingBoldMedium'>{title}</DsTypography>
        )}

        {hasDescription && (
          <DsTypography variant='bodyRegularMedium'>{description}</DsTypography>
        )}
      </DsStack>
    </DsStack>
  )
}

export default DsOtpStatusContent
