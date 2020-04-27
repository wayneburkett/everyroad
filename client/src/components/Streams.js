import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import ReactMapGL, { Source, Layer } from 'react-map-gl'

export const Streams = () => {
  const { streams } = useContext(GlobalContext)

  const lineLayer = {
    type: 'line',
    paint: {
      'line-color': 'red',
      'line-opacity': 0.75,
      'line-width': 3
    }
  }

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

