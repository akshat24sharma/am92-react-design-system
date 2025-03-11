import { FC } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import { DsBox } from '../DsBox'
import { DsTypography } from '../DsTypography'
import { DsStack } from '../DsStack'

import {  DsAppBarProps } from './DsAppBar.Types'

export const DsAppBar: FC<DsAppBarProps> = (props) => {

    const { navigation, appBarTitle, actions, ...appBarProps } = props

    const contentJSX =
      typeof appBarTitle === 'string' ? (
        <DsTypography variant="headingBoldSmall" color="inherit">
          {appBarTitle}
        </DsTypography>
      ) : (
        appBarTitle
      )

    return (
      <AppBar {...appBarProps}>
        <Toolbar>
          {navigation && (
            <DsBox
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pr: 'var(--ds-spacing-bitterCold)'
              }}
            >
              {navigation}
            </DsBox>
          )}
          <DsBox
            sx={{
              display: 'inline-flex',
              justifyContent: 'start',
              alignItems: 'center',
              flexGrow: 1
            }}
          >
            {contentJSX}
          </DsBox>
          {actions && (
            <DsStack
              direction="row"
              spacing="var(--ds-spacing-bitterCold)"
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                ml: 'var(--ds-spacing-bitterCold)'
              }}
            >
              {actions}
            </DsStack>
          )}
        </Toolbar>
      </AppBar>
    )
}
