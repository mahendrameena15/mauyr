export const baseUnitMeasureUnit = async () => {
  const mastersUrl = process.env.REACT_APP_MASTERS_URL;

  const baseUnitOfMeasure = await fetch(
    `${mastersUrl}/api/BaseUOM`,
    {
      method: "GET",
    }
  )
    .then((resposne) => resposne.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  return baseUnitOfMeasure;
};
