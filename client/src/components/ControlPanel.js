import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { ActivitiesList } from './ActivitiesList'

export const ControlPanel = () => {
  return (
    <div className='bg-white absolute top lef ml12 mt12 py12 px12 shadow-darken10 round z1 wmax180'>
      <div className='mb6'>
        <ActivitiesList />
      </div>
    </div>
  )
}
