import React, { FC, PureComponent } from 'react'
import { DsStack } from '../DsStack'
import { DsChipGroupDefaultProps, DsChipGroupProps } from './DsChipGroup.Types'

export const DsChipGroup: FC<DsChipGroupProps> = (inProps) => {
  const props = { ...DsChipGroupDefaultProps, ...inProps }

    const { children, ...restStackProps } = props
    return (
      <DsStack
        direction={'row'}
        spacing={'var(--ds-spacing-glacial)'}
        {...restStackProps}
      >
        {children}
      </DsStack>
    )
}
