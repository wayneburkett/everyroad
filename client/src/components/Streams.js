import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import ReactMapGL, { Source, Layer, LinearInterpolator, WebMercatorViewport } from 'react-map-gl'

export const Streams = () => {
  const { streams, viewport, setViewport } = useContext(GlobalContext)

  const lineLayer = {
    type: 'line',
    paint: {
      'line-color': 'red',
      'line-opacity': 0.75,
      'line-width': 3
    }
  }

  const getCoordinates = (stream) => {
    return (stream && stream.features[0] && stream.features[0].geometry)
      ? stream.features[0].geometry.coordinates
      : []
  }

  const fitBounds = (viewport, bounds) => {
    const [minLng, minLat, maxLng, maxLat] = bounds
    const merc = new WebMercatorViewport(viewport)
    return merc.fitBounds([[minLng, minLat], [maxLng, maxLat]], { padding: 60 })
  }

  const bbox = (stream) => {
    const coords = getCoordinates(stream)
    const result = [Infinity, Infinity, -Infinity, -Infinity]
    coords.forEach((coord) => {
      if (result[0] > coord[0]) { result[0] = coord[0]; }
      if (result[1] > coord[1]) { result[1] = coord[1]; }
      if (result[2] < coord[0]) { result[2] = coord[0]; }
      if (result[3] < coord[1]) { result[3] = coord[1]; }
    })
    return result
  }

  useEffect(() => {
    const stream = streams[streams.length - 1]
    if (stream) {
      const { longitude, latitude, zoom } = fitBounds(viewport, bbox(stream))
      setViewport({
        ...viewport,
        longitude,
        latitude,
        zoom
      })
    }
  }, [streams])

  return (
    <>
      {streams && streams.map((stream) => {
        return (
          <Source type='geojson' data={stream}>
            <Layer {...lineLayer} />
          </Source>
        )
      })}
    </>
  )
}

