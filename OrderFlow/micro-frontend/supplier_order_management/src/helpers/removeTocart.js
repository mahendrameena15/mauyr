export const removeToCart = async (productId, buyerId) => {
  const cartId = localStorage.getItem("cartId");
  const supplierCreateUrl = process.env.REACT_APP_SUPPLIER_CREATE_URL;

  const removeCart = await fetch(
    `${supplierCreateUrl}/api/OMSupplier/RemoveCart?ProductId=${productId}&CartId=${cartId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buyerId: buyerId,
        productStatus: "",
        productId: productId,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.data;
      else false;
    })
    .catch((error) => console.log(error));

  return removeCart;
};
