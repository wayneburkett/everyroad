import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const Activity = ({ activity }) => {
  return (
    <li className='txt-s'>
      <span>{`${activity.name}`}</span>
    </li>
  )
}
