import React, { FC } from 'react'

import { DsRemixIcon } from '../DsRemixIcon'
import { DsTypography } from '../DsTypography'
import { DsIconButton } from '../DsIconButton'
import { DsDrawer, DsDrawerProps } from '../DsDrawer'
import {
  DsBottomSheetProps,
  DsBottomSheetDefaultProps
} from './DsBottomSheet.Types'
import { DsDialogTitle } from '../DsDialogTitle'
import { DsDialogContent } from '../DsDialogContent'
import { DsButton } from '../DsButton'
import { DsDialogActions } from '../DsDialogActions'
import { DsPaper } from '../DsPaper'
import { mergeSlotProps } from '../../utils'

export const DsBottomSheet: FC<DsBottomSheetProps> = (inProps) => {
  const props = { ...DsBottomSheetDefaultProps, ...inProps }

  const handleDrawerClose = (
    event: React.SyntheticEvent,
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    const { onClose } = props
    if (typeof onClose === 'function') {
      onClose(event, reason)
    }
  }

  const handleCloseClick = (event: React.SyntheticEvent) => {
    const { onClose } = props
    if (typeof onClose === 'function') {
      onClose(event, 'backdropClick')
    }
  }

  const {
    kicker,
    title,
    description,
    showClose,
    primaryButtonText,
    primaryButtonProps,
    secondaryButtonText,
    secondaryButtonProps,
    PaperProps,
    ContainerProps,
    KickerProps,
    DescriptionProps,
    TitleProps,
    CloseIconButtonProps,
    CloseIconProps,
    ContentProps,
    ActionsProps,
    children,
    onClose,
    slotProps,
    ...DrawerProps
  } = props

  const actionsAvailable = !!(primaryButtonText || secondaryButtonText)
  const isFlushed =
    primaryButtonText &&
    !secondaryButtonText &&
    primaryButtonProps &&
    primaryButtonProps?.variant === 'flushed'
  const accessibilityProps: Partial<DsDrawerProps> = {}

  if (title) {
    accessibilityProps['aria-labelledby'] = title as string
  }

  if (kicker) {
    accessibilityProps['aria-describedby'] = kicker
  }

  const paperProps = {
    ...PaperProps,
    ...slotProps?.paper
  };

  return (
    <DsDrawer
      {...accessibilityProps}
      {...DrawerProps}
      anchor='bottom'
      slotProps={{
        ...slotProps,
        paper: mergeSlotProps(paperProps, {
          sx: {
            background: 'transparent',
            maxHeight: 'var(--ds-rules-bottomSheetWorkingAreaHeight)',
          },
        }),
      }}
      onClose={handleDrawerClose}
    >
      {showClose && (
        <DsIconButton
          onClick={handleCloseClick}
          {...CloseIconButtonProps}
          sx={{
            flexGrow: 0,
            alignSelf: 'center',
            backgroundColor: 'var(--ds-colour-iconDefault)',
            color: 'var(--ds-colour-iconDisabled)',
            borderRadius: '50%',
            p: 'var(--ds-spacing-glacial)',
            mb: 'var(--ds-spacing-bitterCold)',
            ...CloseIconButtonProps?.sx
          }}
        >
          <DsRemixIcon className='ri-close-line' {...CloseIconProps} />
        </DsIconButton>
      )}

      <DsPaper
        {...ContainerProps}
        sx={{
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          pt: 'var(--ds-spacing-mild)',
          pb: isFlushed ? undefined : 'var(--ds-spacing-bitterCold)',
          borderTopLeftRadius: 'var(--ds-radius-bitterCold)',
          borderTopRightRadius: 'var(--ds-radius-bitterCold)',
          ...ContainerProps?.sx
        }}
      >
        {kicker && (
          <DsTypography
            variant='subheadingSemiboldDefault'
            {...KickerProps}
            sx={{
              color: 'text.tertiary',
              px: 'var(--ds-spacing-bitterCold)',
              mb: 'var(--ds-spacing-quickFreeze)',
              textTransform: 'uppercase',
              ...KickerProps?.sx
            }}
          >
            {kicker}
          </DsTypography>
        )}

        {title && (
          <DsDialogTitle
            {...TitleProps}
            sx={{
              mb: 'var(--ds-spacing-zero)',
              px: 'var(--ds-spacing-bitterCold)',
              ...TitleProps?.sx
            }}
          >
            {title}
          </DsDialogTitle>
        )}

        {description && (
          <DsTypography
            variant='bodyRegularMedium'
            color='text.secondary'
            {...DescriptionProps}
            sx={{
              px: 'var(--ds-spacing-bitterCold)',
              mt: 'var(--ds-spacing-quickFreeze)',
              ...DescriptionProps?.sx
            }}
          >
            {description}
          </DsTypography>
        )}

        {children && (
          <DsDialogContent
            {...ContentProps}
            sx={{
              px: 'var(--ds-spacing-bitterCold)',
              marginTop: 'var(--ds-spacing-mild)',
              ...ContentProps?.sx
            }}
          >
            {children}
          </DsDialogContent>
        )}

        {actionsAvailable && (
          <DsDialogActions
            {...ActionsProps}
            sx={{
              px: isFlushed ? undefined : 'var(--ds-spacing-bitterCold)',
              mt: 'var(--ds-spacing-bitterCold)',
              pt: isFlushed ? undefined : 'var(--ds-spacing-bitterCold)',
              ...ActionsProps?.sx
            }}
          >
            {(secondaryButtonText || secondaryButtonProps?.children) && (
              <DsButton
                color='secondary'
                size='large'
                fullWidth
                {...secondaryButtonProps}
              >
                {secondaryButtonText || secondaryButtonProps?.children}
              </DsButton>
            )}
            {(primaryButtonText || primaryButtonProps?.children) && (
              <DsButton size='large' fullWidth {...primaryButtonProps}>
                {primaryButtonText || primaryButtonProps?.children}
              </DsButton>
            )}
          </DsDialogActions>
        )}
      </DsPaper>
    </DsDrawer>
  )
}