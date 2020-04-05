const axios = require('axios')

// this is just getting strava for now, but that might change, so we
// should try to get it reasonably generic

const BASE_API_URL = 'https://www.strava.com/api/v3/'

module.exports.getActivities = (req, res) => {
  get(req, res, 'athlete/activities')
}

module.exports.getActivity = (req, res) => {
  get(req, res, 'activities/' + req.params.id)
}

module.exports.getActivityStream = (req, res) => {
  get(req, res, 'activities/' + req.params.id + '/streams', {
    keys: 'latlng',
    key_by_type: true
  }, streamToGeoJson)
}

function get (req, res, path, params, transform) {
  makeRequest(req, path, params)
    .then(response => {
      res.send((typeof transform === 'function')
        ? transform(response.data)
        : response.data)
    }).catch(error => {
      res.send(error)
    })
}

function makeRequest (req, path, params) {
  return axios({
    url: BASE_API_URL + path,
    params: params || {},
    headers: {
      Authorization: 'Bearer ' + req.user.token,
      accept: 'application/json'
    }
  })
}

function streamToGeoJson (response) {
  return makeGeoJson(swapCoords(response && response.latlng && response.latlng.data))
}

// GeoJson requires [long, lat]; strava returns [lat, long]
// swap 'em
function swapCoords (coords) {
  return coords ? coords.map(function (item) {
    return [item[1], item[0]]
  }) : []
}

function makeGeoJson (coords) {
  return {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: coords
      }
    }]
  }
}
