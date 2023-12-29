export const getBaseUnitMeasureType = async () => {
  const mastersUrl = process.env.REACT_APP_MASTERS_URL;

  const baseUnitMeasureType = await fetch(
    `${mastersUrl}/api/_BaseUOMType`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  return baseUnitMeasureType;
};
