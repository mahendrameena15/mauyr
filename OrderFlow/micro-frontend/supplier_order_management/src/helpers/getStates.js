export const getStates = async () => {
  const mastersUrl = process.env.REACT_APP_MASTERS_URL

  const states = await fetch(
    `${mastersUrl}/api/State`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  return states;
};
