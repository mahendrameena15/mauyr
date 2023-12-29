export const getDepartments = async () => {
  const mastersUrl = process.env.REACT_APP_MASTERS_API_URL;
  try {
    const response = await fetch(`${mastersUrl}/api/Department/get`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data.data;
        else return [];
      });

    return response;
  } catch (error) {
    throw new Error("Error occurred while fetching department: " + error);
  }
};

export const getCategories = async (departmentNames) => {
  const mastersUrl = process.env.REACT_APP_MASTERS_API_URL;

  try {
    const response = await fetch(
      `${mastersUrl}/api/Category/getDepartmentbyName`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(departmentNames),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data.data;
        else return [];
      });

    return response;
  } catch (error) {
    throw new Error("Error occurred while fetching catgories: " + error);
  }
};

export const getOrganisation = async () => {
  const organisationUrl = process.env.REACT_APP_ORGANISATION_API_URL;
  try {
    const organisationId = localStorage.getItem("organisationId");
    const response = await fetch(
      `${organisationUrl}/api/Organization/get?organizationId=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data?.data[0];
        else return null;
      });

    return response;
  } catch (error) {
    throw new Error("Error occurred while fetching organisation: " + error);
  }
};
