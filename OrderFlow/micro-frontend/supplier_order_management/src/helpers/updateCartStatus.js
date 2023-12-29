export const updateCartStatus = async (customerDetails) => {
  const cartId = localStorage.getItem("cartId");
  const supplierCreateUrl = process.env.REACT_APP_SUPPLIER_CREATE_URL;

  const status = await fetch(
    `${supplierCreateUrl}/api/OMSupplier/UpdateToCartStatusByCartId?CartId=${cartId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdBy: customerDetails?.businessName,
        cartId: cartId,
        buyerId: customerDetails?.buyerId,
        productStatus: "sealed",
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.removeItem("cartId");
        return true;
      } else return false;
    })
    .catch((error) => console.log(error));

  return status;
};
