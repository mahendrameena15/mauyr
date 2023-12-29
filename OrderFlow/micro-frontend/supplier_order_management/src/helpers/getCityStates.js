export const getCityStates = async () => {
  const mastersUrl = process.env.REACT_APP_MASTERS_URL
  const cityStates = fetch(
    `${mastersUrl}/api/CityStateRegion`,
    {
      method: "GET",
    }
  ).then(response => response.json())
  .then(data => {
    return data;
  }).catch(error => console.log(error))

  return cityStates
};
