import React from 'react'
import { StravaButton } from './StravaButton'

export const Login = () => {
  return (
    <div className='bg-darken10 viewport-half'>
        <div className='flex-parent flex-parent--center-main pt36'>
          <div className='flex-child bg-white round relative w600'>
            <div className='px24 py24'>
              <div className='txt-l mb12'>Modal title</div>
              <div className='txt-m'>
                <StravaButton />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
