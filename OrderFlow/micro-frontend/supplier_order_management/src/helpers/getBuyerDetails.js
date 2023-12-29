export const getBuyerDetails = async (buyerId) => {
  const supplierCreateUrl = process.env.REACT_APP_SUPPLIER_CREATE_URL

  const buyer = await fetch(
    `${supplierCreateUrl}/api/OMSupplier/getOrderInformationBuyerId?BuyerId=${buyerId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  return buyer;
};
