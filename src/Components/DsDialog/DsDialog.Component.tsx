import * as React from 'react'
import { DsDialogDefaultProps, DsDialogProps } from './DsDialog.Types'
import { DsDialogTitle } from '../DsDialogTitle'
import { Dialog } from '@mui/material'
import { DsIconButton } from '../DsIconButton'
import { DsRemixIcon } from '../DsRemixIcon'
import { DsTypography } from '../DsTypography'
import { DsDialogContent } from '../DsDialogContent'
import { DsDialogActions } from '../DsDialogActions'
import { DsButton } from '../DsButton'
import { mergeSlotProps } from '../../utils'

export const DsDialog: React.FC<DsDialogProps> = inProps => {
  const props = { ...DsDialogDefaultProps, ...inProps }

  const handleCloseClick = (event: React.SyntheticEvent) => {
    const { onClose } = props
    if (typeof onClose === 'function') {
      onClose(event, 'backdropClick')
    }
  }

  const {
    title,
    description,
    kicker,
    showClose,
    primaryButtonText,
    primaryButtonProps,
    secondaryButtonText,
    secondaryButtonProps,
    PaperProps,
    TitleProps,
    DescriptionProps,
    CloseIconButtonProps,
    CloseIconProps,
    KickerProps,
    ContentProps,
    ActionsProps,
    children,
    slotProps,
    ...DialogProps
  } = props

  const actionsAvailable = !!(primaryButtonText || secondaryButtonText)
  const accessibilityProps: Partial<DsDialogProps> = {}
  const isFlushed =
    primaryButtonText &&
    !secondaryButtonText &&
    primaryButtonProps &&
    primaryButtonProps?.variant === 'flushed'

  if (title) {
    accessibilityProps['aria-labelledby'] = title
  }

  if (description) {
    accessibilityProps['aria-describedby'] = description
  }

  const paperProps = {
    ...PaperProps,
    ...slotProps?.paper
  }

  return (
    <Dialog
      keepMounted
      {...accessibilityProps}
      {...DialogProps}
      slotProps={{
        ...slotProps,
        paper: mergeSlotProps(paperProps, {
          sx: {
            pb: isFlushed
              ? undefined
              : {
                xs: 'var(--ds-spacing-bitterCold)',
                md: 'var(--ds-spacing-warm)'
              },
            pt: {
              xs: 'var(--ds-spacing-mild)',
              md: 'var(--ds-spacing-warm)'
            },
          },
        }),
      }}
    >
      {kicker && (
        <DsTypography
          variant='subheadingSemiboldDefault'
          color='var(--ds-colour-typoTertiary)'
          {...KickerProps}
          sx={{
            px: {
              xs: 'var(--ds-spacing-bitterCold)',
              md: 'var(--ds-spacing-warm)'
            },
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
            width: showClose ? 'calc(100% - 44px)' : '100%',
            px: {
              xs: 'var(--ds-spacing-bitterCold)',
              md: 'var(--ds-spacing-warm)'
            },
            ...TitleProps?.sx
          }}
        >
          {title}
        </DsDialogTitle>
      )}
      {description && (
        <DsTypography
          variant='bodyRegularMedium'
          color='var(--ds-colour-typoSecondary)'
          {...DescriptionProps}
          sx={{
            px: {
              xs: 'var(--ds-spacing-bitterCold)',
              md: 'var(--ds-spacing-warm)'
            },
            ...DescriptionProps?.sx
          }}
        >
          {description}
        </DsTypography>
      )}
      {showClose && (
        <DsIconButton
          onClick={handleCloseClick}
          {...CloseIconButtonProps}
          sx={{
            position: 'absolute',
            padding: 'var(--ds-spacing-quickFreeze)',
            borderRadius: 'var(--ds-radius-mild)',
            top: {
              xs: 'var(--ds-spacing-mild)',
              md: 'var(--ds-spacing-warm)'
            },
            right: {
              xs: 'var(--ds-spacing-bitterCold)',
              md: 'var(--ds-spacing-warm)'
            },
            ...CloseIconButtonProps?.sx
          }}
        >
          <DsRemixIcon className='ri-close-line' {...CloseIconProps} />
        </DsIconButton>
      )}
      {children && (
        <DsDialogContent
          {...ContentProps}
          sx={{
            px: {
              xs: 'var(--ds-spacing-bitterCold)',
              md: 'var(--ds-spacing-warm)'
            },
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
            px: isFlushed
              ? undefined
              : {
                  xs: 'var(--ds-spacing-bitterCold)',
                  md: 'var(--ds-spacing-warm)'
                },
            pt: isFlushed
              ? undefined
              : {
                xs: 'var(--ds-spacing-bitterCold)',
                md: 'var(--ds-spacing-warm)'
              },
            mt: 'var(--ds-spacing-glacial)',
            ...ActionsProps?.sx
          }}
        >
          {(secondaryButtonText || secondaryButtonProps?.children) && (
            <DsButton
              color='secondary'
              size='medium'
              fullWidth
              {...secondaryButtonProps}
            >
              {secondaryButtonText || secondaryButtonProps?.children}
            </DsButton>
          )}
          {(primaryButtonText || primaryButtonProps?.children) && (
            <DsButton size='medium' fullWidth {...primaryButtonProps}>
              {primaryButtonText || primaryButtonProps?.children}
            </DsButton>
          )}
        </DsDialogActions>
      )}
    </Dialog>
  )
}