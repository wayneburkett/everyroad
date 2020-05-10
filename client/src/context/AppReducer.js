/**
 * A reducer
 *
 * @param {object} state the previous state
 * @param {{type: string, payload: object}} action
 * @returns {} the new state
 */
export default (state, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        loading: false,
        authorized: true,
        user: action.payload
      }
    case 'GET_ACTIVITIES':
      return {
        ...state,
        loading: false,
        activities: action.payload
      }
    case 'GET_STREAM':
      return {
        ...state,
        loading: false,
        streams: (state.streams || []).concat(action.payload)
      }
    case 'API_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case 'AUTH_ERROR':
      return {
        ...state,
        loading: false,
        authorized: false,
        error: action.payload
      }
    case 'SET_VIEWPORT':
      return {
        ...state,
        viewport: action.payload
      }
    default:
      return state
  }
}
