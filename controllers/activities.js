const axios = require('axios')

// this is just getting strava for now, but that might change, so we
// should try to make it reasonably generic

const BASE_API_URL = 'https://www.strava.com/api/v3/'

// @desc    Get all activities
// @route   GET /api/v1/activities
// @access  Public
module.exports.getActivities = (req, res) => {
  get(req, res, 'athlete/activities', {
    // 100 is the most you can get per page. we'll need to make queries
    // until we get a response with fewer than 100 results (indicating that it's
    // the last page) and then we'll batch them all up into one response
    per_page: 100,
    page: req.query.page
  },
  (data) => data.map(activity => ({
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
  }, (data) => {
    return {
      activityId: req.params.id,
      retrievedAt: new Date(),
      geojson: streamToGeoJson(data)
    }
  })
}

function get (req, res, path, params, transform) {
  makeRequest(req, path, params)
    .then(response => {
      return res.status(200).json({
        success: true,
        data: (typeof transform === 'function') ? transform(response.data) : response.data
      })
    }).catch(error => {
      return res.status(500).json({
        success: false,
        error: error
      })
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
    bbox: bbox(coords),
    features: [{
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: coords
      }
    }]
  }
}

function bbox (coords) {
  const result = [Infinity, Infinity, -Infinity, -Infinity]
  coords.forEach((coord) => {
    if (result[0] > coord[0]) { result[0] = coord[0] }
    if (result[1] > coord[1]) { result[1] = coord[1] }
    if (result[2] < coord[0]) { result[2] = coord[0] }
    if (result[3] < coord[1]) { result[3] = coord[1] }
  })
  return result
}
