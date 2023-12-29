export const getInnerUnitMeasureList = async () => {
  const organisationId = localStorage.getItem("organisationId");
  const mastersUrl = process.env.REACT_APP_MASTERS_URL;

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

export const getbaseUnitMeasureList = async () => {
  const organisationId = localStorage.getItem("organisationId");
  const mastersUrl = process.env.REACT_APP_MASTERS_URL;

  const baseUnitMeasureResponse = await fetch(
    `${mastersUrl}/api/baseUnitMeasure/get?OrganisationID=${organisationId}`,
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

  return baseUnitMeasureResponse;
};
