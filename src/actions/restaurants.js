export const updateRestaurants = (city) => { 
  return async (dispatch) => {
    dispatch({type: "START_LOADING"})
    const fetchInfo = {
      "method": "POST",
      "headers": {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city })
    }
    const url = "https://pg-city-info.herokuapp.com/api/v1/restaurants"
    const response = await fetch(url, fetchInfo);
    const data = await response.json();
    dispatch({ type: 'LOADING_SUCCESS' });
    dispatch({ type: 'UPDATE_RESTAURANTS', restaurants: data });
  }
}