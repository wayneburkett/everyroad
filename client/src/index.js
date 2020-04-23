import React from 'react'
import { render } from 'react-dom'
import MapGL, {Source, Layer} from 'react-map-gl'
import mapboxgl from 'mapbox-gl';
import ControlPanel from './control-panel'

const MAPBOX_TOKEN = 'pk.eyJ1IjoibHdidXJrIiwiYSI6ImNqZ21mbm9pdDFiZXgzM21uaTVrNWpqNW4ifQ.d-nFW-zZRUKXM5E8rdgW3Q'

const lineLayer = {
  type: 'line',
  paint: {
    'line-color': 'red',
    'line-opacity': 0.75,
    'line-width': 3
  }
}


class Application extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewport: {
        center: [50.8437787, -22.2],
        zoom: 4,
      },
      streams: [],
      coords: null
    }
  }

  _onLoad () {
    this.fetchActivities()
      .then(data => {
        console.log(data)
        const stream = data[0] || {}
        fetch('activities/' + stream.id + '/stream')
          .then(result => result.json())
          .then(s => {
            console.log(s)
            let coords = s.features[0].geometry.coordinates
            let id = 'trace_' + s.id
            console.log(coords)
            this.setState({ coords: s })
          })
      })
  }

  getBounds (geojson) {
    if (!geojson) return
    var coordinates = geojson.features[0].geometry.coordinates;
    console.log("doing it")
    return coordinates.reduce(function(bounds, coord) {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
  }

  render () {
    const {viewport, streams, coords} = this.state;
    return (
      <MapGL
        {...this.state.viewport}
        width='100vw'
        height='100vh'
        mapStyle='mapbox://styles/mapbox/dark-v9'
        onViewportChange={viewport => this.setState({ viewport })}
        onLoad={_ => this._onLoad()}
        center={viewport.center}
        zoom={viewport.zoom}
        fitBounds={this.getBounds(coords)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {coords && (
          <Source type="geojson" data={coords}>
            <Layer {...lineLayer} />
          </Source>
        )}
        <ControlPanel items={streams} />
      </MapGL>
    )
  }

  componentDidUpdate () {
  }

  componentDidMount () {
  }

  fetchActivities () {
    return fetch('/activities')
      .then(result => result.json())
      .then(data => {
        this.setState({ streams: data })
        return data
      })
  }
}

render(<Application />, document.getElementById('app'))
