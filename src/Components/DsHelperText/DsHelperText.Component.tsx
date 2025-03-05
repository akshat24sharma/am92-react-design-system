import { FC } from 'react'
import {
  DsHelperTextProps
} from './DsHelperText.Types'
import { DsFormHelperText } from '../DsFormHelperText'
import { DsBox } from '../DsBox'
import { DsTypography } from '../DsTypography'
import { DsRemixIcon } from '../DsRemixIcon'

export const DsHelperText:FC<DsHelperTextProps> = (props) => {

    const { helperText, color, success, error, ...formHelperTextProps } = props

    const customColor = success ? 'success' : color

    const iconClassName =
      (error && 'ri-error-warning-fill') ||
      (success && 'ri-checkbox-circle-fill') ||
      false

    return (
      helperText && (
        <DsFormHelperText
          component="div"
          color={customColor}
          error={error}
          {...formHelperTextProps}
        >
          <DsBox
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              color: `${customColor}.main`
            }}
          >
            {iconClassName && (
              <DsRemixIcon
                className={iconClassName}
                color="inherit"
                fontSize="cool"
                sx={{
                  mr: 'var(--ds-spacing-quickFreeze)',
                  padding: 'var(--ds-spacing-deepFreeze)'
                }}
              />
            )}
            <DsTypography
              variant="bodyRegularSmall"
              color="inherit"
              sx={{ pl: 'var(--ds-spacing-deepFreeze)' }}
            >
              {helperText}
              &#8203;
            </DsTypography>
          </DsBox>
        </DsFormHelperText>
      )
    )
}
