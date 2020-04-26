import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import strava_button from '../assets/strava/btn_strava_connectwith_orange/btn_strava_connectwith_orange.png'

const STRAVA_AUTH_URL = 'http://localhost:3003/api/v1/auth/strava'

export const StravaButton = () => {
  const title = 'Login with Strava'
  return (
    <a href={STRAVA_AUTH_URL}><img src={strava_button} alt={title} title={title} /></a>
  )
}
  
