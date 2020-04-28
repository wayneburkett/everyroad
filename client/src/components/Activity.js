import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const Activity = ({ activity }) => {
  const { getStream } = useContext(GlobalContext)

  return (
    <li>
      <span className='activity' onClick={() => getStream(activity.id)}>{activity.name}</span>
    </li>
  )
}
