export const postInnerUnitMeasure = async (value) => {
  const organisationId = localStorage.getItem("organisationId");
  const mastersUrl = process.env.REACT_APP_MASTERS_URL;

  const body = value.map((item) => {
    return {
      unit: `${item?.amount} ${item?.iumUnit}`,
      type: item?.iumType,
    };
  });
  const innerUnitMeasureResponse = await fetch(
    `${mastersUrl}/api/innerUnitOfMeasure/CreateBaseUnit?OrganisationID=${organisationId}`,
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

  return innerUnitMeasureResponse;
};
