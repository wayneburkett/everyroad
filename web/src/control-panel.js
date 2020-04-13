import * as React from 'react'

export default class ControlPanel extends React.Component {
  renderStream (stream, i) {
    return (
      <div key={i} className='txt-s'>
        <span>{`${stream.name.toLocaleString()}`}</span>
      </div>
    )
  }

  render () {
    const streams = this.props.items || []
    return (
      <div>
        <div className='bg-white absolute top lef ml12 mt12 py12 px12 shadow-darken10 round z1 wmax180'>
          <div className='mb6'>
            <h2 className='txt-bold txt-s block'>Rides</h2>
            <p className='txt-s color-gray'>Your rides</p>
          </div>
          {streams.map(this.renderStream)}
        </div>
      </div>
    )
  }
}
