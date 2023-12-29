export const getAllOrders = async (filter) => {
  try {
    const allOrdersUrl = process.env.REACT_APP_OMS_SUPPLIER_URL;
    const organisationId = localStorage.getItem("organisationId");
    const response = await fetch(
      `${allOrdersUrl}/api/OMSupplier/OMSupplier/Filter?OrganisationId=${organisationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filter),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) return data?.data;
        else return [];
      })
      .catch((error) => console.log(error));

    return response;
  } catch (error) {
    throw new Error("Error occurred while fetching data");
  }
};
