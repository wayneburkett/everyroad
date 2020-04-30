import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const User = () => {
  const { user } = useContext(GlobalContext)
  const photo = (user.strava && user.strava.photos && user.strava.photos[0] && user.strava.photos[0].value)

  return (
    <div className='user-section'>
      {photo && (<img src={photo} alt={user.name} className='user-image' width='24' height='24' />)}
      <span className='user-name'>{user.name}</span>
    </div>
  )
}
