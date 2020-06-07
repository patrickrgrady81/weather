export const updateRestaurants = (city) => { 
  return async (dispatch) => {
    const fetchInfo = {
      "method": "POST",
      "headers": {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city })
    }
    const url = "http://localhost:3001/api/v1/restaurants"
    const response = await fetch(url, fetchInfo);
    const data = await response.json();
    dispatch({ type: 'UPDATE_RESTAURANTS', restaurants: data });
  }
}