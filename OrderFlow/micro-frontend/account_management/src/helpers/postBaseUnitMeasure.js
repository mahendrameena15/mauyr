export const postBaseUnitMeasure = async (unit) => {
  const organisationId = localStorage.getItem("organisationId");
  const mastersUrl = process.env.REACT_APP_MASTERS_URL;
  const body = unit.map((item) => {
    return {
      unit: `${item?.amount} ${item?.bumUnit}`,
      type: item?.type,
    };
  });

  const postBaseUnitMeasureResponse = await fetch(
    `${mastersUrl}/api/baseUnitMeasure/CreateBaseUnit?OrganisationID=${organisationId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data;
      else return false;
    })
    .catch((error) => console.log(error));

  return postBaseUnitMeasureResponse;
};
