import React from 'react'
import { ActivitiesList } from './ActivitiesList'

export const ControlPanel = () => {
  return (
    <div className='map-overlay top'>
      <div className='map-overlay-inner'>
        <div>
          <ActivitiesList />
        </div>
      </div>
    </div>
  )
}
