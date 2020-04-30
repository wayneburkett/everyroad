import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const Activity = ({ activity }) => {
  const { getStream } = useContext(GlobalContext)

  const onClick = () => {
    if (!activity.loaded) {
      activity.loaded = true
      getStream(activity.id)
    }
  }

  return (
    <li>
      <span className={activity.loaded ? 'activity loaded' : 'activity'} onClick={onClick}>{activity.name}</span>
    </li>
  )
}
