import React from 'react'

import type { IDsOtpHeaderProps } from '../DsOtpVerification.Types'
import { DsAppBar, DsRemixIcon } from '../../../Components'

const DsOtpHeader: React.FC<IDsOtpHeaderProps> = ({ onClose, ...rest }) => {
  return (
    <>
      <DsAppBar
        appBarTitle=''
        color={'default'}
        navigation={
          <DsRemixIcon className='ri-arrow-left-line' onClick={onClose} />
        }
        position='absolute'
        sx={{ boxShadow: 'none', width: '100%', zIndex: 1 }}
        {...rest}
      />
    </>
  )
}

export default DsOtpHeader
