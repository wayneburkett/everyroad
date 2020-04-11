const axios = require('axios')

// this is just getting strava for now, but that might change, so we
// should try to get it reasonably generic

const BASE_API_URL = 'https://www.strava.com/api/v3/'

module.exports.getActivities = (req, res) => {
  get(req, res, 'athlete/activities', {
    // 100 is the most you can get per page. we'll need to make queries
    // until we get a response with fewer than 100 results (indicating that it's
    // the last page) and then we'll batch them all up into one response
    per_page: 100,
    page: req.query.page
  }, (data) => data.map(activity => ({
      name: activity.name,
      id: activity.id
  })))
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

// GeoJson requires [long, lat]; strava returns [lat, long], so swap 'em
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
