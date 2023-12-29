export const getOrganisationDetails = async () => {
  const organisationUrl = process.env.REACT_APP_ORGANISATION_URL
  const orgID = localStorage.getItem("organisationId");
  const organisationDetails = await fetch(
    `${organisationUrl}/api/Organization/get?organizationId=${orgID}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.data[0];
      else return new Error("Some error occurred on fetching data.");
    });

  return organisationDetails;
};
