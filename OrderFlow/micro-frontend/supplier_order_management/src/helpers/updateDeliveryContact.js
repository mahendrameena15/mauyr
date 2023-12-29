export const updateDeliveryContact = async (buyerId, values) => {
  const supplierCreateUrl = process.env.REACT_APP_SUPPLIER_CREATE_URL;

  const update = await fetch(
    `${supplierCreateUrl}/api/OMSupplier/UpdateDeliveryInfo?BuyerId=${buyerId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deliveryFirstName: values?.firstName,
        deliveryLastName: values?.lastName,
        deliveryMobile: values?.mobile,
        deliveryEmail: values?.email,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else false;
    })
    .catch((error) => console.log(error));

  return update;
};
