import React from 'react'

export const Activity = ({ activity }) => {
  return (
    <li className='txt-s'>
      <span>{activity.name}</span>
    </li>
  )
}
