import React from 'react'
import { Map } from './components/Map'
import { GlobalProvider } from './context/GlobalState'

function Application() {
  return (
    <GlobalProvider><Map /></GlobalProvider>
  )
}

export default Application
