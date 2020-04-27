import React, { useContext, useEffect } from 'react'
import ReactMapGL, { Source, Layer } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import { ControlPanel } from './ControlPanel'
import { Login } from './Login'
import { GlobalContext } from '../context/GlobalState'

const MAPBOX_TOKEN = 'pk.eyJ1IjoibHdidXJrIiwiYSI6ImNqZ21mbm9pdDFiZXgzM21uaTVrNWpqNW4ifQ.d-nFW-zZRUKXM5E8rdgW3Q'

const lineLayer = {
  type: 'line',
  paint: {
    'line-color': 'red',
    'line-opacity': 0.75,
    'line-width': 3
  }
}

const MapComponents = () => {
  const { user, getUser } = useContext(GlobalContext)

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (user ? <AuthorizedApp /> : <UnauthorizedApp />)
}

const AuthorizedApp = () => {
  return <ControlPanel />
}

const UnauthorizedApp = () => {
  return <Login />
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
        <MapComponents />
      </ReactMapGL>
    )
  }
}
