export const getDepartments = async () => {
  const url = process.env.REACT_APP_MASTERS_URL;
  try {
    const response = await fetch(`${url}/api/Department/get`, {
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
  const masterUrl = process.env.REACT_APP_MASTERS_URL;
  try {
    const response = await fetch(
      `${masterUrl}/api/Category/getDepartmentbyName`,
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
    throw new Error(error);
  }
};
