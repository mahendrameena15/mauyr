export const getmonthlyGraphData = async () => {
  try {
    const createOrderUrl = process.env.REACT_APP_CREATE_ORDER_SUPPLIER_URL;
    const organisationId = localStorage.getItem("organisationId");

    const response = await fetch(
      `${createOrderUrl}/api/OMSupplier/Orders/Monthly?OrganisationId=${organisationId}`,
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
  } catch (error) {
    throw new Error("Error while processing!");
  }
};

export const getWeeklyGraphData = async () => {
  try {
    const createOrderUrl = process.env.REACT_APP_CREATE_ORDER_SUPPLIER_URL;
    const organisationId = localStorage.getItem("organisationId");
    const response = await fetch(
      `${createOrderUrl}/api/OMSupplier/Orders/Weekly?OrganisationId=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data.data;
        else return [];
      })
      .catch((err) => console.log(err));

    return response;
  } catch (error) {
    throw new Error("Error while processing!");
  }
};

export const getTilesData = async () => {
  try {
    const organisationId = localStorage.getItem("organisationId");
    const dashboardUrl = process.env.REACT_APP_DASHBOARD_SUPPLIER_URL;

    const response = await fetch(
      `${dashboardUrl}/api/DashBoard/getAllCards?OrganisationId=${organisationId}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data.data;
        else return {};
      })
      .catch((err) => console.log(err));

    return response;
  } catch (error) {
    throw new Error(error);
  }
};
