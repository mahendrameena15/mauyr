export const getAllOrderDetails = async () => {
  const supplierCreateUrl = process.env.REACT_APP_SUPPLIER_CREATE_URL

  const getOrdersDetails = await fetch(
    `${supplierCreateUrl}/api/OMSupplier/TotalOrderDetails?OrganisationId=${localStorage.getItem(
      "organisationId"
    )}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.data;
      else {
        return {};
      }
    })
    .catch((error) => console.log(error));
  return getOrdersDetails;
};
