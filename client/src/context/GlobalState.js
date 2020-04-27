import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

const initialState = {
  user: null,
  activities: [],
  error: null,
  loading: true,
  authorized: false
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

  return (
    <GlobalContext.Provider value={{
      user: state.user,
      activities: state.activities,
      error: state.error,
      loading: state.loading,
      getUser,
      getActivities
    }}>
      {children}
    </GlobalContext.Provider>)
}
