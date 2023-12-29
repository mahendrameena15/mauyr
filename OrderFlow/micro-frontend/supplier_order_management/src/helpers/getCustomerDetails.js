export const getCustomerDetails = async (buyerId) => {
  const supplierCreateUrl = process.env.REACT_APP_SUPPLIER_CREATE_URL;

  const customer = await fetch(
    `${supplierCreateUrl}/api/OMSupplier/getCustomerProfile?BuyerId=${buyerId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  return customer;
};
