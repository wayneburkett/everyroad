import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const ControlPanel = () => {
  const { activities, getActivities } = useContext(GlobalContext)

  useEffect(() => {
    getActivities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderStream = (stream, i) => {
    return (
      <div key={i} className='txt-s'>
        <span>{`${stream.name.toLocaleString()}`}</span>
      </div>
    )
  }

  return (
    <div>
      <div className='bg-white absolute top lef ml12 mt12 py12 px12 shadow-darken10 round z1 wmax180'>
        <div className='mb6'>
          <h2 className='txt-bold txt-s block'>Rides</h2>
          <p className='txt-s color-gray'>Your rides</p>
        </div>
        {activities && activities.map(renderStream)}
      </div>
    </div>
  )
}
