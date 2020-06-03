const initialState = {
  city: "Philadelphia, PA",
  weather: null,
  hourly: null,
  daily: null, 
  map: null,
  restaurants: null,
  events: null,
  loggedIn: false,
}

const rootReducer = (state = initialState, action) => {
  // if (typeof state === 'undefined') {
  //   return initialState
  // }

  switch (action.type) {
    case 'UPDATE_CITY':
      return Object.assign({}, state, { city: action.city });
    
    case 'UPDATE_MAP':
      return Object.assign({}, state, { map: action.map });
    
    case 'UPDATE_DAILY':
      return Object.assign({}, state, { daily: action.daily });

    case 'UPDATE_HOURLY':
      return Object.assign({}, state, { hourly: action.hourly });

    case 'UPDATE_WEATHER':
      return Object.assign({}, state, { weather: action.weather });

    case 'UPDATE_RESTAURANTS':
      return Object.assign({}, state, { restaurants: action.restaurants });
    
    case 'UPDATE_EVENTS':
      return Object.assign({}, state, { events: action.events });
 
    default:
      return state;
  }
}

export default rootReducer;