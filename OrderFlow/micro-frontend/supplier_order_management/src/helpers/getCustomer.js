export const getCustomers = async () => {
  const organisationId = localStorage.getItem("organisationId");
  const supplierCreateUrl = process.env.REACT_APP_SUPPLIER_CREATE_URL;

  const customers = await fetch(
    `${supplierCreateUrl}/api/OMSupplier/getCustomer?OrganisationId=${organisationId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  return customers;
};
