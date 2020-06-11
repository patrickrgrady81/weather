const initialState = {
  city: "Philadelphia, PA",
  weather: null,
  hourly: null,
  daily: null, 
  map: null,
  restaurants: null,
  events: null,
  loggedIn: true,
}

const rootReducer = (state = initialState, action) => {
  // if (typeof state === 'undefined') {
  //   return initialState
  // }

  switch (action.type) {
    case 'UPDATE_CITY':
      return {...state, city: action.city };
    
    case 'UPDATE_MAP':
      return {...state, map: action.map };
    
    case 'UPDATE_DAILY':
      return {...state, daily: action.daily };

    case 'UPDATE_HOURLY':
      return {...state, hourly: action.hourly };

    case 'UPDATE_WEATHER':
      return {...state, weather: action.weather };

    case 'UPDATE_RESTAURANTS':
      return {...state, restaurants: action.restaurants };
    
    case 'UPDATE_EVENTS':
      return {...state, events: action.events };
 
    default:
      return state;
  }
}

export default rootReducer;