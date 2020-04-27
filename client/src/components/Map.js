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
  const { user, getUser, loading } = useContext(GlobalContext)

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (!loading && (user ? <AuthorizedApp /> : <UnauthorizedApp />))
}

const AuthorizedApp = () => {
  return <ControlPanel />
}

const UnauthorizedApp = () => {
  return <Login />
}

export const Map = () => {
  const { viewport, setViewport } = useContext(GlobalContext)

  return (
    <ReactMapGL
      {...viewport}
      width='100vw'
      height='100vh'
      mapStyle='mapbox://styles/mapbox/dark-v9'
      onViewportChange={viewport => setViewport(viewport)}
      center={viewport.center}
      zoom={viewport.zoom}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      <MapComponents />
    </ReactMapGL>
  )
}
