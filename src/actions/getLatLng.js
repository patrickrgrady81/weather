export const getLatLng = (city) => { 
  console.log('b')
  return async (dispatch) => {
    console.log('c')
    const key = process.env.REACT_APP_MAPQUEST;
    const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${key}&inFormat=kvp&outFormat=json&location=${city}`;
    const fetchInfo = {
      "method": "GET",
      "headers": {}
    }
    const response = await fetch(url, fetchInfo);
    console.log('d')
    const data = await response.json();
    console.log('e')
    const newCity = `${data.results[0].locations[0].adminArea5}, ${data.results[0].locations[0].adminArea3}`;
    dispatch({ type: 'UPDATE_CITY', city: newCity });
    console.log('f')
  }
}