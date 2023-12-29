export const getStates = async () => {
  const mastersUrl = process.env.REACT_APP_MASTERS_URL
  try {
    const response = await fetch(
      `${mastersUrl}/api/State`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));

    return response;
  } catch (error) {
    throw new Error(error);
  }
};
