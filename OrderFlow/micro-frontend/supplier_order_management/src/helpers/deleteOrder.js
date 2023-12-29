export const deleteOrder = async () => {
  const orderId = localStorage.getItem("orderId");
  const cartId = localStorage.getItem("cartId");
  const supplierCreateUrl = process.env.REACT_APP_SUPPLIER_CREATE_URL

  const deleteOrderResponse = await fetch(
    `${supplierCreateUrl}/api/OMSupplier/DeleteOrders?OrderId=${orderId}&CartId=${cartId}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.removeItem("orderId");
        localStorage.removeItem("cartId");
        return true;
      } else return false;
    })
    .catch((error) => console.log(error));
  return deleteOrderResponse;
};
