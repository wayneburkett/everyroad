import React from 'react'
import { User } from './User'
import { ActivitiesList } from './ActivitiesList'

export const ControlPanel = () => {
  return (
    <div className='map-overlay top'>
      <div className='map-overlay-inner'>
        <User />
        <ActivitiesList />
      </div>
    </div>
  )
}
