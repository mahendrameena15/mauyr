export const getInnerUnitMeasureType = async () => {
  const mastersUrl = process.env.REACT_APP_MASTERS_URL;

  const innerUnitMeasureTypeResponse = await fetch(
    `${mastersUrl}/api/InnerUOMtype`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));

  return innerUnitMeasureTypeResponse;
};
