import React from 'react'
import { render } from 'react-dom'
import MapGL from 'react-map-gl'
import ControlPanel from './control-panel'

const MAPBOX_TOKEN = 'pk.eyJ1IjoibHdidXJrIiwiYSI6ImNqZ21mbm9pdDFiZXgzM21uaTVrNWpqNW4ifQ.d-nFW-zZRUKXM5E8rdgW3Q'

class Application extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewport: {
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14,
        bearing: 0,
        pitch: 0
      }
    }
  }

  _onLoad () {
    this.fetchActivities()
  }

  render () {
    const streams = this.state.streams || []
    const renderStream = (stream, i) => {
      return (
        <div key={i} className='txt-s'>
          <span>{`${stream.name.toLocaleString()}`}</span>
        </div>
      )
    }
    return (
      <MapGL
        {...this.state.viewport}
        width='100vw'
        height='100vh'
        mapStyle='mapbox://styles/mapbox/dark-v9'
        onViewportChange={viewport => this.setState({ viewport })}
        onLoad={_ => this._onLoad()}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <div>
          <div className='bg-white absolute top lef ml12 mt12 py12 px12 shadow-darken10 round z1 wmax180'>
            <div className='mb6'>
              <h2 className='txt-bold txt-s block'>Rides</h2>
              <p className='txt-s color-gray'>Your rides</p>
            </div>
            {streams.map(renderStream)}
          </div>
        </div>
      </MapGL>
    )
  }

  componentDidUpdate () {
  }

  componentDidMount () {
  }

  fetchActivities () {
    fetch('/activities')
      .then(result => result.json())
      .then(data => {
        this.setState({ streams: data })
      })
  }
}

render(<Application />, document.getElementById('app'))
