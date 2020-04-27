import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Activity } from './Activity'

export const ActivitiesList = () => {
  const { activities, getActivities } = useContext(GlobalContext)

  useEffect(() => {
    getActivities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h2>Activities</h2>
      <ul className='activities-list'>
        {activities && activities.map(activity => (<Activity key={activity.id} activity={activity} />))}
      </ul>
    </div>
  )
}
