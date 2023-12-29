export const getCartList = async () => {
  const cartId = localStorage.getItem("cartId");
  const supplierCreateUrl = process.env.REACT_APP_SUPPLIER_CREATE_URL


  const cartList = await fetch(
    `${supplierCreateUrl}/api/OMSupplier/getAddToCartByCartId?CartId=${cartId}`,
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

  return cartList;
};
