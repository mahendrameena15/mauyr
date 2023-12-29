export const getInnerUnitMeasure = async () => {
  const mastersUrl = process.env.REACT_APP_MASTERS_API_URL
  const organisationId = localStorage.getItem("organisationId");
  const response = await fetch(
    `${mastersUrl}/api/innerUnitOfMeasure/get?OrganisationID=${organisationId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.data;
      else return [];
    })
    .catch((error) => console.log(error));

  return response;
};
