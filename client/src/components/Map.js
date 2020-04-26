import React from 'react'
import ReactMapGL, { Source, Layer } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import ControlPanel from './ControlPanel'
import Login from './Login'

const MAPBOX_TOKEN = 'pk.eyJ1IjoibHdidXJrIiwiYSI6ImNqZ21mbm9pdDFiZXgzM21uaTVrNWpqNW4ifQ.d-nFW-zZRUKXM5E8rdgW3Q'

const lineLayer = {
  type: 'line',
  paint: {
    'line-color': 'red',
    'line-opacity': 0.75,
    'line-width': 3
  }
}

export class Map extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewport: {
        center: [50.8437787, -22.2],
        zoom: 4
      },
      streams: [],
      coords: null
    }
  }

  render () {
    const { viewport, streams, coords } = this.state
    return (
        <ReactMapGL
          {...this.state.viewport}
          width='100vw'
          height='100vh'
          mapStyle='mapbox://styles/mapbox/dark-v9'
          onViewportChange={viewport => this.setState({ viewport })}
          center={viewport.center}
          zoom={viewport.zoom}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          {coords && (
            <Source type='geojson' data={coords}>
              <Layer {...lineLayer} />
            </Source>
          )}
          <Login />
          <ControlPanel items={streams} />
        </ReactMapGL>
    )
  }
}
