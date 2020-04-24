import * as React from 'react'

export default function ControlPanel (props) {
  const renderStream = (stream, i) => {
    return (
      <div key={i} className='txt-s'>
        <span>{`${stream.name.toLocaleString()}`}</span>
      </div>
    )
  }

  const streams = props.items || []

  return (
    <div>
      <div className='bg-white absolute top lef ml12 mt12 py12 px12 shadow-darken10 round z1 wmax180'>
        <div className='mb6'>
          <h2 className='txt-bold txt-s block'>Rides</h2>
          <p className='txt-s color-gray'>Your rides</p>
        </div>
        {streams.map(renderStream)}
      </div>
    </div>
  )
}
