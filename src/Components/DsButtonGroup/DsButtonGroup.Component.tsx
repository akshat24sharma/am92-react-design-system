import React, { FC } from 'react'
import { DsStack } from '../DsStack'
import {
  DsButtonGroupProps,
  DsButtonGroupDefaultProps
} from './DsButtonGroup.Types'

export const DsButtonGroup: FC<DsButtonGroupProps> = (inProps) => {
  const props= {...DsButtonGroupDefaultProps, ...inProps}

  const getMergedProps = (): DsButtonGroupProps => {
    return { ...DsButtonGroupDefaultProps, ...props }
  }

    const mergedProps = getMergedProps()
    const { fullWidth, noPadding, size, sx, children, ...restProps } =
      mergedProps
    const childrenArray = children instanceof Array ? children : [children]

    return (
      <DsStack
        direction="row"
        spacing="var(--ds-spacing-frostbite)"
        sx={{
          bgcolor: 'var(--ds-colour-surfacePrimary)',
          p: noPadding
            ? 'var(--ds-spacing-zero)'
            : 'var(--ds-spacing-bitterCold)',
          ...sx
        }}
        {...restProps}
      >
        {childrenArray.map(
          (child, key) =>
            child && React.cloneElement(child, { key, size, fullWidth })
        )}
      </DsStack>
    )
}
