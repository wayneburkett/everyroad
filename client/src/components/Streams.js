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

  const fitBounds = (viewport, bounds) => {
    const [minLng, minLat, maxLng, maxLat] = bounds
    const merc = new WebMercatorViewport(viewport)
    return merc.fitBounds([[minLng, minLat], [maxLng, maxLat]], { padding: 60 })
  }

  useEffect(() => {
    const stream = streams[streams.length - 1]
    if (stream && stream.geojson && stream.geojson.bbox) {
      const { longitude, latitude, zoom } = fitBounds(viewport, stream.geojson.bbox)
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
      {streams && streams.map((stream, i) => {
        return (
          <Source type='geojson' data={stream.geojson} key={i}>
            <Layer {...lineLayer} />
          </Source>
        )
      })}
    </>
  )
}
