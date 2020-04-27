import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

const initialState = {
  user: null,
  activities: [],
  error: null,
  loading: true,
  authorized: false,
  viewport: {
    center: [50.8437787, -22.2],
    zoom: 4
  },
  streams: []
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  async function getUser () {
    try {
      const res = await axios.get('/api/v1/auth')

      dispatch({
        type: 'GET_USER',
        payload: res.data.data
      })
    } catch (err) {
      dispatch({
        type: 'API_ERROR',
        payload: err.response.data.error
      })
    }
  }

  async function getActivities () {
    try {
      const res = await axios.get('/api/v1/activities')

      dispatch({
        type: 'GET_ACTIVITIES',
        payload: res.data.data
      })
    } catch (err) {
      dispatch({
        type: 'API_ERROR',
        payload: err.response.data.error
      })
    }
  }

  async function getStream (id) {
    try {
      const res = await axios.get(`/api/v1/activities/${id}/stream`)

      dispatch({
        type: 'GET_STREAM',
        payload: res.data.data
      })
    } catch (err) {
      dispatch({
        type: 'API_ERROR',
        payload: err.response.data.error
      })
    }
  }

  function setViewport (viewport) {
    dispatch({
      type: 'SET_VIEWPORT',
      payload: viewport
    })
  }

  return (
    <GlobalContext.Provider value={{
      user: state.user,
      activities: state.activities,
      error: state.error,
      loading: state.loading,
      getUser,
      getActivities,
      viewport: state.viewport,
      setViewport,
      streams: state.streams,
      getStream
    }}>
      {children}
    </GlobalContext.Provider>)
}
